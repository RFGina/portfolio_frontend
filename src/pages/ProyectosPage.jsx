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
      videoRef.current.load();
      videoRef.current.play().catch(e => {
        console.log("Auto-play prevenido por el navegador:", e);
      });
    }
  }, [current]);

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
            className="mt-4 mx-auto rounded-lg shadow-lg w-full max-w-md object-contain"
            onError={(e) => {
              console.error(`Error cargando imagen: ${fileUrl}`);
              e.target.style.display = 'none';
            }}
          />
        );
      } else if (['mp4', 'webm', 'ogg', 'mov'].includes(extension)) {
        return (
          <video
            ref={videoRef}
            key={current}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="mt-4 mx-auto rounded-lg shadow-lg w-full max-w-md"
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
      className={`min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 flex flex-col items-center transition-all duration-500 ${
        theme === "dark"
          ? "bg-black text-gray-200"
          : "bg-[#F4F2EF] text-[#5A3E36]"
      }`}
    >
      {/* Título */}
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider sm:tracking-widest mb-6 sm:mb-8 md:mb-10 transition-all duration-500 text-center ${
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
          className={`p-4 sm:p-6 md:p-8 rounded-xl border transition-all duration-500 text-center mx-2 ${
            theme === "dark"
              ? "border-[#9A53D0] bg-gradient-to-br from-[#2843AD] to-[#818DE0] shadow-[0_0_15px_#F394F8]"
              : "border-[#F4DBDB] bg-white shadow-lg"
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold transition-colors duration-500 mb-3 sm:mb-4 ${
              theme === "dark"
                ? "text-[#F394F8] drop-shadow-[0_0_4px_#F394F8]"
                : "text-[#CD4662]"
            }`}
          >
            {currentProyecto.title}
          </h2>
          
          {/* Descripción */}
          {currentProyecto.description && (
            <p className={`my-3 sm:my-4 text-sm sm:text-base ${theme === "dark" ? "text-gray-300" : "text-[#5A3E36]"}`}>
              {currentProyecto.description}
            </p>
          )}
          
          {/* Enlace */}
          {currentProyecto.link && (
            <a 
              href={currentProyecto.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block my-3 px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                theme === "dark" 
                  ? "bg-[#9A53D0] hover:bg-[#7A33B0]" 
                  : "bg-[#CD4662] hover:bg-[#AD2642] text-white"
              }`}
            >
              Ver proyecto en línea
            </a>
          )}

          {/* Media */}
          {renderMedia(currentProyecto)}
        </div>

        {/* Botones de navegación - Mejorados para móvil */}
        <button 
          onClick={prevSlide} 
          className={`absolute top-1/2 -left-3 sm:-left-4 md:-left-12 transform -translate-y-1/2 p-2 rounded-full transition-all z-10 ${
            theme === "dark" 
              ? "bg-[#2843AD] hover:bg-[#3843DD] text-[#F394F8]" 
              : "bg-[#CD4662] hover:bg-[#AD2642] text-white"
          }`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={nextSlide} 
          className={`absolute top-1/2 -right-3 sm:-right-4 md:-right-12 transform -translate-y-1/2 p-2 rounded-full transition-all z-10 ${
            theme === "dark" 
              ? "bg-[#2843AD] hover:bg-[#3843DD] text-[#F394F8]" 
              : "bg-[#CD4662] hover:bg-[#AD2642] text-white"
          }`}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex gap-2 mt-4 sm:mt-6 flex-wrap justify-center">
        {proyectos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${
              i === current
                ? theme === "dark"
                  ? "bg-[#F394F8] shadow-[0_0_8px_#F394F8]"
                  : "bg-[#CD4662] shadow-[0_0_6px_#CD4662]"
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