import type { User } from "@/core/domain/entity/user.entity";
import { OrderBy } from "@/core/enums/order.enum";
import { useGetStudentProfilesQuery } from "@/core/hooks/user.hooks";
import PaginatedTable from "@/core/presentation/components/custom/PaginatedTable/PaginatedTable";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import { useMemo, useState } from "react";
import { Label } from "@/core/presentation/components/base/ui/label";

import { Button } from "@/core/presentation/components/base/ui/button";
import { UserPlus2 } from "lucide-react";
import React from "react";
import StudentForm from "../../../../core/presentation/components/shared/Forms/StudentForm";
import { useStudentListingColumns } from "../utils/student-listing.columns";

export default function StudentsPage() {
  const { column } = useStudentListingColumns();
  const [tableParams, setTableParams] = useState<PaginationParams<User>>({
    page: 1,
    pageSize: 10,
    search: "",
    order: OrderBy.DESCENDING,
    sortBy: "created_at",
  });

  const { data: facultyResponse, isPending } = useGetStudentProfilesQuery({ params: tableParams });
  const tableData = facultyResponse ?? null;

  const PaginatedNavigation = useMemo(() => {
    // If data is missing, provide safe defaults so the UI doesn't crash
    const navigation = tableData?.data?.navigation;
    return {
      has_more_pages: navigation?.has_more_pages ?? false,
      has_prev_page: navigation?.has_prev_page ?? false,
      next_page_num: navigation?.next_page_num ?? null,
      prev_page_num: navigation?.prev_page_num ?? null,
    };
  }, [tableData]);

  const PaginationMetaData = useMemo(() => {
    const pagination = tableData?.data?.pagination;
    return {
      total: pagination?.total ?? 0,
      total_pages: pagination?.total_pages ?? 0,
      items_count: pagination?.items_count ?? 0,
      current_page: pagination?.current_page ?? 0,
      per_page: pagination?.per_page ?? tableParams.pageSize,
    };
  }, [tableData, tableParams]);

  return (
    <div className="px-8 flex flex-col gap-6 py-4 md:gap-6 md:py-6">
      <Label className="text-3xl font-bold">Student Profiles</Label>
      <PaginatedTable
        params={tableParams}
        onParamsChange={setTableParams}
        table_preview="table"
        columns={column}
        data={tableData?.data.content ?? []}
        navigation={PaginatedNavigation}
        isLoading={isPending}
        paginationMetaData={PaginationMetaData}
        form={<StudentForm FormTrigger={FormTrigger} />}
        tableSearchControls
        paginationControls
      />
    </div>
  );
}

const FormTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  return (
    <Button {...props} ref={ref} variant="default">
      <UserPlus2 />
      <p>Add Student</p>
    </Button>
  );
});
