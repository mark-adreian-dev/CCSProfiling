import { type Table } from "@tanstack/react-table";
import { Input } from "@/core/presentation/components/base/ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/core/presentation/components/base/ui/button";

interface TableSearchProps<TData> {
  table: Table<TData>;
  placeholder?: string;
}

export default function TableSearch<TData>({ table, placeholder = "Search all columns..." }: TableSearchProps<TData>) {
  // Get current value from table state
  const value = (table.getState().globalFilter as string) ?? "";

  const handleClear = () => {
    table.setGlobalFilter("");
  };

  return (
    <div className="relative flex items-center w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder} value={value} onChange={(e) => table.setGlobalFilter(e.target.value)} className="pl-9 pr-9 h-9" />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-0.5 rounded-md hover:bg-destructive! text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
