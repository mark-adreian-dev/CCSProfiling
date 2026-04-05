import { FacultyRequestSchema, type FacultyRequest } from "@/core/domain/schema/faculty.schema";
import { Sex } from "@/core/enums/sex.enum";
import Form from "@/core/presentation/components/custom/Form/Form";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormRadioButton from "@/core/presentation/components/custom/Form/FormRadioButton";
import { SEX_OPTIONS } from "@/core/constants/sex-options.constants";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormImagePicker from "@/core/presentation/components/custom/Form/FormImagePicker";
import FormNumberInput from "@/core/presentation/components/custom/Form/FormNumberInput";
import { useAddFacultyMutation, useEditFacultyMutation, useGetFacultyByIdQuery } from "@/core/hooks/user.hooks";
import LoadingSpinner from "@/core/presentation/components/custom/Loader/LoadingSpinner";
import { SheetClose, SheetFooter } from "@/core/presentation/components/base/ui/sheet";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Edit, type LucideIcon } from "lucide-react";

interface FacultyFormProps {
  targetID?: number;
  FormTrigger: React.ElementType<{ className?: string; icon?: React.ElementType }>;
  Icon?: LucideIcon;
}

export default function FacultyForm({ targetID, FormTrigger, Icon }: FacultyFormProps) {
  const { mutateAsync: addFaculty, isPending: isAddingFaculty } = useAddFacultyMutation();
  const { mutateAsync: editFaculty, isPending: isUpdatingFaculty } = useEditFacultyMutation();
  const { data, isPending: isFetchingFacultyData } = useGetFacultyByIdQuery(targetID);

  const isEdit = Boolean(targetID);
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<FacultyRequest>({
    resolver: zodResolver(FacultyRequestSchema),
    defaultValues: {
      email: "",
      name_prefix: undefined,
      first_name: "",
      middle_name: undefined,
      last_name: "",
      name_suffix: undefined,
      date_of_birth: undefined,
      sex: Sex.MALE,
      contact_number: "",
      address: "",
      profile_picture: null,
      expertise: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isEdit && data?.data) {
      const faculty = data.data;

      form.reset({
        email: faculty.email,
        name_prefix: faculty.name_prefix ?? undefined,
        first_name: faculty.first_name,
        middle_name: faculty.middle_name ?? undefined,
        last_name: faculty.last_name,
        name_suffix: faculty.name_suffix ?? undefined,
        date_of_birth: faculty.date_of_birth ? new Date(faculty.date_of_birth) : undefined,
        sex: faculty.sex as Sex,
        contact_number: faculty.contact_number,
        address: faculty.address,
        expertise: faculty.facultyProfile?.expertise ?? "",
        profile_picture: faculty.profile_picture,
      });
    }

    if (!isEdit) {
      form.reset({
        email: "",
        first_name: "",
        last_name: "",
        sex: Sex.MALE,
        contact_number: "",
        address: "",
        expertise: "",
      });
    }
  }, [isEdit, data, form]);

  const submitHandler = async (value: FacultyRequest) => {
    if (isEdit && targetID) {
      await editFaculty({ facultyData: value, facultyId: targetID });
      setIsOpen(false);
    } else {
      await addFaculty(value);
      setIsOpen(false);
    }
  };

  const { isValid } = form.formState;

  return (
    <Form<FacultyRequest>
      formTitle={isEdit ? "Edit Faculty" : "Add faculty"}
      formDescription={"Add Faculty"}
      form={form}
      onSubmit={submitHandler}
      trigger={Icon ? <FormTrigger icon={Edit} /> : <FormTrigger />}
      formID="faculty-form"
      className="w-300!"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      {(isFetchingFacultyData && isEdit) || isAddingFaculty || isUpdatingFaculty ? (
        <div className="w-full! h-[calc(100vh-200px)]!">
          <LoadingSpinner message={"Loading"} />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-6 w-full lg:flex-row">
          <FormImagePicker
            control={form.control}
            name="profile_picture"
            label="Profile Image"
            description="JPG or PNG. Max 5MB. A square image of at least 400x400px is recommended."
          />
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <FormTextInput control={form.control} name="first_name" label="First name" placeholder="First name" required />
              <FormTextInput control={form.control} name="middle_name" label="Middle name" placeholder="Middle name" />
            </div>

            <div className="flex items-center gap-4">
              <FormTextInput control={form.control} name="last_name" label="Last name" placeholder="Last name" required />
              <FormTextInput control={form.control} name="name_prefix" label="Suffix" placeholder="Suffix" />
              <FormTextInput control={form.control} name="name_suffix" label="Prefix" placeholder="Prefix" />
            </div>

            <div className="flex items-center gap-4">
              <FormTextInput control={form.control} name="email" label="Email Address" placeholder="Email Address" required />
              <FormNumberInput
                control={form.control}
                name="contact_number"
                label="Contact No."
                placeholder="Contact No."
                required
                allowZeroFirstCharacter={true}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormDateSelector control={form.control} name={"date_of_birth"} label="Birthdate" required />
              <FormRadioButton control={form.control} name="sex" label="Sex" options={SEX_OPTIONS} />
            </div>
            {/* Added Expertise so you can actually fulfill the schema requirement */}

            <FormTextArea control={form.control} name="address" label="Address" placeholder="Address" required className="h-50" />
            <FormTextArea control={form.control} name="expertise" label="Expertise" placeholder="e.g. Computer Science" required className="h-50" />
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background pt-10 flex">
            {/* Use the form attribute so the button works even if outside the tag, or just move it inside */}
            <div className="w-full flex gap-4 items-center justify-end">
              <Button type="submit" form="faculty-form" disabled={!isValid || isAddingFaculty}>
                {isEdit ? "Update Faculty" : "Add Faculty"}
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
