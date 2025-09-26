import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import fondoDark from "../assets/img/fondodark2.png";
import fondoLigth from "../assets/img/fondoClaro2.png";

export function SobreMiPage() {
  const [bounce, setBounce] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => setBounce((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col lg:flex-col items-center justify-center px-8 py-12 gap-8 transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-black text-gray-200' 
        : 'bg-[#F4F2EF] text-[#5A3E36]'
    }`}>
      
      {/* Título principal */}
      <h2 className={`text-5xl font-extrabold tracking-wider transition-all duration-500 ${
        theme === 'dark'
          ? 'text-[#97E3FE] drop-shadow-[0_0_8px_#97E3FE] hover:text-[#F394F8]'
          : 'text-[#CD4662] hover:text-[#AEC289]'
      }`}>
        Gina Rotela
      </h2>

      {/* Contenedor de imagen y texto */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-5xl w-full">
        
        {/* Imagen circular con glow según tema */}
        <div
          className={`w-64 h-64 lg:w-80 lg:h-80 aspect-square rounded-full overflow-hidden border-4 transition-all duration-500
                      ${bounce ? "translate-y-4" : "-translate-y-4"} ${
            theme === 'dark'
              ? 'border-[#97E3FE] shadow-[0_0_8px_#97E3FE] hover:border-[#F394F8]'
              : 'border-[#AEC289] shadow-[0_0_8px_#AEC289] hover:border-[#CD4662]'
          }`}
        >
          <img
            src={theme === 'dark' ? fondoDark : fondoLigth}
            alt="Sobre mí"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto */}
        <div className="flex-1 max-w-xl">
          <p className={`text-lg leading-relaxed text-center lg:text-left transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-300' : 'text-[#5A3E36]'
          }`}>
            Técnico Analista en Sistemas Informáticos y desarrolladora web
          </p>
          
          <div className={`mt-6 space-y-4 text-center lg:text-left transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-300' : 'text-[#5A3E36]'
          }`}>
            
            <p className="text-lg font-semibold">
              ¡Hola! Soy Gina Rotela, tengo 24 años y soy de Misiones, Argentina.
            </p>
            
            <p>
              <strong>Formación académica:</strong> Me gradué como <strong>Técnico Analista en Sistemas Informáticos</strong> en el 
              <strong> CEP N°62 de Santo Pipó</strong>, donde adquirí una sólida base en desarrollo de software y análisis de sistemas.
            </p>
            
            <p>
              <strong>Cursos y capacitaciones:</strong> Complementé mi formación con el programa <strong>Argentina Programa 4.0</strong>, 
              donde profundicé mis conocimientos en desarrollo web full stack, y continúo capacitándome en nuevas tecnologías.
            </p>
            
            <p>
              <strong>Mi pasión:</strong> Me apasiona crear soluciones innovadoras que combinen funcionalidad y diseño, 
              siempre buscando aprender y enfrentar nuevos desafíos en el mundo de la tecnología.
            </p>
            
            <p className={`italic ${theme === 'dark' ? 'text-gray-400' : 'text-[#8B7D6B]'}`}>
              Actualmente busco oportunidades para seguir creciendo profesionalmente y contribuir con mis habilidades 
              en proyectos desafiantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}