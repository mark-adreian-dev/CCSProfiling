import { useMemo } from "react";
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
import FacultyForm from "@/core/presentation/components/shared/Forms/FacultyForm";
import React from "react";
import { ROUTER_CONFIG } from "@/core/config/router.config";
import { Link } from "react-router-dom";

export const useFacultyListingColumns = () => {
  const column = useMemo<ColumnDef<User>[]>(
    () => [
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
      { id: "first_name", accessorKey: "first_name", header: "First name" },
      { id: "middle_name", accessorKey: "middle_name", header: "Middle name" },
      { id: "last_name", accessorKey: "last_name", header: "Last name" },
      {
        id: "created_at",
        accessorKey: "created_at",
        header: "Date created",
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "employee_no",
        accessorKey: "employee_no",
        header: "Employee ID",
        accessorFn: (row) => row.facultyProfile?.employee_no ?? "N/A",
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: true,
      },
      {
        id: "fullName",
        header: "Full Name",
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        cell: ({ row }) => {
          const { name_prefix, first_name, middle_name, last_name, name_suffix, profile_picture } = row.original;
          const full = [name_prefix, first_name, middle_name, last_name, name_suffix].filter(Boolean).join(" ");
          const imageSrc = profile_picture ? (profile_picture.startsWith("http") ? profile_picture : `${profile_picture}`) : null;

          return (
            <div className="flex gap-4 items-center">
              {imageSrc ? (
                <img src={imageSrc} alt={full} className="w-10 h-10 rounded-full object-cover border" />
              ) : (
                <UserCircle className="w-10 h-10 text-muted-foreground" />
              )}
              <p className="font-medium">{full}</p>
            </div>
          );
        },
        enableSorting: false,
      },
      { accessorKey: "email", header: "Email" },
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
        enableSorting: false,
        cell: ({ row }) => {
          const role = row.original.role;
          const identification_id = role === Role.STUDENT ? row.original.studentProfile?.student_no : row.original.facultyProfile?.employee_no;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="gap-2">
                  <Link
                    className="flex items-center gap-2"
                    to={`${ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.FACULTY.SUB_ROUTES.PROFILE.URL}/${row.original.id}`}
                  >
                    <UserCircle className="h-4 w-4" />
                    <span>View profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0 focus:bg-transparent">
                  <FacultyForm targetID={row.original.id} FormTrigger={FormTrigger} />
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
    ],
    []
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
