import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/views/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeNames } from "@/lib/sidebar.tsx";
import { MoonIcon, SunDimIcon } from "lucide-react";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <div>
      404 - Sidan hittades inte. Var god kontrollera url:en och försök igen.
    </div>
  );
}

function RootComponent() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const queryClient = new QueryClient();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider className="font-nunito">
        <AppSidebar />
        <Toaster position={isMobile ? "bottom-center" : "top-center"} />
        <main className="flex-1">
          <div className="flex items-center gap-2 bg-sidebar p-4">
            <SidebarTrigger />
            <div className="flex-1 flex justify-between items-center">
              <Badge variant="outline">
                {routeNames[pathname] ?? "404 - Okänd sida"}
              </Badge>
              <button
                className="rounded-full border-2 border-gray-500 dark:border-gray-300 size-8 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  document.documentElement.classList.toggle("dark");
                  setIsDarkTheme(!isDarkTheme);
                }}
              >
                {isDarkTheme ? <MoonIcon /> : <SunDimIcon />}
              </button>
            </div>
          </div>
          <div className="h-full flex flex-col items-start gap-6 p-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
