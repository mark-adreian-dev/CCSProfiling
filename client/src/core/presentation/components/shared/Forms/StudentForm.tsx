import { Sex } from "@/core/enums/sex.enum";
import Form from "@/core/presentation/components/custom/Form/Form";
import FormTextInput from "@/core/presentation/components/custom/Form/FormTextInput";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextArea from "@/core/presentation/components/custom/Form/FormTextArea";
import FormRadioButton from "@/core/presentation/components/custom/Form/FormRadioButton";
import { SEX_OPTIONS } from "@/core/constants/sex-options.constants";
import FormDateSelector from "@/core/presentation/components/custom/Form/FormDateSelector";
import FormImagePicker from "@/core/presentation/components/custom/Form/FormImagePicker";
import FormNumberInput from "@/core/presentation/components/custom/Form/FormNumberInput";
import { useAddStudentMutation, useEditStudentMutation, useGetStudentByIdQuery } from "@/core/hooks/user.hooks";
import LoadingSpinner from "@/core/presentation/components/custom/Loader/LoadingSpinner";
import { SheetClose, SheetFooter } from "@/core/presentation/components/base/ui/sheet";
import { Button } from "@/core/presentation/components/base/ui/button";
import { AcademicStatus } from "@/core/enums/academic-status.enum";
import { type StudentRequest, StudentRequestSchema } from "@/core/domain/schema/student.schema";
import { ACADEMIC_STATUS_OPTION } from "@/core/constants/academic-status.constatns";
import FormSelectInput from "@/core/presentation/components/custom/Form/FormSelectInput";
import { ACADEMIC_YEAR_OPTION } from "@/core/constants/academic-year.constant";
import { useGetAllProgramQuery } from "@/core/hooks/program.hooks";
import { OrderBy } from "@/core/enums/order.enum";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { Program } from "@/core/domain/entity/program.entity";
import type { SelectOption } from "@/core/presentation/types/select-option.types";
import { Calendar, House, Mail, Phone, VenusAndMars, type LucideIcon } from "lucide-react";

interface StudentFormProps {
  targetID?: number;
  FormTrigger: React.ElementType<{ className?: string; icon?: React.ElementType }>;
  Icon?: LucideIcon;
}

export default function StudentForm({ targetID, FormTrigger, Icon }: StudentFormProps) {
  const [tableParams] = useState<PaginationParams<Program>>({
    page: 1,
    pageSize: 10,
    search: "",
    order: OrderBy.DESCENDING,
    sortBy: "created_at",
  });
  const { data: studentData, isPending: isFetchingStudentData } = useGetStudentByIdQuery(targetID);
  const { data: programData, isPending: isFetchingProgramData } = useGetAllProgramQuery({ params: tableParams });
  const { mutateAsync: addStudent, isPending: isAddingStudent } = useAddStudentMutation();
  const { mutateAsync: editStudent, isPending: isUpdatinggStudent } = useEditStudentMutation();

  const PROGRAM_OPTION: SelectOption[] = useMemo(() => {
    if (!programData) return [];
    const option: SelectOption[] = [];
    programData.data.content.map((program) => {
      option.push({
        label: program.name,
        value: program.id,
      });
    });
    return option;
  }, [programData]);

  const isEdit = Boolean(targetID);
  const [isOpen, setIsOpen] = React.useState(false);
  const form = useForm<StudentRequest>({
    resolver: zodResolver(StudentRequestSchema),
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
      academic_status: AcademicStatus.REGULAR,
      academic_year: undefined,
      program_id: undefined,
    },
    mode: "onChange",
  });

  useEffect(() => {
    // 1. If we are in edit mode and have data from the query
    if (isEdit && studentData?.data) {
      const student = studentData.data;
      form.reset({
        email: student.email,
        name_prefix: student.name_prefix ?? undefined,
        first_name: student.first_name,
        middle_name: student.middle_name ?? undefined,
        last_name: student.last_name,
        name_suffix: student.name_suffix ?? undefined,
        // Ensure date is a string or Date object depending on your DatePicker needs
        date_of_birth: student.date_of_birth ? new Date(student.date_of_birth) : undefined,
        sex: student.sex as Sex,
        contact_number: student.contact_number,
        address: student.address,
        profile_picture: student.profile_picture,
        academic_status: (student.studentProfile?.academic_status as AcademicStatus) ?? AcademicStatus.REGULAR,
        academic_year: student.studentProfile?.academic_year?.toString() ?? undefined,
        program_id: student.studentProfile?.program?.id.toString() ?? undefined,
      });
    }

    // 2. If we are NOT in edit mode, reset to defaults (important when switching between rows)
    if (!isEdit) {
      form.reset({
        email: "",
        first_name: "",
        last_name: "",
        sex: Sex.MALE,
        contact_number: "",
        address: "",
        academic_status: AcademicStatus.REGULAR,
        academic_year: undefined,
        program_id: undefined,
      });
    }
  }, [isEdit, studentData, form]);

  const submitHandler = async (value: StudentRequest) => {
    if (isEdit && targetID) {
      await editStudent({ studentData: value, studentId: targetID });
      setIsOpen(false);
    } else {
      await addStudent(value);
      setIsOpen(false);
    }
  };

  const { isValid } = form.formState;
  return (
    <Form<StudentRequest>
      formTitle={isEdit ? "Edit Student" : "Add Sudent"}
      formDescription={"Edit Student"}
      form={form}
      onSubmit={submitHandler}
      trigger={Icon ? <FormTrigger icon={Icon} /> : <FormTrigger />}
      className="w-300!"
      open={isOpen}
      formID="student-form"
      onOpenChange={setIsOpen}
    >
      {(isFetchingStudentData && isEdit) || isFetchingProgramData ? (
        <div className="w-full! h-[calc(100vh-200px)]!">
          <LoadingSpinner message={"Loading"} />
        </div>
      ) : (
        <div className="flex items-start gap-6 w-full">
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
              <FormTextInput control={form.control} FieldIcon={Mail} name="email" label="Email Address" placeholder="Email Address" required />
              <FormNumberInput
                FieldIcon={Phone}
                control={form.control}
                name="contact_number"
                label="Contact No."
                placeholder="Contact No."
                required
                allowZeroFirstCharacter={true}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormDateSelector control={form.control} FieldIcon={Calendar} name={"date_of_birth"} label="Birthdate" required />
              <FormRadioButton control={form.control} FieldIcon={VenusAndMars} name="sex" label="Sex" options={SEX_OPTIONS} />
            </div>

            <div className="flex items-center gap-4">
              <FormSelectInput control={form.control} name={"academic_year"} label="Academic Year" options={ACADEMIC_YEAR_OPTION} required />
              <FormSelectInput control={form.control} name={"program_id"} label="Program" options={PROGRAM_OPTION} required />
            </div>

            <FormRadioButton control={form.control} name="academic_status" label="Academic Status" options={ACADEMIC_STATUS_OPTION} required />
            <FormTextArea control={form.control} FieldIcon={House} name="address" label="Address" placeholder="Address" required className="h-50" />
          </div>

          <SheetFooter className="absolute bottom-0 left-0 right-0 bg-background pt-10 flex">
            {/* Use the form attribute so the button works even if outside the tag, or just move it inside */}
            <div className="w-full flex gap-4 items-center justify-end">
              <Button type="submit" form="student-form" disabled={!isValid || isAddingStudent || isUpdatinggStudent}>
                {isAddingStudent ? "Adding..." : isUpdatinggStudent ? "Updating..." : isEdit ? "Update Student" : "Add Student"}
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
