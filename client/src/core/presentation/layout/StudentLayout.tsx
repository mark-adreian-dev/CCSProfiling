import { AppSidebar } from "@/core/presentation/components/base/app-sidebar";
// import { ChartAreaInteractive } from "@/core/presentation/components/base/chart-area-interactive";
// import { DataTable } from "@/core/presentation/components/base/data-table";
// import { SectionCards } from "@/core/presentation/components/base/section-cards";
import { SiteHeader } from "@/core/presentation/components/base/site-header";
import { SidebarInset, SidebarProvider } from "@/core/presentation/components/base/ui/sidebar";
import ManInSuit from "@/core/presentation/assets/man-in-suit.jpg";
import { useAuthStore } from "@/core/store/auth.store";
import { Outlet } from "react-router-dom";
import { BookUserIcon, UserCircle2Icon, BookMarkedIcon, ActivitySquare, HouseIcon, CameraIcon, FileTextIcon } from "lucide-react";
import type { AppSideBar } from "../types/app-sidebar.types";
import { useMemo } from "react";

export default function FacultyLayout() {
  const user = useAuthStore((state) => state.user);
  const appSideBarConfig: AppSideBar = useMemo(
    () => ({
      user: {
        name: user?.first_name ?? "",
        email: user?.email ?? "",
        avatar: user?.profile_picture ?? ManInSuit,
      },
      navMain: [
        { title: "Students", url: "#", icon: <BookUserIcon /> },
        { title: "Faculty", url: "#", icon: <UserCircle2Icon /> },
        { title: "Curriculum", url: "#", icon: <BookMarkedIcon /> },
        { title: "Events", url: "#", icon: <ActivitySquare /> },
        { title: "Rooms", url: "#", icon: <HouseIcon /> },
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
  ); // Only re-run if user changes

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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <p>{user?.role}</p>
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} /> */}
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
