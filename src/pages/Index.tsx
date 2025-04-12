
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  // Esta renderización es solo un fallback mientras se redirige
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Ally Portal</h1>
        <p className="text-xl text-gray-600">Cargando la interfaz de supervisión...</p>
      </div>
    </div>
  );
};

export default Index;
