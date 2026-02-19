import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarSections } from "@/lib/sidebar.tsx";

export default function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="font-semibold">ibchillin.io</SidebarHeader>
      <SidebarContent>
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                {section.items.map((item) => (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.path}
                            onClick={() => setOpenMobile(false)}
                          >
                            <item.icon strokeWidth={1.5} />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="text-gray-400 text-xs">
        © 2026 Gus Davidson Group
      </SidebarFooter>
    </Sidebar>
  );
}
