import { useQuery } from "@tanstack/react-query";
import { GradesRepository } from "../infrastructure/repository/grades.repository";
import { GradesUseCase } from "../application/grades.use-case";

const repository = new GradesRepository();
const useCase = new GradesUseCase(repository);

export const useGetStduentGrades = (studentId: number) => {
  return useQuery({
    queryKey: ["grades", studentId],
    queryFn: () => useCase.getGradesData(studentId),
  });
};

export const useGetCurriculum = () => {
  return useQuery({
    queryKey: ["curriculum"],
    queryFn: () => useCase.getCurriculumData(),
  });
};
