
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, PlayCircle, StopCircle, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  agent: string;
  status: "in_progress" | "completed" | "failed" | "pending";
  created_at: string;
  entity_name: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Confirmación de documento",
    agent: "Aura-Validate",
    status: "completed",
    created_at: "2025-04-10 14:23",
    entity_name: "Juan Pérez"
  },
  {
    id: "2", 
    title: "Solicitud de crédito",
    agent: "Aura-Credit",
    status: "in_progress",
    created_at: "2025-04-11 09:45",
    entity_name: "María García"
  },
  // Add more mock tasks
];

const getStatusBadge = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-green-500">Completada</Badge>;
    case "in_progress":
      return <Badge variant="default" className="bg-blue-500">En Progreso</Badge>;
    case "failed":
      return <Badge variant="default" className="bg-red-500">Fallida</Badge>;
    case "pending":
      return <Badge variant="default" className="bg-amber-500">Pendiente</Badge>;
  }
};

const getStatusIcon = (status: Task["status"]) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="text-green-500 h-5 w-5" />;
    case "in_progress": return <PlayCircle className="text-blue-500 h-5 w-5" />;
    case "failed": return <XCircle className="text-red-500 h-5 w-5" />;
    case "pending": return <StopCircle className="text-amber-500 h-5 w-5" />;
  }
};

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Task["status"] | "all">("all");

  const filteredTasks = useMemo(() => {
    return MOCK_TASKS.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.entity_name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tareas</h1>
        <p className="text-muted-foreground">
          Monitoree y gestione los workflows y tareas de Aura
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Lista de Tareas</CardTitle>
              <CardDescription>
                Visualice y filtre tareas por título, agente o entidad
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar tarea..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={statusFilter} 
                onValueChange={(value: Task["status"] | "all") => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
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
                <TableHead>Estado</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Agente</TableHead>
                <TableHead>Entidad</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{getStatusIcon(task.status)}</TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.agent}</TableCell>
                  <TableCell>{task.entity_name}</TableCell>
                  <TableCell>{task.created_at}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver Detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
