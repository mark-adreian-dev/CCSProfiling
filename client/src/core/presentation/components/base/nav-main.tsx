import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/presentation/components/base/ui/sidebar";
import { SearchCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <SearchCheck />
              <span>Quick Find</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-2">
          {items.map((item) => (
            <Link key={item.title} to={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`${
                    pathName.toLowerCase().includes(item.title.toLowerCase()) && "bg-primary text-primary-foreground"
                  } hover:bg-primary hover:text-primary-foreground`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
