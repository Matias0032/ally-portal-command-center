
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, ExternalLink } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
}

const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    title: "Error de autenticación con Supabase",
    description: "El agente no puede acceder a la base de datos de memoria",
    severity: "high",
    timestamp: "Hace 15 minutos"
  },
  {
    id: "2",
    title: "Tasa de rechazo elevada",
    description: "La tasa de rechazo en el canal WhatsApp supera el 20%",
    severity: "medium",
    timestamp: "Hace 2 horas"
  },
  {
    id: "3",
    title: "Actualización de sistema pendiente",
    description: "Hay una actualización del middleware pendiente de instalar",
    severity: "low",
    timestamp: "Hace 5 horas"
  },
  {
    id: "4",
    title: "Posible suplantación de identidad",
    description: "Detección de posible intento de suplantación en ID #5423",
    severity: "high",
    timestamp: "Hace 30 minutos"
  }
];

const getSeverityIcon = (severity: Alert["severity"]) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="h-4 w-4" />;
    case "medium":
    case "low":
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getSeverityBadge = (severity: Alert["severity"]) => {
  switch (severity) {
    case "high":
      return <Badge variant="destructive">Alta</Badge>;
    case "medium":
      return <Badge variant="default" className="bg-amber-500">Media</Badge>;
    case "low":
      return <Badge variant="outline">Baja</Badge>;
  }
};

export const AlertsCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>Notificaciones que requieren atención</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Ver todas
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {MOCK_ALERTS.map((alert) => (
              <div key={alert.id} className="rounded-lg border p-3">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`
                        ${alert.severity === "high" ? "text-red-500" : 
                          alert.severity === "medium" ? "text-amber-500" : "text-blue-500"}
                      `}>
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <h3 className="font-semibold text-sm">{alert.title}</h3>
                    </div>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <time className="text-xs text-muted-foreground">{alert.timestamp}</time>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Resolver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
