import { useState, useEffect } from 'react';

// Variable global para compartir el estado entre componentes
let globalTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark';
let listeners = [];

export function useTheme() {
  const [theme, setTheme] = useState(globalTheme);

  useEffect(() => {
    // Agregar este componente a los listeners
    listeners.push(setTheme);
    
    // Limpiar al desmontar
    return () => {
      listeners = listeners.filter(listener => listener !== setTheme);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = globalTheme === 'light' ? 'dark' : 'light';
    globalTheme = newTheme;
    
    // Actualizar todos los componentes suscritos
    listeners.forEach(listener => listener(newTheme));
    
    // Persistir en localStorage y actualizar HTML
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        if (newTheme === 'dark') {
          htmlElement.classList.add('dark');
        } else {
          htmlElement.classList.remove('dark');
        }
      }
    }
  };

  return { theme, toggleTheme };
}