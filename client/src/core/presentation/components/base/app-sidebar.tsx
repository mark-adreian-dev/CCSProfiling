import * as React from "react";
import { NavMain } from "@/core/presentation/components/base/nav-main";
import { NavUser } from "@/core/presentation/components/base/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/presentation/components/base/ui/sidebar";
import CCSLogo from "@/core/presentation/assets/ccs-logo.png";
import type { AppSideBar } from "../../types/app-sidebar.types";

export function AppSidebar({ sideBarConfig, ...props }: React.ComponentProps<typeof Sidebar> & { sideBarConfig: AppSideBar }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5! h-fit">
              <a href="#" className="flex gap-4">
                <div className="h-full aspect-auto relative">
                  <img src={CCSLogo} className="object-contain object-center w-20 h-20" />
                </div>
                <div>
                  <span className="text-base font-semibold truncate-none! whitespace-normal!">College of Computing Studies (CCS)</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavUser user={sideBarConfig.user} />
        <NavMain items={sideBarConfig.navMain} />

        {/* <NavSecondary items={sideBarConfig.navSecondary} className="mt-auto" />
        <NavDocuments items={sideBarConfig.documents}/> */}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
