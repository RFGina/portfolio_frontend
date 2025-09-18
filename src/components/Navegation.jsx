import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

export function Navegation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="relative">
      <div className={`flex justify-between items-center py-5 px-8 transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-black border-b border-[#9A53D0] shadow-[0_0_15px_#9A53D080]' 
          : 'bg-[#F4F2EF] border-b border-[#F4DBDB] shadow-sm'
      }`}>
        
        {/* Logo con estilo tierno y hogareño */}
        <Link to="/">
          <h1 className={`font-sweet transition-all duration-500 transform hover:scale-105 ${
            theme === 'dark' 
              ? 'text-4xl text-[#F394F8] drop-shadow-[0_0_10px_#F394F8]' 
              : 'text-5xl text-[#CD4662]'
          }`}>
            Gina
          </h1>
        </Link>

        {/* Links */}
        <div className="flex gap-5 items-center">
          <Link
            to="/projects"
            className={`relative px-5 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:text-[#97E3FE] hover:border-[#F394F8] hover:shadow-[0_0_15px_#F394F8]'
                : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289] hover:shadow-lg hover:border-[#AEC289]'
            }`}
          >
            Proyectos
          </Link>

          <Link
            to="/skills"
            className={`relative px-5 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:text-[#F394F8] hover:border-[#97E3FE] hover:shadow-[0_0_15px_#97E3FE]'
                : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289] hover:shadow-lg hover:border-[#AEC289]'
            }`}
          >
            Tecnologías
          </Link>

          {/* Contacto con submenu */}
          <div className="relative group">
            <button
              className={`relative px-5 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:text-[#9A53D0] hover:border-[#9A53D0] hover:shadow-[0_0_15px_#9A53D0]'
                  : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289] hover:shadow-lg hover:border-[#AEC289]'
              }`}
            >
              Contacto
            </button>

            {/* Submenu con logos - estilo hogareño */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-50 flex justify-around p-4 ${
              theme === 'dark'
                ? 'bg-black border border-[#9A53D0] shadow-[0_0_15px_#F394F8]'
                : 'bg-white border border-[#F4DBDB] shadow-xl'
            }`}>
              <a href="https://github.com/tuUsuario" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
                theme === 'dark'
                  ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
                  : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
              }`}>
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/tuUsuario" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
                theme === 'dark'
                  ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
                  : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
              }`}>
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/tuUsuario" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
                theme === 'dark'
                  ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
                  : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
              }`}>
                <FaTwitter />
              </a>
              <a href="https://instagram.com/tuUsuario" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
                theme === 'dark'
                  ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
                  : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
              }`}>
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Botón para cambiar tema - estilo hogareño */}
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-[#9A53D0]'
                : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289]'
            }`}
          >
            {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          </button>
        </div>
      </div>
      
      {/* Estilos para la fuente tierna y dulce */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Cedarville+Cursive&family=Parisienne&display=swap');
          .font-sweet {
            font-family: 'Parisienne', cursive;
            font-weight: 400;
            font-style: normal;
          }
        `}
      </style>
    </nav>
  );
}