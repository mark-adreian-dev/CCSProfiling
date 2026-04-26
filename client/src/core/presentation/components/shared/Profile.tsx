import type { User } from "@/core/domain/entity/user.entity";
import { Role } from "@/core/enums/roles.enums";
import Banner from "@/core/presentation/assets/banner.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/presentation/components/base/ui/avatar";
import { Cake, ChevronDown, Edit, EditIcon, GraduationCap, HomeIcon, Mail, Mars, PhoneIcon, PlusCircle, Toolbox, Trash, Venus } from "lucide-react";
import { Button } from "../base/ui/button";
import StudentForm from "./Forms/StudentForm";
import React, { useMemo } from "react";
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
import { useGetCurriculum, useGetStduentGrades } from "@/core/hooks/grades.hooks";
import SpinnerLoader from "../custom/Loader/LoadingSpinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../base/ui/table";

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
      <div className="w-full bg-primary/20 lg:h-100">
        <img src={Banner} className="w-full h-full object-cover" />
      </div>
      <div className="max-w-200 relative w-full px-5 mx-auto flex flex-col gap-20 pb-20">
        <ProfileImage user={user} isStudent={isStudent} />
        <BasicInformation user={user} isStudent={isStudent} />
        <UserInterest user={user} />
        <Affiliation user={user} />
        <AcademicTracker user={user} />
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
  console.log(user.profile_picture);
  return (
    <div>
      <Avatar className="w-50 h-50 absolute -top-15 bg-primary text-white">
        <AvatarImage src={user.profile_picture ?? undefined} alt={fullname} />
        <AvatarFallback className="text-5xl">{Initials}</AvatarFallback>
      </Avatar>
      <div className="pt-40 lg:pl-60 lg:pt-5 flex justify-between">
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
      <div className="flex justify-between gap-4 flex-col lg:flex-row">
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Cake />
            <p className="text-sm lg:text-base">Born in {format(user.date_of_birth, "MMMM dd, yyyy")}</p>
          </div>
          <div className="flex gap-2 items-start">
            <HomeIcon />
            <p className="max-w-100 text-sm lg:text-base">Lives in {user.address}</p>
          </div>
          {isStudent && (
            <div className="flex gap-2 items-start">
              <GraduationCap />
              <p className="text-sm lg:text-base">{program}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-start">
            <PhoneIcon />
            <p className="text-sm lg:text-base">{user.contact_number}</p>
          </div>
          <div className="flex gap-2 items-start">
            <Mail />
            <p className="text-sm lg:text-base">{user.email}</p>
          </div>
          <div className="flex gap-2 items-start">
            {sex === Sex.MALE ? <Mars /> : <Venus />}
            <p className="text-sm lg:text-base">{sex === Sex.MALE ? Sex.MALE : Sex.FEMALE}</p>
          </div>
        </div>
      </div>
      {!isStudent && user.facultyProfile && (
        <div className="mt-8">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Toolbox />
            <p> Expertise</p>
          </h3>
          <p className="text-primary-foreground/70">{user.facultyProfile.expertise}</p>
        </div>
      )}
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
    await deleteAffiliation({ userId: user.id ?? 0, affiliationId: id });
  };

  if (!user.affiliations) return null;
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-10">
        <h1 className=" text-2xl font-bold">Activities / Affiliations</h1>
        {isSameUser && <AffiliationForm FormTrigger={FormTrigger} Icon={PlusCircle} />}
      </div>

      <div className="gap-4 w-full">
        {user.affiliations.length !== 0 ? (
          <Accordion type="multiple" className="flex flex-col gap-2 border rounded-lg overflow-hidden">
            {user.affiliations.map((affiliation) => {
              return (
                <AccordionItem key={affiliation.id} value={String(affiliation.id)}>
                  <AccordionTrigger className="group justify-start w-full text-start p-5 cursor-pointer hover:bg-primary [state=open]:bg-primary">
                    <div className="w-full flex items-center justify-between">
                      <div>
                        <h1 className="text-lg font-semibold">{affiliation.affiliation_name}</h1>
                        <div className="flex gap-1 text-sm">
                          <p className="text-muted-foreground">
                            {affiliation.date_start ? formatDate(new Date(affiliation.date_start), "yyyy") : ""}
                          </p>
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
        ) : (
          <div className="w-full text-muted-foreground italic">
            <p>No records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AcademicTracker = ({ user }: { user: User }) => {
  const { data: gradesData, isPending: isLoadingGradesData } = useGetStduentGrades(user.id);
  const { data: curriculumData, isPending: isLoadingCurriculumData } = useGetCurriculum();

  const grades = useMemo(() => {
    if (!gradesData) return [];
    return gradesData?.data.grades;
  }, [gradesData]);

  const curriculum = useMemo(() => {
    if (!curriculumData) return undefined;
    return curriculumData.data;
  }, [curriculumData]);

  if (isLoadingGradesData || isLoadingCurriculumData)
    return (
      <div className="w-full flex items-center">
        <SpinnerLoader message="Loading grades..." />
      </div>
    );
  return (
    <div>
      <h1 className=" text-2xl font-bold mb-10">Academic Record</h1>
      {curriculum && grades.length !== 0 ? (
        <Accordion type="multiple" className="border rounded-lg overflow-hidden" defaultValue={curriculum.map((year) => year.id.toString())}>
          {curriculum.map((academicYear) => {
            return (
              <AccordionItem key={academicYear.id} value={academicYear.id.toString()}>
                <AccordionTrigger className="group justify-start w-full text-start p-5 cursor-pointer hover:bg-primary [state=open]:bg-primary">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="font-bold text-3xl">{academicYear.academic_year}</h1>

                    <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 gap-0 pb-10">
                  {academicYear.semesters.map((semester, index) => {
                    const bannerColor = ["bg-chart-3", "bg-chart-4"];
                    return (
                      <div key={semester.id}>
                        <div className={`w-full p-2 text-sm ${bannerColor[index]}`}>
                          <p>{semester.name}</p>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Course Code</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Units</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Remarks</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {semester.subjects.map((subject) => {
                              const subjectGrade = grades.find((grade) => grade.subject?.id === subject.id);
                              return (
                                <TableRow key={subject.id}>
                                  <TableCell className="font-medium">{subject.course_code}</TableCell>
                                  <TableCell className="max-w-50">
                                    <p className="whitespace-normal break-all">{subject.name}</p>
                                  </TableCell>
                                  <TableCell>{subject.units}</TableCell>
                                  <TableCell>
                                    {subjectGrade ? subjectGrade.grade_value : <p className="text-muted-foreground italic text-xs">No Grade</p>}
                                  </TableCell>
                                  <TableCell>
                                    <>
                                      {!subjectGrade ? (
                                        <Badge className="bg-gray-200/10">
                                          <p className="font-bold uppercase text-gray-100">Not taken</p>
                                        </Badge>
                                      ) : Number(subjectGrade.grade_value) > 3 ? (
                                        <Badge className="bg-destructive">
                                          <p className="font-bold uppercase text-accent">Failed</p>
                                        </Badge>
                                      ) : (
                                        <Badge className="bg-green-200">
                                          <p className="font-bold uppercase text-green-900">Passed</p>
                                        </Badge>
                                      )}
                                    </>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="w-full text-muted-foreground italic">No record found...</div>
      )}
    </div>
  );
};
