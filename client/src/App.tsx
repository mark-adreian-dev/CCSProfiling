import { AppSidebar } from "@/core/components/base/app-sidebar"
import { ChartAreaInteractive } from "@/core/components/base/chart-area-interactive"
import { DataTable } from "@/core/components/base/data-table"
import { SectionCards } from "@/core/components/base/section-cards"
import { SiteHeader } from "@/core/components/base/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/core/components/base/ui/sidebar"
import data from "@/app/dashboard/data.json"

export function App() {
  return <SidebarProvider
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
  </SidebarProvider>;
}

export default App;