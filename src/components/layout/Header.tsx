
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
        </div>
        
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 md:w-1/3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-md bg-background pl-8 md:w-[250px] lg:w-[350px]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificaciones</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="hidden text-sm md:block">
                <span className="font-medium">Supervisor</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium text-sm">
                S
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
