
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { TasksSummaryCard } from "@/components/dashboard/TasksSummaryCard";
import { AlertsCard } from "@/components/dashboard/AlertsCard";
import { EntityStatsCard } from "@/components/dashboard/EntityStatsCard";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al Portal de Aliados - Monitoreo del Sistema Aura
        </p>
      </div>

      <Card className="bg-purple-50 dark:bg-purple-900/20">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold">Ally Portal</h2>
            <p className="text-muted-foreground">
              Interfaz de supervisión humana del sistema Aura, visualice entidades y su historial, 
              monitoree tareas y workflows, e intervenga cuando sea necesario.
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
