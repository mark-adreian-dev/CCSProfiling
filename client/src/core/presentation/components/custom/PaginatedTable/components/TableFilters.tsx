import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/core/presentation/components/base/ui/dropdown-menu";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, FilterX, ListFilter } from "lucide-react";
import { Button } from "@/core/presentation/components/base/ui/button";
import { RadioGroupItem, RadioGroup } from "@/core/presentation/components/base/ui/radio-group";
import { Label } from "@/core/presentation/components/base/ui/label";
import { OrderBy } from "@/core/enums/order.enum";
import { type Table } from "@tanstack/react-table";
import { type PaginationParams } from "@/core/utils/types/pagination-params.types";

interface TableFiltersProps<TData extends { id: number }> {
  table: Table<TData>;
  params: PaginationParams<TData>;
  onParamsChange: React.Dispatch<React.SetStateAction<PaginationParams<TData>>>;
}

export default function TableFilters<TData extends { id: number }>({ table, params, onParamsChange }: TableFiltersProps<TData>) {
  const dynamicSortFields = table
    .getAllColumns()
    .filter((column) => column.getCanSort() && typeof column.columnDef.header === "string")
    .map((column) => ({
      label: column.columnDef.header as string,
      value: column.id,
    }));

  const handleReset = () => {
    onParamsChange({
      page: 1,
      pageSize: 10,
      search: "",
      order: OrderBy.ASCENDING,
      sortBy: "created_at" as keyof TData,
    });

    // Also clear TanStack internal state if you're using column filters
    table.resetColumnFilters();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <ListFilter />
          <p className="text-sm font-medium">Sort Options</p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex items-start flex-col w-56 p-3 gap-2">
        <DropdownMenuLabel className="px-1 text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort By</DropdownMenuLabel>

        <DropdownMenuSeparator className="h-px bg-border w-full" />

        {/* 1. SORT FIELD RADIO GROUP */}
        <RadioGroup
          value={params.sortBy as string}
          onValueChange={(val) => onParamsChange((prev) => ({ ...prev, sortBy: val as keyof TData, page: 1 }))}
          className="gap-1 w-full"
        >
          {dynamicSortFields.map((field) => (
            <div key={field.value} className="flex items-center space-x-3 rounded-md px-2 py-1.5 hover:bg-accent transition-colors cursor-pointer">
              <RadioGroupItem value={field.value} id={`sort-${field.value}`} />
              <Label htmlFor={`sort-${field.value}`} className="flex-1 cursor-pointer text-sm font-medium">
                {field.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DropdownMenuSeparator className="h-px bg-border w-full my-1" />

        <DropdownMenuLabel className="px-1 text-xs font-bold text-muted-foreground uppercase tracking-widest">Direction</DropdownMenuLabel>

        {/* 2. ORDER DIRECTION RADIO GROUP */}
        <RadioGroup
          value={params.order}
          onValueChange={(val) => onParamsChange((prev) => ({ ...prev, order: val as OrderBy, page: 1 }))}
          className="gap-1 w-full"
        >
          {Object.entries(OrderBy).map(([key, val]) => (
            <div key={val} className="flex items-center space-x-3 rounded-md px-2 py-1.5 hover:bg-accent transition-colors cursor-pointer">
              <RadioGroupItem value={val} id={`dir-${val}`} />
              <Label htmlFor={`dir-${val}`} className="flex flex-1 items-center gap-2 cursor-pointer text-sm font-medium capitalize">
                {val === OrderBy.ASCENDING ? (
                  <ArrowUpNarrowWide className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <ArrowDownWideNarrow className="h-3.5 w-3.5 text-primary" />
                )}
                {key.toLowerCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Button variant="secondary" onClick={handleReset} className="w-full hover:bg-primary">
          <FilterX />
          Reset Filters
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
