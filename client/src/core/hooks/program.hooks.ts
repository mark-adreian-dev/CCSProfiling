import { useQuery } from "@tanstack/react-query";
import { ProgramRepository } from "../infrastructure/repository/program.repository";
import { ProgramUseCase } from "../application/program.use-case";
import type { Program } from "../domain/entity/program.entity";
import type { PaginationParams } from "../utils/types/pagination-params.types";

const repository = new ProgramRepository();
const useCase = new ProgramUseCase(repository);

export const useGetAllProgramQuery = ({ params }: { params: PaginationParams<Program> }) => {
  return useQuery({
    queryKey: ["program", params],
    queryFn: () => useCase.getAllProgramData(params),
  });
};
