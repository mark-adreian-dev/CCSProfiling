import { Separator } from "@/core/presentation/components/base/ui/separator";
import { SidebarTrigger } from "@/core/presentation/components/base/ui/sidebar";
import { useAuthStore } from "@/core/store/auth.store";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        {user && <h1 className="text-base font-medium">Welcome, {user.first_name}</h1>}
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 hover:bg-primary hover:text-primary-foreground" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
