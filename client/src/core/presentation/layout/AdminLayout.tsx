import { AppSidebar } from "@/core/presentation/components/base/app-sidebar";
import { SiteHeader } from "@/core/presentation/components/base/site-header";
import { SidebarInset, SidebarProvider } from "@/core/presentation/components/base/ui/sidebar";
import { useAuthStore } from "@/core/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";
import { BookUserIcon, UserCircle2Icon, CameraIcon, FileTextIcon, Sprout, BookMarked } from "lucide-react";
import type { AppSideBar } from "../types/app-sidebar.types";
import { useMemo } from "react";
import { ROUTER_CONFIG } from "@/core/config/router.config";
import { Role } from "@/core/enums/roles.enums";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const appSideBarConfig: AppSideBar = useMemo(
    () => ({
      user: {
        name: user?.first_name ?? "",
        email: user?.email ?? "",
        avatar: user?.profile_picture ?? undefined,
      },
      navMain: [
        { title: "Students", url: ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.STUDENTS.URL, icon: <BookUserIcon /> },
        { title: "Faculty", url: ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.FACULTY.URL, icon: <UserCircle2Icon /> },
        { title: "Interests", url: ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.INTEREST.URL, icon: <Sprout /> },
        { title: "Curriculum", url: ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.ADMIN.CURRICULUM.URL, icon: <BookMarked /> },
      ],
      navClouds: [
        {
          title: "Capture",
          icon: <CameraIcon />,
          isActive: true,
          url: "#",
          items: [
            { title: "Active Proposals", url: "#" },
            { title: "Archived", url: "#" },
          ],
        },
        {
          title: "Proposal",
          icon: <FileTextIcon />,
          url: "#",
          items: [
            { title: "Active Proposals", url: "#" },
            { title: "Archived", url: "#" },
          ],
        },
        {
          title: "Prompts",
          icon: <FileTextIcon />,
          url: "#",
          items: [
            { title: "Active Proposals", url: "#" },
            { title: "Archived", url: "#" },
          ],
        },
      ],
    }),
    [user]
  );

  if (user) {
    if (user.role === Role.STUDENT) {
      return <Navigate to={ROUTER_CONFIG.PROTECTED.DASHBOARD.ROUTES.STUDENT.QUICK_FIND.URL} />;
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" sideBarConfig={appSideBarConfig} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
