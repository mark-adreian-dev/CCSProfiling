import type { User } from "@/core/domain/entity/user.entity";
import { Role } from "@/core/enums/roles.enums";
import Banner from "@/core/presentation/assets/banner.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/presentation/components/base/ui/avatar";
import { Cake, ChevronDown, Edit, EditIcon, GraduationCap, HomeIcon, Mail, Mars, PhoneIcon, PlusCircle, Trash, Venus } from "lucide-react";
import { Button } from "../base/ui/button";
import StudentForm from "./Forms/StudentForm";
import React from "react";
import FacultyForm from "./Forms/FacultyForm";
import { format, formatDate } from "date-fns";
import { Sex } from "@/core/enums/sex.enum";
import { Badge } from "../base/ui/badge";
import ManageInterestForm from "./Forms/ManageInterestForm";
import { useAuthStore } from "@/core/store/auth.store";
import AffiliationForm from "./Forms/AffiliationForm";
import { useDeleteAffiliationMutation } from "@/core/hooks/affiliation.hooks";
import { Accordion, AccordionContent, AccordionItem } from "../base/ui/accordion";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { HtmlRenderer } from "../custom/HtmlRenderer/HtmlRenderer";
import { Separator } from "../base/ui/separator";

interface FormTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
}

export const FormTrigger = React.forwardRef<HTMLButtonElement, FormTriggerProps>(({ icon: Icon, ...props }, ref) => {
  return (
    <Button {...props} ref={ref} variant="icon" size="icon">
      {Icon && <Icon />}
    </Button>
  );
});

FormTrigger.displayName = "FormTrigger";

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const role = user.role;
  const isStudent = role === Role.STUDENT;
  return (
    <div>
      <div className="w-full bg-primary/20 h-100">
        <img src={Banner} className="w-full h-full object-cover" />
      </div>
      <div className="max-w-200 relative w-full mx-auto flex flex-col gap-20 pb-20">
        <ProfileImage user={user} isStudent={isStudent} />
        <BasicInformation user={user} isStudent={isStudent} />
        <UserInterest user={user} />
        <Affiliation user={user} />
      </div>
    </div>
  );
}

const ProfileImage = ({ user, isStudent }: { user: User; isStudent: boolean }) => {
  const authUser = useAuthStore((state) => state.user);
  const fullname = `${user.name_prefix ?? ""} ${user.first_name ?? ""} ${user.middle_name ?? ""} ${user.last_name ?? ""} ${user.name_suffix ?? ""}`;
  const Initials = `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`;
  //Student specific details
  const academicStatus = isStudent ? user.studentProfile?.academic_status : undefined;
  const isSameUser = authUser?.id === user.id;
  return (
    <div>
      <Avatar className="w-50 h-50 absolute -top-15 bg-primary text-white">
        <AvatarImage src={user.profile_picture ?? undefined} alt={fullname} />
        <AvatarFallback className="text-5xl">{Initials}</AvatarFallback>
      </Avatar>
      <div className="pl-60 pt-5 flex justify-between">
        <div className=" flex flex-col gap-2">
          <div className="flex gap-3">
            <h1 className="text-3xl font-bold">{fullname}</h1>
            {isStudent && (
              <>
                {academicStatus && (
                  <>
                    {academicStatus === "Regular" && <Badge className="bg-green-500 text-black">{academicStatus}</Badge>}
                    {academicStatus === "Irregular" && <Badge className="bg-destructive text-white">{academicStatus}</Badge>}
                  </>
                )}
              </>
            )}
          </div>
          {isStudent ? (
            <Badge className="text-md h-fit">Student No. {user.studentProfile?.student_no}</Badge>
          ) : (
            <Badge className="text-md h-fit">Employee No.{user.facultyProfile?.employee_no}</Badge>
          )}
        </div>
        {isSameUser && (
          <>
            {isStudent ? <StudentForm FormTrigger={FormTrigger} Icon={Edit} targetID={user.id} /> : <></>}
            {!isStudent ? <FacultyForm FormTrigger={FormTrigger} Icon={Edit} targetID={user.id} /> : <></>}
          </>
        )}
      </div>
    </div>
  );
};

