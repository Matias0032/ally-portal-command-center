
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-medium text-gray-600 mt-4">Página no encontrada</h2>
      <p className="text-gray-500 mt-2">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Volver al Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
