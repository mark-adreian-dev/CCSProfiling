import { OrderBy } from "@/core/enums/order.enum";
import PaginatedTable from "@/core/presentation/components/custom/PaginatedTable/PaginatedTable";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import { useMemo, useState } from "react";
import { Label } from "@/core/presentation/components/base/ui/label";
import { Button } from "@/core/presentation/components/base/ui/button";
import { UserPlus2 } from "lucide-react";
import React from "react";
import { useInterestColumns } from "../utils/interests.columns";
import { useGetAllInterestQuery } from "@/core/hooks/interest.hooks";
import type { Interest } from "@/core/domain/entity/interest.entity";
import InterestForm from "../components/InterestForm";

export default function InterestPage() {
  const { column } = useInterestColumns();
  const [tableParams, setTableParams] = useState<PaginationParams<Interest>>({
    page: 1,
    pageSize: 20,
    search: "",
    order: OrderBy.DESCENDING,
    sortBy: "created_at",
  });

  const { data: interestResponse, isPending } = useGetAllInterestQuery({ params: tableParams });
  const tableData = interestResponse ?? null;

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
      <Label className="text-3xl font-bold">Interests</Label>
      <PaginatedTable
        params={tableParams}
        onParamsChange={setTableParams}
        table_preview="badge"
        columns={column}
        data={tableData?.data.content ?? []}
        navigation={PaginatedNavigation}
        isLoading={isPending}
        paginationMetaData={PaginationMetaData}
        form={<InterestForm FormTrigger={FormTrigger} />}
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
      <p>Add Interest</p>
    </Button>
  );
});
