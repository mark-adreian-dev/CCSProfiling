import { AppSidebar } from "@/core/presentation/components/base/app-sidebar";
import { ChartAreaInteractive } from "@/core/presentation/components/base/chart-area-interactive";
import { DataTable } from "@/core/presentation/components/base/data-table";
import { SectionCards } from "@/core/presentation/components/base/section-cards";
import { SiteHeader } from "@/core/presentation/components/base/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/core/presentation/components/base/ui/sidebar";

import data from "@/app/dashboard/data.json";

export default function DashboardLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
