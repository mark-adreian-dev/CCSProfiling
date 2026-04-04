import Form from "@/core/presentation/components/custom/Form/Form";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddInterestMutation, useEditInterestMutation, useGetInterestByIdQuery } from "@/core/hooks/interest.hooks";
import LoadingSpinner from "@/core/presentation/components/custom/Loader/LoadingSpinner";
import { SheetClose, SheetFooter } from "@/core/presentation/components/base/ui/sheet";
import { Button } from "@/core/presentation/components/base/ui/button";
import { type InterestRequest, InterestRequestSchema } from "@/core/domain/schema/interest.schema";

interface InterestFormProps {
  targetID?: number;
  FormTrigger: React.ComponentType;
}

export default function InterestForm({ targetID, FormTrigger }: InterestFormProps) {
  const { data: interestData, isPending: isFetchingInterestData } = useGetInterestByIdQuery(targetID);
  const { mutateAsync: addInterest, isPending: isAddingInterest } = useAddInterestMutation();
  const { mutateAsync: editInterest, isPending: isUpdatinggInterest } = useEditInterestMutation();

  const isEdit = Boolean(targetID);
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<InterestRequest>({
    resolver: zodResolver(InterestRequestSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    // 1. If we are in edit mode and have data from the query
    if (isEdit && interestData?.data) {
      const interest = interestData.data;

      form.reset({
        name: interest.name,
      });
    }

    // 2. If we are NOT in edit mode, reset to defaults (important when switching between rows)
    if (!isEdit) {
      form.reset({
        name: "",
      });
    }
  }, [isEdit, interestData, form]);

  const submitHandler = async (value: InterestRequest) => {
    if (isEdit && targetID) {
      await editInterest({ interest: value, interestId: targetID });
      setIsOpen(false);
    } else {
      await addInterest(value);
      setIsOpen(false);
    }
  };

  const { isValid } = form.formState;
  return (
    <Form<InterestRequest>
      formTitle={isEdit ? "Edit Interest" : "Add Interest"}
      formDescription={isEdit ? "Add Interest" : "Edit Interest"}
      form={form}
      onSubmit={submitHandler}
      trigger={<FormTrigger />}
      className="w-300!"
      open={isOpen}
      formID="interest-form"
      onOpenChange={setIsOpen}
    >
      {isFetchingInterestData && isEdit ? (
        <div className="w-full! h-[calc(100vh-200px)]!">
          <LoadingSpinner message={"Loading"} />
        </div>
      ) : (
        <div className="flex items-start gap-6 w-full">
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <FormTextInput control={form.control} name="name" label="Name" placeholder="Interest name" required />
            </div>
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background pt-10 flex">
            {/* Use the form attribute so the button works even if outside the tag, or just move it inside */}
            <div className="w-full flex gap-4 items-center justify-end">
              <Button type="submit" form="interest-form" disabled={!isValid || isAddingInterest || isUpdatinggInterest}>
                {isAddingInterest ? "Adding..." : isUpdatinggInterest ? "Updating..." : isEdit ? "Update Interest" : "Add Interest"}
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
