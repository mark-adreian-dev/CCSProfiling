import { ROUTER_CONFIG } from "@/core/config/router.config";
import { Role } from "@/core/enums/roles.enums";
import { useLogoutMutation } from "@/core/hooks/auth.hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/presentation/components/base/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/presentation/components/base/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/core/presentation/components/base/ui/sidebar";
import { useAuthStore } from "@/core/store/auth.store";
import { EllipsisVerticalIcon, LogOutIcon, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { mutateAsync: logout, isPending } = useLogoutMutation();
  const userData = useAuthStore((state) => state.user);
  const Initials = `${userData?.first_name[0].toUpperCase()}${userData?.last_name[0].toUpperCase()}`;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{Initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userData?.role !== Role.STUDENT && (
              <DropdownMenuItem className="gap-2">
                <Link
                  className="flex items-center gap-2"
                  to={`${ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.FACULTY.SUB_ROUTES.PROFILE.URL}/${userData?.id}`}
                >
                  <UserCircle className="h-4 w-4" />
                  <span>View profile</span>
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              disabled={isPending}
              onClick={() => logout()}
              className="!hover:text-primary-foreground !hover:bg-destructive cursor-pointer"
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
