
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BadgePlus, CheckCircle, Clock, XCircle } from "lucide-react";

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  failed: number;
  pending: number;
}

const MOCK_TASK_STATS: TaskStats = {
  total: 48,
  completed: 23,
  inProgress: 12,
  failed: 5,
  pending: 8,
};

export const TasksSummaryCard = () => {
  const completionPercentage = Math.round(
    (MOCK_TASK_STATS.completed / MOCK_TASK_STATS.total) * 100
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estado de Tareas</CardTitle>
        <CardDescription>Resumen de tareas actuales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progreso General</span>
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Completadas</p>
                <p className="text-2xl font-bold">{MOCK_TASK_STATS.completed}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">En Progreso</p>
                <p className="text-2xl font-bold">{MOCK_TASK_STATS.inProgress}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Fallidas</p>
                <p className="text-2xl font-bold">{MOCK_TASK_STATS.failed}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <BadgePlus className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Pendientes</p>
                <p className="text-2xl font-bold">{MOCK_TASK_STATS.pending}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
