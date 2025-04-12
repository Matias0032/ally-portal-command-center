
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Entity {
  id: string;
  full_name: string;
  document_id: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  last_interaction: string;
}

const MOCK_ENTITIES: Entity[] = [
  {
    id: "1",
    full_name: "Juan Pérez",
    document_id: "12345678",
    email: "juan.perez@example.com",
    phone: "+52 55 1234 5678",
    status: "active",
    last_interaction: "2025-04-10 14:23"
  },
  {
    id: "2",
    full_name: "María García",
    document_id: "87654321",
    email: "maria.garcia@example.com",
    phone: "+52 55 8765 4321",
    status: "active",
    last_interaction: "2025-04-11 09:45"
  },
  {
    id: "3",
    full_name: "Carlos Rodríguez",
    document_id: "23456789",
    email: "carlos.rodriguez@example.com",
    phone: "+52 55 2345 6789",
    status: "inactive",
    last_interaction: "2025-04-09 16:30"
  },
  {
    id: "4",
    full_name: "Ana Martínez",
    document_id: "98765432",
    email: "ana.martinez@example.com",
    phone: "+52 55 9876 5432",
    status: "pending",
    last_interaction: "2025-04-11 11:15"
  },
  {
    id: "5",
    full_name: "Roberto Sánchez",
    document_id: "34567890",
    email: "roberto.sanchez@example.com",
    phone: "+52 55 3456 7890",
    status: "active",
    last_interaction: "2025-04-10 17:50"
  }
];

const getStatusBadge = (status: Entity["status"]) => {
  switch (status) {
    case "active":
      return <Badge variant="default" className="bg-green-500">Activo</Badge>;
    case "inactive":
      return <Badge variant="default" className="bg-gray-500">Inactivo</Badge>;
    case "pending":
      return <Badge variant="default" className="bg-amber-500">Pendiente</Badge>;
  }
};

const EntitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Entity["status"] | "all">("all");

  const filteredEntities = useMemo(() => {
    return MOCK_ENTITIES.filter(entity => {
      const matchesSearch = 
        entity.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.document_id.includes(searchQuery) ||
        entity.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.phone.includes(searchQuery);
      
      const matchesStatus = statusFilter === "all" || entity.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Entidades</h1>
        <p className="text-muted-foreground">
          Gestione y monitoree las entidades registradas en el sistema
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Lista de Entidades</CardTitle>
              <CardDescription>
                Visualice y busque entidades por nombre, documento, email o teléfono
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar entidad..."
                  className="pl-8 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={statusFilter} 
                onValueChange={(value: Entity["status"] | "all") => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
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
                <TableHead>Nombre</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Última Interacción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntities.map((entity) => (
                <TableRow key={entity.id}>
                  <TableCell className="font-medium">{entity.full_name}</TableCell>
                  <TableCell>{entity.document_id}</TableCell>
                  <TableCell className="hidden md:table-cell">{entity.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{entity.phone}</TableCell>
                  <TableCell>{getStatusBadge(entity.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{entity.last_interaction}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <EyeIcon className="h-4 w-4" />
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

export default EntitiesPage;