const BasicInformation = ({ user, isStudent }: { user: User; isStudent: boolean }) => {
  const sex = user.sex;
  const program = isStudent && user.studentProfile?.program?.name;
  return (
    <div>
      <h1 className="mb-10 text-2xl font-bold">Basic Information</h1>
      <div className="flex justify-between">
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-2 items-start">
            <Cake />
            <p>Born in {format(user.date_of_birth, "MMMM dd, yyyy")}</p>
          </div>
          <div className="flex gap-2 items-start">
            <HomeIcon />
            <p className="max-w-100">Lives in {user.address}</p>
          </div>
          {isStudent && (
            <div className="flex gap-2 items-start">
              <GraduationCap />
              <p>{program}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-start">
            <PhoneIcon />
            <p>{user.contact_number}</p>
          </div>
          <div className="flex gap-2 items-start">
            <Mail />
            <p>{user.email}</p>
          </div>
          <div className="flex gap-2 items-start">
            {sex === Sex.MALE ? <Mars /> : <Venus />}
            <p>{sex === Sex.MALE ? Sex.MALE : Sex.FEMALE}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInterest = ({ user }: { user: User }) => {
  const authUser = useAuthStore((state) => state.user);
  const isSameUser = authUser?.id === user.id;
  if (!user.interests) return null;
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className=" text-2xl font-bold">User Skills/Interests</h1>
        {isSameUser && <ManageInterestForm FormTrigger={FormTrigger} Icon={Edit} currentInterest={user.interests} />}
      </div>

      <div className="flex gap-2 w-full flex-wrap">
        {user.interests.length === 0 ? (
          <div className="text-muted-foreground">No interest provided.</div>
        ) : (
          <>
            {user.interests.map((interest) => (
              <Badge key={interest.id} className="text-lg h-fit">
                {interest.name}
              </Badge>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const Affiliation = ({ user }: { user: User }) => {
  const authUser = useAuthStore((state) => state.user);
  const isSameUser = authUser?.id === user.id;
  const { mutateAsync: deleteAffiliation } = useDeleteAffiliationMutation();

  const handleDelete = async (id: number) => {
    await deleteAffiliation(id);
  };

  if (!user.affiliations) return null;
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className=" text-2xl font-bold">Activities / Affiliations</h1>
        {isSameUser && <AffiliationForm FormTrigger={FormTrigger} Icon={PlusCircle} />}
      </div>

      <div className="gap-4 w-full">
        <Accordion type="multiple" className="flex flex-col gap-2 border rounded-lg overflow-hidden">
          {user.affiliations.map((affiliation) => {
            return (
              <AccordionItem key={affiliation.id} value={String(affiliation.id)}>
                <AccordionTrigger className="group justify-start w-full text-start p-5 cursor-pointer hover:bg-primary [state=open]:bg-primary">
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <h1 className="text-lg font-semibold">{affiliation.affiliation_name}</h1>
                      <div className="flex gap-1 text-sm">
                        <p className="text-muted-foreground">{affiliation.date_start ? formatDate(new Date(affiliation.date_start), "yyyy") : ""}</p>
                        {affiliation.date_end && <p className="text-muted-foreground">-</p>}
                        <p className="text-muted-foreground">{affiliation.date_end ? formatDate(new Date(affiliation.date_end), "yyyy") : ""}</p>
                      </div>
                    </div>

                    <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </AccordionTrigger>

                <AccordionContent className="p-0 m-0 pb-10">
                  <Separator />
                  <div className=" px-10">
                    <div className="flex items-center justify-end pt-10">
                      {isSameUser && <AffiliationForm FormTrigger={FormTrigger} Icon={EditIcon} targetID={affiliation.id} />}
                      {isSameUser && (
                        <Button variant={"icon"} size={"icon"} onClick={() => handleDelete(affiliation.id)}>
                          <Trash />
                        </Button>
                      )}
                    </div>
                    <HtmlRenderer html={affiliation.description ?? ""} />
                  </div>

                  <div className="px-10 flex justify-between gap-2 pt-5">
                    <div>
                      <h1 className="text-sm font-semibold text-muted-foreground italic">{affiliation.affiliation_name}</h1>
                      <h1 className="text-sm font-semibold text-muted-foreground italic">{affiliation.role}</h1>
                      <div className="flex gap-1 text-xs italic">
                        <p className="text-muted-foreground">
                          {affiliation.date_start ? formatDate(new Date(affiliation.date_start), "MMMM dd, yyyy") : ""}
                        </p>
                        {affiliation.date_end && <p className="text-muted-foreground">-</p>}
                        <p className="text-muted-foreground">
                          {affiliation.date_end ? formatDate(new Date(affiliation.date_end), "MMMM dd, yyyy") : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};
