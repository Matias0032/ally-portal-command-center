
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Users } from "lucide-react";

interface EntityStats {
  total: number;
  active: number;
  withDebt: number;
  newToday: number;
}

const MOCK_ENTITY_STATS: EntityStats = {
  total: 1254,
  active: 845,
  withDebt: 623,
  newToday: 15,
};

export const EntityStatsCard = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Entidades</CardTitle>
        <CardDescription>Vista general de entidades monitoreadas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-4">
            <Users className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-2xl font-bold">{MOCK_ENTITY_STATS.total}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-muted p-4">
            <BadgeCheck className="h-6 w-6 text-green-500" />
            <span className="text-xs text-muted-foreground">Activas</span>
            <span className="text-2xl font-bold">{MOCK_ENTITY_STATS.active}</span>
          </div>
          
          <div className="col-span-2 flex items-center justify-between rounded-lg bg-muted p-4">
            <div>
              <p className="text-xs text-muted-foreground">Con deuda activa</p>
              <p className="text-xl font-bold">{MOCK_ENTITY_STATS.withDebt}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Nuevas hoy</p>
              <p className="text-xl font-bold">{MOCK_ENTITY_STATS.newToday}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
