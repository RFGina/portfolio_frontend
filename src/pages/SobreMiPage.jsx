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

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-8 py-12 gap-4 transition-all duration-500
      ${isDark ? "bg-black text-gray-200" : "bg-[#F4F2EF] text-[#5A3E36]"}`}
    >
      {/* Título */}
      <h2
        className={`text-5xl font-extrabold tracking-wider mb-2 transition-all duration-500
        ${isDark
          ? "text-[#97E3FE] drop-shadow-[0_0_8px_#97E3FE] hover:text-[#F394F8]"
          : "text-[#CD4662] hover:text-[#AEC289]"}`}
      >
        Gina Rotela
      </h2>

      {/* Imagen + Texto */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl w-full">
        
        {/* Imagen */}
        <div
          className={`w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 transition-all duration-500
          ${bounce ? "translate-y-4" : "-translate-y-4"}
          ${isDark
            ? "border-[#97E3FE] shadow-[0_0_8px_#97E3FE] hover:border-[#F394F8]"
            : "border-[#AEC289] shadow-[0_0_8px_#AEC289] hover:border-[#CD4662]"}`}
        >
          <img
            src={isDark ? fondoDark : fondoLigth}
            alt="Sobre mí"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto */}
        <div
          className={`flex-1 max-w-xl text-center lg:text-left space-y-4 transition-colors duration-500
          ${isDark ? "text-gray-300" : "text-[#5A3E36]"}`}
        >
          <p className="text-lg font-semibold">¡Hola! Soy Georgina, me puedes llamar Gina.</p>

          <p className="text-lg leading-relaxed">
            Soy{" "}
            <span
              className={`font-bold tracking-wide inline-block transition-all duration-500
              ${isDark ? "glitch text-[#97E3FE]" : "text-[#CD4662] font-serif italic drop-shadow-sm"}`}
            >
              Técnico Superior en Análisis de Sistemas
            </span>{" "}
            y me gusta el{" "}
            <span
              className={`font-bold tracking-wide inline-block transition-all duration-500
              ${isDark ? "glitch text-[#97E3FE]" : "text-[#CD4662] font-serif italic drop-shadow-sm"}`}
            >
              Desarrollo web
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
