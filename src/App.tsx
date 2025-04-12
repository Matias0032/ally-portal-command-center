
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EntitiesPage from "./pages/EntitiesPage";
import TasksPage from "./pages/TasksPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/entities" element={
            <MainLayout>
              <EntitiesPage />
            </MainLayout>
          } />
          <Route path="/tasks" element={
            <MainLayout>
              <TasksPage />
            </MainLayout>
          } />
          <Route path="/reports" element={
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          } />
          <Route path="/alerts" element={
            <MainLayout>
              <AlertsPage />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <div className="p-4">
                <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
                <p className="text-muted-foreground mt-2">
                  Configuración del sistema (página en desarrollo)
                </p>
              </div>
            </MainLayout>
          } />
          
          {/* Ruta 404 para páginas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
