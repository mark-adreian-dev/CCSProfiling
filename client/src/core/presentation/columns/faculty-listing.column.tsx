import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/core/presentation/components/base/ui/badge";
import { Checkbox } from "@/core/presentation/components/base/ui/checkbox";
import type { User } from "@/core/domain/entity/user.entity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/presentation/components/base/ui/dropdown-menu";
import { Button } from "@/core/presentation/components/base/ui/button";
import { format } from "date-fns";
import { CopyIcon, EditIcon, MoreHorizontal, Trash, UserCircle } from "lucide-react";
import { Role } from "@/core/enums/roles.enums";

export const FacultyListingColumn: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  /**
   * INVISIBLE SORT ANCHORS
   * These columns are meant to be hidden via columnVisibility state in PaginatedTable.
   * They allow the Dropdown Filters to "find" these keys for the backend.
   */
  {
    id: "first_name",
    accessorKey: "first_name",
    header: "First name",
  },
  {
    id: "middle_name",
    accessorKey: "middle_name",
    header: "Middle name",
  },
  {
    id: "last_name",
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Date created",
    enableSorting: false,
    enableHiding: false,
  },

  /**
   * VISIBLE COLUMNS
   */
  {
    id: "employee_no",
    accessorKey: "employee_no",
    header: "Employee ID",
    accessorFn: (row) => row.facultyProfile?.employee_no ?? "N/A",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "fullName",
    header: "Full Name",
    // We keep the accessorFn for global filtering purposes
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    cell: ({ row }) => {
      const { name_prefix, first_name, middle_name, last_name, name_suffix } = row.original;
      const full = [name_prefix, first_name, middle_name, last_name, name_suffix].filter(Boolean).join(" ");
      return <p className="font-medium">{full}</p>;
    },
    // We disable sorting on the "Full Name" display column specifically
    // because we want the user to pick "First Name" or "Last Name" in the dropdown.
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="secondary" className="uppercase text-[10px] tracking-tighter">
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => <span className="capitalize">{row.original.sex.toLowerCase()}</span>,
  },
  {
    accessorKey: "date_of_birth",
    header: "Birthday",
    cell: ({ row }) => {
      const date = row.original.date_of_birth;
      return <span>{date instanceof Date ? format(date, "MMM dd, yyyy") : String(date)}</span>;
    },
  },
  {
    id: "actions",
    header: "Action",
    enableSorting: false, // Ensure this never appears in your Sort Dropdown
    cell: ({ row }) => {
      const role = row.original.role;
      const identification_id = role === Role.STUDENT ? row.original.studentProfile?.student_no : row.original.facultyProfile?.employee_no;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="gap-2">
              <UserCircle className="h-4 w-4" />
              <span>View profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <EditIcon className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={() => navigator.clipboard.writeText(identification_id ?? "")}>
              <CopyIcon className="h-4 w-4" />
              <span>Copy ID</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
              <Trash className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
