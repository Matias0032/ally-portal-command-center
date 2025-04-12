
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { TasksSummaryCard } from "@/components/dashboard/TasksSummaryCard";
import { AlertsCard } from "@/components/dashboard/AlertsCard";
import { EntityStatsCard } from "@/components/dashboard/EntityStatsCard";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido al Portal de Supervisión de Aura - Monitoreo en Tiempo Real
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Este dashboard muestra un resumen en tiempo real de las actividades del sistema Aura.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold">Ally Portal</h2>
            <p className="text-muted-foreground">
              Interfaz de supervisión humana para el sistema Aura. 
              Monitoree entidades, flujos de trabajo e intervenga cuando sea necesario.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AlertsCard />
        <TasksSummaryCard />
        <EntityStatsCard />
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <ActivityCard />
      </div>
    </div>
  );
};

export default Dashboard;
