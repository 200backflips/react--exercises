import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/views/app-sidebar";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const routeNames: Record<string, string> = {
  "/": "Startsida",
  "/react-query": "React Query",
  "/redux": "Redux",
  "/speech-2-text": "Speech 2 Text",
  "/the-list": "The List",
  "/zustand": "Zustand",
};

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

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider className="font-nunito">
        <AppSidebar />
        <Toaster position={isMobile ? "bottom-center" : "top-center"} />
        <main className="flex-1">
          <div className="flex items-center gap-2 bg-sidebar p-4">
            <SidebarTrigger />
            <Badge variant="outline" className="bg-white">
              {routeNames[pathname] ?? "404 - Okänd sida"}
            </Badge>
          </div>
          <div className="h-full flex flex-col items-start gap-6 p-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
