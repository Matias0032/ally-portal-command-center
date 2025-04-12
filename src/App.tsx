
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EntitiesPage from "./pages/EntitiesPage";
import TasksPage from "./pages/TasksPage";
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
          {/* Las otras rutas mencionadas en el sidebar (reports, alerts, settings) se pueden añadir aquí */}
          
          {/* Ruta 404 para páginas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
