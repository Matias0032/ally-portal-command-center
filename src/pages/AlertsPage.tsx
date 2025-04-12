
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, BellOff, Clock, Eye, Info, Search, Settings, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  status: "active" | "acknowledged" | "resolved";
  category: "security" | "performance" | "system" | "user";
}

const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    title: "Detección de patrón inusual",
    description: "Se ha detectado un patrón de actividad inusual en la cuenta de María García",
    timestamp: "2025-04-12 09:23:45",
    priority: "high",
    status: "active",
    category: "security"
  },
  {
    id: "2",
    title: "Tiempo de respuesta excesivo",
    description: "El módulo de validación está experimentando tiempos de respuesta superiores a 2 segundos",
    timestamp: "2025-04-11 16:42:18",
    priority: "medium",
    status: "acknowledged",
    category: "performance"
  },
  {
    id: "3",
    title: "Error de validación recurrente",
    description: "Se han detectado errores recurrentes en la validación de documentos de identidad",
    timestamp: "2025-04-11 11:05:33",
    priority: "medium",
    status: "active",
    category: "system"
  },
  {
    id: "4",
    title: "Actualización de sistema pendiente",
    description: "Hay una actualización crítica de seguridad pendiente de aplicar",
    timestamp: "2025-04-10 08:15:22",
    priority: "low",
    status: "resolved",
    category: "system"
  },
  {
    id: "5",
    title: "Múltiples intentos fallidos de autenticación",
    description: "Se han detectado múltiples intentos fallidos de autenticación para el usuario Juan Pérez",
    timestamp: "2025-04-09 23:59:01",
    priority: "high",
    status: "acknowledged",
    category: "security"
  },
];

const NOTIFICATION_SETTINGS = [
  { id: "security", name: "Alertas de Seguridad", enabled: true },
  { id: "performance", name: "Problemas de Rendimiento", enabled: true },
  { id: "system", name: "Eventos del Sistema", enabled: true },
  { id: "user", name: "Acciones de Usuario", enabled: false },
];

const getPriorityBadge = (priority: Alert["priority"]) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-500">Alta</Badge>;
    case "medium":
      return <Badge className="bg-amber-500">Media</Badge>;
    case "low":
      return <Badge className="bg-blue-500">Baja</Badge>;
  }
};

const getStatusBadge = (status: Alert["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-red-500">Activa</Badge>;
    case "acknowledged":
      return <Badge className="bg-amber-500">Reconocida</Badge>;
    case "resolved":
      return <Badge className="bg-green-500">Resuelta</Badge>;
  }
};

const getCategoryIcon = (category: Alert["category"]) => {
  switch (category) {
    case "security":
      return <ShieldAlert className="text-red-500 h-5 w-5" />;
    case "performance":
      return <Clock className="text-amber-500 h-5 w-5" />;
    case "system":
      return <Info className="text-blue-500 h-5 w-5" />;
    case "user":
      return <Bell className="text-purple-500 h-5 w-5" />;
  }
};

const AlertsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Alert["priority"] | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Alert["status"] | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<Alert["category"] | "all">("all");
  const [notificationSettings, setNotificationSettings] = useState(NOTIFICATION_SETTINGS);

  const filteredAlerts = useMemo(() => {
    return MOCK_ALERTS.filter(alert => {
      const matchesSearch = 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter;
      const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || alert.category === categoryFilter;
      
      return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
    });
  }, [searchQuery, priorityFilter, statusFilter, categoryFilter]);

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alertas</h1>
        <p className="text-muted-foreground">
          Monitoreo y gestión de alertas del sistema Aura
        </p>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Alertas Activas</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Alertas Activas</CardTitle>
                  <CardDescription>
                    Alertas que requieren atención o intervención
                  </CardDescription>
                </div>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar alertas..."
                      className="pl-8 w-full md:w-[240px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select 
                    value={priorityFilter} 
                    onValueChange={(value: Alert["priority"] | "all") => setPriorityFilter(value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={statusFilter} 
                    onValueChange={(value: Alert["status"] | "all") => setStatusFilter(value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activa</SelectItem>
                      <SelectItem value="acknowledged">Reconocida</SelectItem>
                      <SelectItem value="resolved">Resuelta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={`
                    ${alert.priority === "high" ? "border-l-4 border-l-red-500" : ""}
                    ${alert.priority === "medium" ? "border-l-4 border-l-amber-500" : ""}
                    ${alert.priority === "low" ? "border-l-4 border-l-blue-500" : ""}
                  `}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2 items-center">
                          {getCategoryIcon(alert.category)}
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          {getPriorityBadge(alert.priority)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {alert.timestamp}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Detalles
                          </Button>
                          {alert.status === "active" && (
                            <Button variant="outline" size="sm">
                              <Info className="h-4 w-4 mr-1" />
                              Reconocer
                            </Button>
                          )}
                          {alert.status !== "resolved" && (
                            <Button variant="outline" size="sm">
                              <Bell className="h-4 w-4 mr-1" />
                              Resolver
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredAlerts.length === 0 && (
                  <div className="text-center p-8">
                    <BellOff className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <p className="mt-2 text-lg font-medium">No hay alertas que coincidan con los filtros</p>
                    <p className="text-sm text-muted-foreground">Prueba a cambiar los filtros o la búsqueda</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Historial de Alertas</CardTitle>
                  <CardDescription>
                    Registro histórico de todas las alertas generadas
                  </CardDescription>
                </div>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <Select 
                    value={categoryFilter} 
                    onValueChange={(value: Alert["category"] | "all") => setCategoryFilter(value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="security">Seguridad</SelectItem>
                      <SelectItem value="performance">Rendimiento</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                      <SelectItem value="user">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{getCategoryIcon(alert.category)}</TableCell>
                      <TableCell className="font-medium">{alert.title}</TableCell>
                      <TableCell>{getPriorityBadge(alert.priority)}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Alertas</CardTitle>
              <CardDescription>
                Gestione sus preferencias de notificación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Canales de Notificación</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="email-notifications" className="flex flex-col space-y-1">
                      <span>Notificaciones por Email</span>
                      <span className="text-xs text-muted-foreground">Recibir alertas por correo electrónico</span>
                    </label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="dashboard-notifications" className="flex flex-col space-y-1">
                      <span>Notificaciones en Dashboard</span>
                      <span className="text-xs text-muted-foreground">Mostrar alertas en tiempo real en el dashboard</span>
                    </label>
                    <Switch id="dashboard-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="mobile-notifications" className="flex flex-col space-y-1">
                      <span>Notificaciones Móviles</span>
                      <span className="text-xs text-muted-foreground">Enviar notificaciones push al móvil</span>
                    </label>
                    <Switch id="mobile-notifications" />
                  </div>
                </div>
                
                <div className="my-6">
                  <h3 className="text-lg font-medium mb-2">Tipos de Alertas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Seleccione qué tipos de alertas desea recibir
                  </p>
                  
                  <div className="grid gap-2">
                    {notificationSettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between space-x-2">
                        <label htmlFor={`notify-${setting.id}`} className="flex flex-col space-y-1">
                          <span>{setting.name}</span>
                        </label>
                        <Switch 
                          id={`notify-${setting.id}`} 
                          checked={setting.enabled}
                          onCheckedChange={() => toggleNotification(setting.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline">Restablecer</Button>
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    Guardar Configuración
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;
