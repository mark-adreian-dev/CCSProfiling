import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/presentation/components/base/ui/select";
import { Button } from "@/core/presentation/components/base/ui/button";
import { ArrowLeft, ArrowLeftToLineIcon, ArrowRight, ArrowRightToLineIcon } from "lucide-react";
import { SelectGroup } from "@radix-ui/react-select";
import type { Table } from "@tanstack/react-table";

interface PaginationControlsProps<TData> {
  table: Table<TData>;
  //pagination control data
  nextPageNumber: number | null;
  prevPageNumber: number | null;
  hasNext: boolean;
  hasPrev: boolean;

  //pagination meta data
  current_page: number;
  total_pages: number;
}

export const PaginationControls = <TData,>({ table, current_page, total_pages, hasNext, hasPrev }: PaginationControlsProps<TData>) => {
  const moveToNextPage = () => {
    if (hasNext) table.nextPage();
  };

  const moveToPrevPage = () => {
    if (hasPrev) table.previousPage();
  };

  return (
    <>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="hidden text-sm text-muted-foreground lg:block w-ful">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="w-full flex justify-between space-x-6 lg:space-x-8 lg:justify-end lg:w-fit">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <p className="hidden text-sm font-medium lg:block">Rows per page</p>
            <p className="text-sm font-medium lg:hidden">Size</p>
            <Select value={table.getState().pagination.pageSize.toString()} onValueChange={(value: string) => table.setPageSize(Number(value))}>
              <SelectTrigger className="h-8 w-17.5 rounded-md border border-input bg-transparent px-2 py-1 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[10, 20, 30, 40].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <div className="flex w-25 items-center justify-center text-sm font-medium">
              Page {current_page} of {total_pages}
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="icon" size={"icon"} onClick={() => table.setPageIndex(0)} disabled={current_page === 1}>
                <span className="sr-only">Go to first page</span>
                <ArrowLeftToLineIcon />
              </Button>
              <Button variant="icon" size={"icon"} onClick={moveToPrevPage} disabled={!hasPrev}>
                <span className="sr-only">Go to previous page</span>
                <ArrowLeft />
              </Button>
              <Button variant="icon" size={"icon"} onClick={moveToNextPage} disabled={!hasNext}>
                <span className="sr-only">Go to next page</span>
                <ArrowRight />
              </Button>
              <Button variant="icon" size={"icon"} onClick={() => table.setPageIndex(total_pages - 1)} disabled={current_page === total_pages}>
                <span className="sr-only">Go to last page</span>
                <ArrowRightToLineIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
