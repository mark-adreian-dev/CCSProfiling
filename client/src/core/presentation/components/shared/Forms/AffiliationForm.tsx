import Form from "@/core/presentation/components/custom/Form/Form";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import { useAddAffiliationMutation, useEditAffiliationMutation, useGetAffiliationByIdQuery } from "@/core/hooks/affiliation.hooks";
import LoadingSpinner from "@/core/presentation/components/custom/Loader/LoadingSpinner";
import { SheetClose, SheetFooter } from "@/core/presentation/components/base/ui/sheet";
import { Button } from "@/core/presentation/components/base/ui/button";
import { type AffiliationRequest, AffiliationRequestSchema } from "@/core/domain/schema/affiliation.schema";
import { Building2, Calendar, CalendarOff, ToolboxIcon, type LucideIcon } from "lucide-react";
import { useAuthStore } from "@/core/store/auth.store";
import FormRichTextInput from "../../custom/Form/FormRichTextInput";

interface AffiliationFormProps {
  targetID?: number;
  FormTrigger: React.ElementType<{ className?: string; icon?: React.ElementType }>;
  Icon: LucideIcon;
}

export default function AffiliationForm({ targetID, FormTrigger, Icon }: AffiliationFormProps) {
  const user = useAuthStore((state) => state.user);
  const { data: affiliationData, isPending: isFetchingAffiliationData } = useGetAffiliationByIdQuery(targetID);
  const { mutateAsync: addAffiliation, isPending: isAddingAffiliation } = useAddAffiliationMutation();
  const { mutateAsync: editAffiliation, isPending: isUpdatinggAffiliation } = useEditAffiliationMutation();

  const isEdit = targetID === undefined ? false : true;
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<AffiliationRequest>({
    resolver: zodResolver(AffiliationRequestSchema),
    defaultValues: {
      user_id: user?.id,
      affiliation_name: "",
      role: "",
      description: "",
      unParsedDescription: "",
      date_start: null,
      date_end: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    // 1. If we are in edit mode and have data from the query
    if (isEdit && affiliationData?.data) {
      const affiliation = affiliationData.data;
      const startDate = affiliation.date_start ? new Date(affiliation.date_start) : null;
      const endDate = affiliation.date_end ? new Date(affiliation.date_end) : null;

      console.log(affiliationData.data);

      form.reset({
        affiliation_name: affiliation.affiliation_name,
        role: affiliation.role ?? undefined,
        description: affiliation.description,
        unParsedDescription: affiliation.description ?? "",
        date_start: startDate,
        date_end: endDate,
        user_id: user?.id,
      });
    }

    // 2. If we are NOT in edit mode, reset to defaults (important when switching between rows)
    if (!isEdit) {
      form.reset({
        user_id: user?.id,
        affiliation_name: "",
        role: "",
        unParsedDescription: "",
        description: "",
        date_start: null,
        date_end: null,
      });
    }
  }, [isEdit, affiliationData, form, user?.id]);

  const submitHandler = async (value: AffiliationRequest) => {
    if (isEdit && targetID) {
      await editAffiliation({ affiliation: value, affiliationId: targetID });
      setIsOpen(false);
    } else {
      await addAffiliation(value);
      setIsOpen(false);
    }

    form.reset({
      user_id: user?.id,
      affiliation_name: "",
      role: "",
      description: "",
      date_start: null,
      date_end: null,
    });
  };

  const { isValid } = form.formState;

  return (
    <Form<AffiliationRequest>
      formTitle={isEdit ? "Edit Affiliation" : "Add Affiliation"}
      formDescription={"Edit Affiliation"}
      form={form}
      onSubmit={submitHandler}
      trigger={Icon ? <FormTrigger icon={Icon} /> : <FormTrigger />}
      className="w-200!"
      open={isOpen}
      formID="affiliation-form"
      onOpenChange={setIsOpen}
    >
      {isFetchingAffiliationData && isEdit ? (
        <div className="w-full! h-[calc(100vh-200px)]!">
          <LoadingSpinner message={"Loading"} />
        </div>
      ) : (
        <div className="flex items-start gap-6 w-full">
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <FormTextInput
                control={form.control}
                FieldIcon={Building2}
                name="affiliation_name"
                label="Affiliation Name"
                placeholder="Affiliation name"
                required
              />
              <FormTextInput control={form.control} FieldIcon={ToolboxIcon} name="role" label="Role" placeholder="Affiliation role" required />
            </div>
            <div className="flex items-center gap-4">
              <FormDateSelector control={form.control} FieldIcon={Calendar} name={"date_start"} label="Date start" required />
              <FormDateSelector control={form.control} FieldIcon={CalendarOff} allowFutureDates={true} name={"date_end"} label="Date end" required />
            </div>
            <div className="flex items-center gap-4">
              <FormRichTextInput
                control={form.control}
                className="min-h-100 max-h-100 h-100"
                name="description"
                label="Description"
                placeholder="Description"
                onValueChange={(value: { html: string; text: string }) => {
                  form.setValue("description", value.html);
                  form.setValue("unParsedDescription", value.text);
                }}
              />
            </div>
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background pt-10 flex">
            {/* Use the form attribute so the button works even if outside the tag, or just move it inside */}
            <div className="w-full flex gap-4 items-center justify-end">
              <Button type="submit" form="affiliation-form" disabled={!isValid || isAddingAffiliation || isUpdatinggAffiliation}>
                {isAddingAffiliation ? "Adding..." : isUpdatinggAffiliation ? "Updating..." : isEdit ? "Update Affiliation" : "Add Affiliation"}
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </div>
      )}
    </Form>
  );
}
