import { useCallback, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/presentation/components/base/ui/dropdown-menu";
import { Button } from "@/core/presentation/components/base/ui/button";
import { EditIcon, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import type { Interest } from "@/core/domain/entity/interest.entity";
import InterestForm from "../components/InterestForm";
import { useDeleteInterestMutation } from "@/core/hooks/interest.hooks";

export const useInterestColumns = () => {
  const { mutateAsync: deleteInterest, isPending: isDeletingInterest } = useDeleteInterestMutation();

  const handleDeleteInterest = useCallback(
    async (interestId: number) => {
      await deleteInterest(interestId);
    },
    [deleteInterest]
  );

  const column = useMemo<ColumnDef<Interest>[]>(
    () => [
      { id: "name", accessorKey: "name", header: "Name" },

      {
        id: "actions",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"icon"} size={"icon"} className="hover:bg-primary-foreground hover:text-black">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* CRITICAL FIX: 
                  1. Use onSelect + e.preventDefault() to keep the dropdown from unmounting the form.
                  2. Use p-0 so the trigger fills the entire item area.
                */}
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0 focus:bg-transparent">
                  <InterestForm targetID={row.original.id} FormTrigger={FormTrigger} />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    handleDeleteInterest(Number(row.original.id));
                  }}
                  className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <Trash className="h-4 w-4" />
                  <span>{isDeletingInterest ? "Deleting..." : "Delete"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleDeleteInterest, isDeletingInterest]
  );

  return { column };
};

const FormTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      // Re-apply the dropdown item styling manually so it looks like a real item
      className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 gap-2 w-full"
      onClick={(e) => {
        // Prevent click from bubbling up to the DropdownMenuItem's internal handlers
        e.stopPropagation();
        props.onClick?.(e);
      }}
    >
      <EditIcon className="h-4 w-4" />
      <span>Edit</span>
    </div>
  );
});
FormTrigger.displayName = "FormTrigger";
