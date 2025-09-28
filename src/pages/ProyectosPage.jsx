import { useState, useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { getAllProject } from '../api/portfolio.api' 
import "../css/glitch.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ProyectosPage() {
  const [proyectos, setProyectos] = useState([]);
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();
  const videoRef = useRef(null);

  // Cargar proyectos desde la API cuando se monta el componente
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getAllProject();
        setProyectos(res.data);
      } catch (error) {
        console.error("Error cargando proyectos:", error);
      }
    }
    fetchProjects();
  }, []);

  // Reiniciar video cuando cambia el proyecto actual
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Esto fuerza la recarga del video
      videoRef.current.play().catch(e => {
        console.log("Auto-play prevenido por el navegador:", e);
      });
    }
  }, [current]); // Se ejecuta cada vez que cambia el proyecto actual

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === proyectos.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? proyectos.length - 1 : prev - 1
    );
  };

  const renderMedia = (proyecto) => {
    try {
      const fileUrl = proyecto.file || proyecto.image || proyecto.video || proyecto.media;
      
      if (!fileUrl) {
        console.warn(`No hay archivo multimedia para el proyecto: ${proyecto.title}`);
        return null;
      }
      
      const fileName = fileUrl.split('/').pop();
      const extension = fileName.split('.').pop().toLowerCase();
      
      console.log(`Proyecto: ${proyecto.title}, Archivo: ${fileUrl}, Extensión: ${extension}`);

      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension)) {
        return (
          <img
            src={fileUrl}
            alt={proyecto.title}
            className="mt-4 mx-auto rounded-lg shadow-lg max-h-64 object-contain"
            onError={(e) => {
              console.error(`Error cargando imagen: ${fileUrl}`);
              e.target.style.display = 'none';
            }}
          />
        );
      } else if (['mp4', 'webm', 'ogg', 'mov'].includes(extension)) {
        return (
          <video
            ref={videoRef} // Referencia para controlar el video
            key={current} // Key única para forzar recreación del componente
            autoPlay
            muted
            loop
            playsInline
            controls
            className="mt-4 mx-auto rounded-lg shadow-lg max-h-64"
            onError={(e) => {
              console.error(`Error cargando video: ${fileUrl}`);
              e.target.style.display = 'none';
            }}
          >
            <source src={fileUrl} type={`video/${extension}`} />
            Tu navegador no soporta el elemento de video.
          </video>
        );
      } else {
        console.warn(`Extensión no manejada: ${extension} para archivo: ${fileUrl}`);
        return (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-center">Tipo de archivo no compatible: {extension}</p>
            <a 
              href={fileUrl} 
              className="block text-center text-blue-400 mt-2"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ver archivo
            </a>
          </div>
        );
      }
    } catch (error) {
      console.error('Error renderizando media:', error);
      return null;
    }
  };

  if (proyectos.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-[#F4F2EF]'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 border-[#97E3FE]"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-[#5A3E36]'}>
            Cargando Proyectos...
          </p>
        </div>
      </div>
    );
  }

  const currentProyecto = proyectos[current];

  return (
    <div
      className={`min-h-screen px-8 py-12 flex flex-col items-center transition-all duration-500 ${
        theme === "dark"
          ? "bg-black text-gray-200"
          : "bg-[#F4F2EF] text-[#5A3E36]"
      }`}
    >
      {/* Título */}
      <h1
        className={`text-5xl font-extrabold tracking-widest mb-10 transition-all duration-500 ${
          theme === "dark"
            ? "glitch text-[#97E3FE]"
            : "text-[#CD4662] font-serif italic"
        }`}
        data-text={theme === "dark" ? "PROYECTOS" : ""}
      >
        PROYECTOS
      </h1>

      {/* Carrusel */}
      <div className="relative w-full max-w-3xl">
        <div
          className={`p-8 rounded-xl border transition-all duration-500 text-center ${
            theme === "dark"
              ? "border-[#9A53D0] bg-gradient-to-br from-[#2843AD] to-[#818DE0] shadow-[0_0_25px_#F394F8]"
              : "border-[#F4DBDB] bg-white shadow-lg"
          }`}
        >
          <h2
            className={`text-2xl font-bold transition-colors duration-500 ${
              theme === "dark"
                ? "text-[#F394F8] drop-shadow-[0_0_6px_#F394F8]"
                : "text-[#CD4662]"
            }`}
          >
            {currentProyecto.title}
          </h2>
          
          {/* Descripción - siempre visible */}
          {currentProyecto.description && (
            <p className={`my-4 ${theme === "dark" ? "text-gray-300" : "text-[#5A3E36]"}`}>
              {currentProyecto.description}
            </p>
          )}
          
          {/* Enlace - solo si está disponible */}
          {currentProyecto.link && (
            <a 
              href={currentProyecto.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block my-3 px-4 py-2 rounded-lg transition-all ${
                theme === "dark" 
                  ? "bg-[#9A53D0] hover:bg-[#7A33B0]" 
                  : "bg-[#CD4662] hover:bg-[#AD2642] text-white"
              }`}
            >
              Ver proyecto en línea
            </a>
          )}

          {/* Renderizar imagen o video según el tipo de archivo */}
          {renderMedia(currentProyecto)}
        </div>

        {/* Botones de navegación */}
        <button 
          onClick={prevSlide} 
          className={`absolute top-1/2 -left-12 transform -translate-y-1/2 text-3xl p-2 rounded-full transition-all ${
            theme === "dark" 
              ? "bg-[#2843AD] hover:bg-[#3843DD] text-[#F394F8]" 
              : "bg-[#CD4662] hover:bg-[#AD2642] text-white"
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide} 
          className={`absolute top-1/2 -right-12 transform -translate-y-1/2 text-3xl p-2 rounded-full transition-all ${
            theme === "dark" 
              ? "bg-[#2843AD] hover:bg-[#3843DD] text-[#F394F8]" 
              : "bg-[#CD4662] hover:bg-[#AD2642] text-white"
          }`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex gap-2 mt-6">
        {proyectos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === current
                ? theme === "dark"
                  ? "bg-[#F394F8] shadow-[0_0_12px_#F394F8]"
                  : "bg-[#CD4662] shadow-[0_0_8px_#CD4662]"
                : theme === "dark"
                ? "bg-[#2843AD] hover:bg-[#3843DD]"
                : "bg-[#AEC289] hover:bg-[#8EA269]"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}