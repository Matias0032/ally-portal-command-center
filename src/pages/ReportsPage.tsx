
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, DownloadIcon, FileText, Filter } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for reports
const revenueData = [
  { month: "Ene", agente1: 400, agente2: 240, agente3: 320 },
  { month: "Feb", agente1: 300, agente2: 290, agente3: 330 },
  { month: "Mar", agente1: 450, agente2: 380, agente3: 340 },
  { month: "Abr", agente1: 470, agente2: 420, agente3: 350 },
  { month: "May", agente1: 540, agente2: 460, agente3: 470 },
  { month: "Jun", agente1: 580, agente2: 520, agente3: 510 },
];

const performanceData = [
  { day: "Lun", completed: 23, pending: 12, failed: 5 },
  { day: "Mar", completed: 28, pending: 10, failed: 3 },
  { day: "Mie", completed: 25, pending: 15, failed: 2 },
  { day: "Jue", completed: 30, pending: 8, failed: 4 },
  { day: "Vie", completed: 35, pending: 9, failed: 1 },
  { day: "Sab", completed: 15, pending: 5, failed: 0 },
  { day: "Dom", completed: 10, pending: 3, failed: 0 },
];

const reportsList = [
  { id: "1", title: "Informe Trimestral Q1", date: "2025-03-31", author: "Sistema", type: "Automático" },
  { id: "2", title: "Desempeño Agentes", date: "2025-04-01", author: "Juan Medina", type: "Manual" },
  { id: "3", title: "Análisis de Fallos", date: "2025-04-05", author: "Sistema", type: "Automático" },
  { id: "4", title: "Informe de Productividad", date: "2025-04-08", author: "María López", type: "Manual" },
  { id: "5", title: "Métricas de Efectividad", date: "2025-04-10", author: "Sistema", type: "Automático" },
];

const chartConfig = {
  agente1: { label: "Aura-Verify", color: "#9b87f5" },
  agente2: { label: "Aura-Credit", color: "#33C3F0" },
  agente3: { label: "Aura-Support", color: "#F97316" },
  completed: { label: "Completadas", color: "#10b981" },
  pending: { label: "Pendientes", color: "#f59e0b" },
  failed: { label: "Fallidas", color: "#ef4444" },
};

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [reportType, setReportType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = useMemo(() => {
    return reportsList.filter((report) => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = reportType === "all" || report.type.toLowerCase() === reportType.toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [searchQuery, reportType]);

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <p className="text-muted-foreground">
          Visualice y analice datos del sistema Aura
        </p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <Select 
            value={timeRange} 
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hoy</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative w-full md:w-[280px]">
            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar reportes..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Exportar datos
        </Button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Actividad por Agente</CardTitle>
                <CardDescription>
                  Métricas de actividad de los agentes durante los últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="agente1"
                      stroke={chartConfig.agente1.color}
                      name="Aura-Verify"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="agente2"
                      stroke={chartConfig.agente2.color}
                      name="Aura-Credit"
                    />
                    <Line
                      type="monotone"
                      dataKey="agente3"
                      stroke={chartConfig.agente3.color}
                      name="Aura-Support"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estado de Tareas</CardTitle>
                <CardDescription>
                  Distribución de tareas por estado en la última semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <BarChart data={performanceData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="completed" fill={chartConfig.completed.color} name="Completadas" />
                    <Bar dataKey="pending" fill={chartConfig.pending.color} name="Pendientes" />
                    <Bar dataKey="failed" fill={chartConfig.failed.color} name="Fallidas" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Rendimiento</CardTitle>
              <CardDescription>
                Análisis detallado del rendimiento del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Tiempo de Respuesta</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">245ms</div>
                    <p className="text-xs text-muted-foreground">Promedio última semana</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Tasa de Éxito</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">98.7%</div>
                    <p className="text-xs text-muted-foreground">Promedio último mes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Intervenciones</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Total esta semana</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                  <CardTitle>Reportes Generados</CardTitle>
                  <CardDescription>
                    Lista de todos los informes generados por el sistema
                  </CardDescription>
                </div>
                <Select 
                  value={reportType} 
                  onValueChange={setReportType}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de reporte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="automático">Automáticos</SelectItem>
                    <SelectItem value="manual">Manuales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.author}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
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
      </Tabs>
    </div>
  );
};

export default ReportsPage;
