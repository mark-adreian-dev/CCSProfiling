import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, type ColumnDef, type Row, type Table as TableType } from "@tanstack/react-table";
import { Button } from "@/core/presentation/components/base/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/presentation/components/base/ui/table";
import { GripVerticalIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

// Create a separate component for the drag handle
export function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon" className="size-7 text-muted-foreground hover:bg-transparent">
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function DraggableRow<TData extends { id: number }>({ row }: { row: Row<TData> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="even:bg-primary/5 relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
}
// data-table.tsx

interface DataTableProps<TData> {
  table: TableType<TData>;
  content: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading: boolean;
  sortableRows?: boolean;
  pageSize: number;
}

export function DataTable<TData extends { id: number }>({
  content: initialData,
  columns,
  table,
  isLoading,
  sortableRows,
  pageSize = 10,
}: DataTableProps<TData>) {
  const [data, setData] = React.useState(() => initialData);

  // Update local data if props change
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sortableId = React.useId();
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));
  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id as UniqueIdentifier) || [], [data]);
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* ... (Keep your Tabs, Selectors, and Header logic here) ... */}

      <div className="rounded-md border overflow-hidden">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                /* 1. SKELETON STATE: Show while fetching */
                Array.from({ length: pageSize }).map((_, rowIndex) => (
                  <TableRow key={`skeleton-row-${rowIndex}`}>
                    {columns.map((_, colIndex) => (
                      <TableCell key={`skeleton-col-${colIndex}`}>
                        <Skeleton className="h-6 w-full animate-pulse bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                sortableRows ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* ... (Keep your Pagination controls here) ... */}
    </div>
  );
}
