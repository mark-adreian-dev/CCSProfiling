import { flexRender, type Table as TableType } from "@tanstack/react-table";
import { Badge } from "../../../base/ui/badge";
import SpinnerLoader from "../../Loader/LoadingSpinner";
interface BadgePreviewProps<TData> {
  table: TableType<TData>;
  isLoading: boolean;
}

export default function BadgePreview<TData>({ table, isLoading }: BadgePreviewProps<TData>) {
  const rows = table.getRowModel().rows;

  return (
    <div className="flex flex-wrap justify-start content-start gap-3 w-full px-0 py-10 xl:min-h-75 lg:px-50 xxl:px-75">
      {isLoading ? (
        <SpinnerLoader message="fetching data.." />
      ) : (
        rows.map((row) => (
          <Badge key={row.id} className="rounded-full border border-primary bg-transparent px-4 h-fit hover:bg-primary flex gap-3">
            {row.getVisibleCells().map((cell) => (
              <span className="text-xl p-0" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            ))}
          </Badge>
        ))
      )}
    </div>
  );
}
