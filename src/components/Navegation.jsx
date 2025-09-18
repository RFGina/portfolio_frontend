import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

export function Navegation() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative">
      <div className={`flex justify-between items-center py-4 px-4 md:py-5 md:px-8 transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-black border-b border-[#9A53D0] shadow-[0_0_15px_#9A53D080]' 
          : 'bg-[#F4F2EF] border-b border-[#F4DBDB] shadow-sm'
      }`}>
        
        {/* Logo */}
        <Link to="/" className="z-20">
          <h1 className={`font-sweet transition-all duration-500 transform hover:scale-105 ${
            theme === 'dark' 
              ? 'text-3xl md:text-4xl text-[#F394F8] drop-shadow-[0_0_10px_#F394F8]' 
              : 'text-3xl md:text-5xl text-[#CD4662]'
          }`}>
            Gina
          </h1>
        </Link>

        {/* Botón de menú móvil */}
        <button 
          className="md:hidden z-20 p-2 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? 
            <FaTimes className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-[#CD4662]'}`} /> : 
            <FaBars className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-[#CD4662]'}`} />
          }
        </button>

        {/* Menú para desktop */}
        <div className="hidden md:flex gap-5 items-center">
          <DesktopLinks theme={theme} />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Menú móvil */}
        <div className={`fixed md:hidden top-16 right-0 w-64 h-[calc(100%-4rem)] z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-black bg-opacity-95' : 'bg-white bg-opacity-95'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <MobileLinks theme={theme} setMenuOpen={setMenuOpen} />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
        </div>

      
      {/* Estilos para la fuente */}
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

// Componente para los enlaces de desktop
function DesktopLinks({ theme }) {
  return (
    <>
      <Link
        to="/projects"
        className={`relative px-4 py-2 md:px-5 md:py-3 text-sm font-medium rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:text-[#97E3FE] hover:border-[#F394F8] hover:shadow-[0_0_15px_#F394F8]'
            : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289] hover:shadow-lg hover:border-[#AEC289]'
        }`}
      >
        Proyectos
      </Link>

      <Link
        to="/skills"
        className={`relative px-4 py-2 md:px-5 md:py-3 text-sm font-medium rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:text-[#F394F8] hover:border-[#97E3FE] hover:shadow-[0_0_15px_#97E3FE]'
            : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289] hover:shadow-lg hover:border-[#AEC289]'
        }`}
      >
        Tecnologías
      </Link>

      <ContactMenu theme={theme} />
    </>
  );
}

// Componente para los enlaces móviles
function MobileLinks({ theme, setMenuOpen }) {
  return (
    <>
      <Link
        to="/projects"
        className={`text-lg font-medium py-3 px-6 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'text-gray-200 hover:text-[#97E3FE]'
            : 'text-[#CD4662] hover:text-[#AEC289]'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        Proyectos
      </Link>

      <Link
        to="/skills"
        className={`text-lg font-medium py-3 px-6 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'text-gray-200 hover:text-[#F394F8]'
            : 'text-[#CD4662] hover:text-[#AEC289]'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        Tecnologías
      </Link>

      <div className="flex space-x-6 mt-4">
        <a href="https://github.com/RFGina" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-2xl p-3 rounded-full ${
          theme === 'dark'
            ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
            : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
        }`}>
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/georgina-rotela" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-2xl p-3 rounded-full ${
          theme === 'dark'
            ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
            : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
        }`}>
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/ginaa_xd7" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-2xl p-3 rounded-full ${
          theme === 'dark'
            ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
            : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
        }`}>
          <FaInstagram />
        </a>
      </div>
    </>
  );
}

// Componente para el menú de contacto
function ContactMenu({ theme }) {
  return (
    <div className="relative group">
      <button
        className={`relative px-4 py-2 md:px-5 md:py-3 text-sm font-medium rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 hover:text-[#9A53D0] hover:border-[#9A53D0] hover:shadow-[0_0_15px_#9A53D0]'
            : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289] hover:shadow-lg hover:border-[#AEC289]'
        }`}
      >
        Contacto
      </button>

      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-50 flex justify-around p-4 ${
        theme === 'dark'
          ? 'bg-black border border-[#9A53D0] shadow-[0_0_15px_#F394F8]'
          : 'bg-white border border-[#F4DBDB] shadow-xl'
      }`}>
        <a href="https://github.com/FRGina" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
          theme === 'dark'
            ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
            : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
        }`}>
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/georgina-rptela" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
          theme === 'dark'
            ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
            : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
        }`}>
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/ginaa_xd7" target="_blank" rel="noopener noreferrer" className={`transition-all duration-300 text-xl p-2 rounded-full ${
          theme === 'dark'
            ? 'text-[#97E3FE] hover:text-[#F394F8] hover:bg-gray-800'
            : 'text-[#CD4662] hover:text-[#AEC289] hover:bg-[#F4DBDB]'
        }`}>
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

// Componente para el toggle del tema
function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-300 ${
        theme === 'dark'
          ? 'text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-[#9A53D0]'
          : 'text-[#CD4662] bg-white border border-[#F4DBDB] hover:bg-[#F4DBDB] hover:text-[#AEC289]'
      }`}
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
    </button>
  );
}