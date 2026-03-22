// PaginatedTable.tsx
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";
import { DataTable } from "../../base/data-table";
import type { PaginatedNavigation, PaginationMetaData } from "@/core/infrastructure/dto/paginated-response.dto";
import { PaginationControls } from "./components/PaginationControls";
import React, { useEffect } from "react";
import TableSearch from "./components/TableSearch";
import type { PaginationParams } from "@/core/utils/types/pagination-params.types";
import type { OrderBy } from "@/core/enums/order.enum";
import TableFilters from "./components/TableFilters";

interface PaginatedTableProps<TData extends { id: number }> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  navigation: PaginatedNavigation;
  paginationMetaData: PaginationMetaData;
  params: PaginationParams<TData>;
  onParamsChange: React.Dispatch<React.SetStateAction<PaginationParams<TData>>>;
  isLoading: boolean;
  tableSearchControls?: boolean;
  paginationControls?: boolean;
  sortableRows?: boolean;
  form: React.ReactNode;
}

export default function PaginatedTable<TData extends { id: number }>({
  data,
  columns,
  navigation,
  paginationMetaData,
  params,
  onParamsChange,
  tableSearchControls,
  paginationControls,
  isLoading,
  sortableRows,
  form,
}: PaginatedTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    first_name: false,
    last_name: false,
    middle_name: false,
    name_prefix: false,
    name_suffix: false,
    created_at: false,
  });

  const safeSearch = params?.search ?? "";
  // 1. Local state for the search input to allow smooth typing
  const [searchValue, setSearchValue] = React.useState(safeSearch);

  // 2. Debounce effect: Only update parent params after 300ms of no typing
  useEffect(() => {
    // Skip the first render if needed, or just let it sync
    const timeout = setTimeout(() => {
      if (searchValue !== safeSearch) {
        onParamsChange((prev) => ({ ...prev, search: searchValue, page: 1 }));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, onParamsChange, safeSearch]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting: [{ id: params.sortBy as string, desc: params.order === "desc" }], // Sync with parent
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter: searchValue,
      pagination: {
        pageIndex: params.page - 1,
        pageSize: params.pageSize,
      },
    },
    getRowId: (row) => row.id.toString(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,

    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    // SYNC SEARCH
    onGlobalFilterChange: setSearchValue,

    // SYNC PAGINATION
    onPaginationChange: (updater) => {
      const nextState = typeof updater === "function" ? updater({ pageIndex: params.page - 1, pageSize: params.pageSize }) : updater;

      onParamsChange((prev) => ({
        ...prev,
        page: nextState.pageIndex + 1,
        pageSize: nextState.pageSize,
      }));
    },

    // SYNC SORTING
    onSortingChange: (updater) => {
      const nextSorting = typeof updater === "function" ? updater([{ id: params.sortBy as string, desc: params.order === "desc" }]) : updater;

      if (nextSorting.length > 0) {
        onParamsChange((prev) => ({
          ...prev,
          sortBy: nextSorting[0].id as keyof TData,
          order: nextSorting[0].desc ? ("desc" as OrderBy) : ("asc" as OrderBy),
        }));
      }
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full flex items-center gap-4">
          {tableSearchControls && <TableSearch table={table} placeholder="Find something add some keyword..." />}
          <TableFilters table={table} onParamsChange={onParamsChange} params={params} />
        </div>

        {form}
      </div>

      <DataTable
        table={table}
        content={data}
        columns={columns}
        isLoading={isLoading}
        sortableRows={sortableRows}
        pageSize={paginationMetaData.per_page}
      />
      {paginationControls && (
        <PaginationControls
          table={table}
          //Pagination Meta Data
          nextPageNumber={navigation.next_page_num}
          prevPageNumber={navigation.prev_page_num}
          hasNext={navigation.has_more_pages}
          hasPrev={navigation.has_prev_page}
          //Pagination meta data
          total={paginationMetaData.total}
          items_count={paginationMetaData.items_count}
          per_page={paginationMetaData.per_page}
          current_page={paginationMetaData.current_page}
          total_pages={paginationMetaData.total_pages}
        />
      )}
    </div>
  );
}
