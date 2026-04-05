import { useMemo } from "react";
import { Label } from "@/core/presentation/components/base/ui/label";
import { useGetCurriculum } from "@/core/hooks/grades.hooks";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/core/presentation/components/base/ui/table";
import SpinnerLoader from "@/core/presentation/components/custom/Loader/LoadingSpinner";

export default function CurriculumPage() {
  const { data: curriculumData, isPending: isLoadingCurriculumData } = useGetCurriculum();

  const curriculum = useMemo(() => {
    if (!curriculumData) return undefined;
    return curriculumData.data;
  }, [curriculumData]);

  if (isLoadingCurriculumData)
    return (
      <div className="w-full h-screen flex items-center">
        <SpinnerLoader message="Loading grades..." />
      </div>
    );
  return (
    <div className="px-8 flex flex-col gap-6 py-4 md:gap-6 md:py-6">
      <Label className="text-3xl font-bold">Curriculum</Label>
      {curriculum ? (
        <div className="  overflow-hidden max-w-200 w-full mx-auto " defaultValue={curriculum.map((year) => year.id.toString())}>
          {curriculum.map((academicYear) => {
            return (
              <div key={academicYear.id} className="border rounded-lg">
                <div className="w-full flex items-center justify-between p-5">
                  <h1 className="font-bold text-2xl">{academicYear.academic_year}</h1>
                </div>

                <div className="p-0 gap-0 pb-10">
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
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {semester.subjects.map((subject) => {
                              return (
                                <TableRow key={subject.id}>
                                  <TableCell className="font-medium">{subject.course_code}</TableCell>
                                  <TableCell>
                                    <p className="whitespace-normal break-all">{subject.name}</p>
                                  </TableCell>
                                  <TableCell>{subject.units}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full text-muted-foreground italic">No record found...</div>
      )}
    </div>
  );
}
