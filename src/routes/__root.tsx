import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/views/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const parsedName = pathname.replace("/", "").replace("-", " ") || "Home";

  return (
    <SidebarProvider className="font-nunito">
      <AppSidebar />
      <Toaster position={isMobile ? "bottom-center" : "top-center"} />
      <main className="flex-1 p-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Badge variant="secondary" className="capitalize">
            {parsedName}
          </Badge>
        </div>
        <div className="h-full flex flex-col items-start gap-6 p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
