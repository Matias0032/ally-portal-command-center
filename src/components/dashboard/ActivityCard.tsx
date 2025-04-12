
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageSquare } from "lucide-react";

interface Activity {
  id: string;
  entityName: string;
  channel: "whatsapp" | "email" | "call";
  message: string;
  timestamp: string;
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    entityName: "Juan Pérez",
    channel: "whatsapp",
    message: "Consulta sobre fecha de pago",
    timestamp: "Hace 10 minutos",
  },
  {
    id: "2",
    entityName: "María García",
    channel: "email",
    message: "Solicitud de refinanciamiento",
    timestamp: "Hace 25 minutos",
  },
  {
    id: "3",
    entityName: "Carlos Rodríguez",
    channel: "call",
    message: "Confirmación de pago realizado",
    timestamp: "Hace 45 minutos",
  },
  {
    id: "4",
    entityName: "Ana Martínez",
    channel: "whatsapp",
    message: "Problema con acceso a portal",
    timestamp: "Hace 1 hora",
  },
  {
    id: "5",
    entityName: "Roberto Sánchez",
    channel: "email",
    message: "Aclaración sobre monto deuda",
    timestamp: "Hace 2 horas",
  },
];

const getChannelIcon = (channel: Activity["channel"]) => {
  switch (channel) {
    case "whatsapp":
      return <MessageSquare className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "call":
      return <Phone className="h-4 w-4" />;
  }
};

const getChannelColor = (channel: Activity["channel"]) => {
  switch (channel) {
    case "whatsapp":
      return "bg-green-500";
    case "email":
      return "bg-blue-500";
    case "call":
      return "bg-yellow-500";
  }
};

export const ActivityCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas interacciones con entidades</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <Avatar className={`h-9 w-9 ${getChannelColor(activity.channel)}`}>
                  {getChannelIcon(activity.channel)}
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.entityName}</p>
                  <p className="text-sm text-muted-foreground">{activity.message}</p>
                  <div className="flex items-center pt-1">
                    <time className="text-xs text-muted-foreground">{activity.timestamp}</time>
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
