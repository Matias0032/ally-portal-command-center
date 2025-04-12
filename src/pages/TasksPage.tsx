
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Task {
  id: string;
  agent: string;
  entity_name: string;
  description: string;
  status: "completed" | "in_progress" | "failed" | "pending";
  created_at: string;
  updated_at: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: "task-001",
    agent: "payment-reminder",
    entity_name: "Juan Pérez",
    description: "Recordatorio de pago próximo vencimiento",
    status: "completed",
    created_at: "2025-04-10 09:15",
    updated_at: "2025-04-10 09:20"
  },
  {
    id: "task-002",
    agent: "document-verification",
    entity_name: "María García",
    description: "Verificación de documentos de identidad",
    status: "in_progress",
    created_at: "2025-04-11 11:30",
    updated_at: "2025-04-11 11:45"
  },
  {
    id: "task-003",
    agent: "payment-processing",
    entity_name: "Carlos Rodríguez",
    description: "Procesamiento de pago recibido",
    status: "failed",
    created_at: "2025-04-09 14:20",
    updated_at: "2025-04-09 14:35"
  },
  {
    id: "task-004",
    agent: "debt-restructuring",
    entity_name: "Ana Martínez",
    description: "Análisis para reestructuración de deuda",
    status: "pending",
    created_at: "2025-04-11 10:05",
    updated_at: "2025-04-11 10:05"
  },
  {
    id: "task-005",
    agent: "customer-survey",
    entity_name: "Roberto Sánchez",
    description: "Encuesta de satisfacción post-pago",
    status: "completed",
    created_at: "2025-04-10 16:10",
    updated_at: "2025-04-10 16:25"
  }
];

const getStatusBadge = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-green-500">Completada</Badge>;
    case "in_progress":
      return <Badge variant="default" className="bg-blue-500">En Progreso</Badge>;
    case "failed":
      return <Badge variant="destructive">Fallida</Badge>;
    case "pending":
      return <Badge variant="outline">Pendiente</Badge>;
  }
};

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  
  const toggleTaskExpand = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
        <p className="text-muted-foreground">
          Monitoree y gestione las tareas del sistema Aura
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Lista de Tareas</CardTitle>
              <CardDescription>
                Visualice las tareas actuales y pasadas con su estado
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar tarea..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="in_progress">En Progreso</SelectItem>
                  <SelectItem value="failed">Fallidas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: "40px" }}></TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead className="hidden md:table-cell">Entidad</TableHead>
                <TableHead className="hidden lg:table-cell">Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_TASKS.map((task) => (
                <>
                  <TableRow key={task.id} className={expandedTask === task.id ? "border-b-0" : ""}>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleTaskExpand(task.id)}
                        className="h-8 w-8"
                      >
                        {expandedTask === task.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell>{task.agent}</TableCell>
                    <TableCell className="hidden md:table-cell">{task.entity_name}</TableCell>
                    <TableCell className="hidden lg:table-cell">{task.description}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{task.created_at}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Ver Logs</Button>
                    </TableCell>
                  </TableRow>
                  {expandedTask === task.id && (
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={8} className="p-4">
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold">Detalles de la Tarea</h4>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="text-sm text-muted-foreground">ID:</div>
                                <div className="text-sm">{task.id}</div>
                                <div className="text-sm text-muted-foreground">Agente:</div>
                                <div className="text-sm">{task.agent}</div>
                                <div className="text-sm text-muted-foreground">Entidad:</div>
                                <div className="text-sm">{task.entity_name}</div>
                                <div className="text-sm text-muted-foreground">Estado:</div>
                                <div className="text-sm">{getStatusBadge(task.status)}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold">Línea de Tiempo</h4>
                              <div className="mt-2 space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                  <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    1
                                  </div>
                                  <div>
                                    <p className="font-medium">Tarea creada</p>
                                    <p className="text-xs text-muted-foreground">{task.created_at}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                    2
                                  </div>
                                  <div>
                                    <p className="font-medium">Procesamiento iniciado</p>
                                    <p className="text-xs text-muted-foreground">{task.created_at}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                  <div className={`h-5 w-5 rounded-full ${
                                    task.status === "completed" ? "bg-green-500" : 
                                    task.status === "failed" ? "bg-red-500" : 
                                    "bg-blue-500"
                                  } flex items-center justify-center text-white`}>
                                    3
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {task.status === "completed" ? "Completada con éxito" : 
                                       task.status === "failed" ? "Falló la ejecución" : 
                                       "En ejecución"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{task.updated_at}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">Reintentar</Button>
                            <Button size="sm">Intervenir</Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
