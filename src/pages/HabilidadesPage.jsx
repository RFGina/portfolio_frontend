import React, { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { getAllSkill } from '../api/portfolio.api'; 

export function HabilidadesPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Cargar habilidades desde la API
  useEffect(() => {
    async function loadSkills() {
      try {
        const response = await getAllSkill();
        setSkills(response.data);
      } catch (error) {
        console.error("Error cargando habilidades:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadSkills();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        theme === 'dark' ? 'bg-black' : 'bg-[#F4F2EF]'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 border-[#97E3FE]"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-[#5A3E36]'}>
            Cargando habilidades...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-8 py-12 transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-black text-gray-200' 
        : 'bg-[#F4F2EF] text-[#5A3E36]'
    }`}>
      
      {/* Título con estilo según el tema */}
      <h1
          className={`text-3xl font-bold mb-8 tracking-wide transition-all duration-500 text-center ${
            theme === 'dark' 
              ? 'glitch text-[#97E3FE]' 
              : 'text-[#CD4662] font-serif italic drop-shadow-sm'
          }`}
          {...(theme === 'dark' && { 'data-text': "HABILIDADES" })}
        >

        HABILIDADES
        {theme === 'light' && (
          <div className="w-20 h-1 bg-[#AEC289] mt-2 rounded-full mx-auto"></div>
        )}
      </h1>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, i) => (
          <div
            key={skill.id || i}
            className={`relative group p-6 rounded-2xl border transition-all duration-500 ${
              theme === 'dark'
                ? 'border-[#9A53D0] bg-gradient-to-br from-[#2843AD] to-[#818DE0] shadow-[0_0_25px_#F394F8] hover:border-[#F394F8]'
                : 'border-[#F4DBDB] bg-white shadow-lg hover:shadow-xl hover:border-[#AEC289] hover:transform hover:scale-105'
            }`}
          >
            {/* Efecto de fondo según el tema */}
            {theme === 'dark' ? (
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15
                              bg-gradient-to-r from-[#97E3FE] via-[#F394F8] to-[#F7ED97] blur-2xl 
                              transition duration-700"></div>
            ) : (
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500
                              bg-gradient-to-br from-[#F4DBDB20] to-[#AEC28920]"></div>
            )}

            {/* Decoración floral para modo claro */}
            {theme === 'light' && (
              <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#CD4662">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            )}

            {/* Contenido */}
            <div className="relative z-10">
              <h2 className={`text-xl font-bold transition-colors duration-300 ${
                theme === 'dark'
                  ? 'text-gray-100 group-hover:text-[#97E3FE]'
                  : 'text-[#CD4662] group-hover:text-[#AEC289]'
              }`}>
                {skill.title}
              </h2>
              
              {/* Mostrar el nivel si está disponible */}
              {skill.nivel && (
                <p className={`mt-2 text-sm transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-[#8B7D6B] group-hover:text-[#7D6B5A]'
                }`}>
                  {skill.nivel.nivel}
                </p>
              )}
              
              {/* Mostrar descripción si está disponible */}
              {skill.description && (
                <p className={`mt-3 text-sm transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-gray-300'
                    : 'text-[#5A3E36]'
                }`}>
                  {skill.description}
                </p>
              )}
            </div>

            {/* Efecto de brillo suave para modo claro al hover */}
            {theme === 'light' && (
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              bg-gradient-to-br from-[#F4DBDB30] to-transparent"></div>
            )}
          </div>
        ))}
      </div>

      {/* Estilos para el glitch */}
      <style>
        {`
          .glitch {
            position: relative;
            display: inline-block;
          }
          .glitch::before {
            content: attr(data-text);
            position: absolute;
            left: -2px;
            text-shadow: -2px 0 #F394F8;
            clip: rect(0, 900px, 0, 0);
            animation: glitch-animation 2s infinite linear alternate-reverse;
          }
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            left: 2px;
            text-shadow: -2px 0 #97E3FE;
            clip: rect(0, 900px, 0, 0);
            animation: glitch-animation 3s infinite linear alternate-reverse;
          }
          @keyframes glitch-animation {
            0% { clip: rect(30px, 9999px, 30px, 0); }
            20% { clip: rect(60px, 9999px, 65px, 0); }
            40% { clip: rect(40px, 9999px, 60px, 0); }
            60% { clip: rect(70px, 9999px, 60px, 0); }
            80% { clip: rect(50px, 9999px, 70px, 0); }
            100% { clip: rect(60px, 9999px, 60px, 0); }
          }
        `}
      </style>
    </div>
  );
}