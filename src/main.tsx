import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react';

// Función para mostrar errores de carga de módulos
function showModuleError(error: Error) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; text-align: center;">
        <h1 style="color: #e53e3e;">Error de carga de módulos</h1>
        <div style="background-color: #f8f8f8; border: 1px solid #ddd; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: left;">
          <p><strong>Error:</strong> ${error.message}</p>
          <p><strong>Tipo:</strong> ${error.name}</p>
          <p><strong>Stack:</strong> ${error.stack || 'No disponible'}</p>
        </div>
        <p>Este error puede estar relacionado con problemas de MIME type en el servidor.</p>
        <p>Por favor, contacta al administrador del sitio.</p>
        <button onclick="window.location.reload()" style="background-color: #4299e1; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
          Intentar de nuevo
        </button>
      </div>
    `;
  }
}

// Función para verificar si hay problemas de MIME type
function checkMimeTypeIssues() {
  const scripts = document.querySelectorAll('script[type="module"]');
  let hasMimeTypeIssue = false;
  
  scripts.forEach(script => {
    const scriptElement = script as HTMLScriptElement;
    if (scriptElement.src) {
      console.log(`Verificando script: ${scriptElement.src}`);
      // Intentar cargar el script para verificar si hay problemas de MIME type
      fetch(scriptElement.src)
        .then(response => {
          console.log(`Respuesta para ${scriptElement.src}:`, response.headers.get('content-type'));
          if (response.headers.get('content-type') !== 'application/javascript' && 
              response.headers.get('content-type') !== 'text/javascript') {
            console.error(`Problema de MIME type detectado para ${scriptElement.src}: ${response.headers.get('content-type')}`);
            hasMimeTypeIssue = true;
          }
        })
        .catch(error => {
          console.error(`Error al verificar ${scriptElement.src}:`, error);
          hasMimeTypeIssue = true;
        });
    }
  });
  
  return hasMimeTypeIssue;
}

// ErrorBoundary global para capturar errores de React
class ErrorBoundary extends React.Component<any, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary atrapó un error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: 24 }}>
          <h2>Se ha producido un error en la aplicación:</h2>
          <pre>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Función principal para inicializar la aplicación
function initApp() {
  try {
    console.log('Iniciando aplicación...');
    // Verificar problemas de MIME type
    const mimeTypeIssues = checkMimeTypeIssues();
    if (mimeTypeIssues) {
      console.error('Se detectaron problemas de MIME type', mimeTypeIssues);
      showModuleError(new Error('Problemas de MIME type detectados. Por favor, contacta al administrador.'));
      return;
    }
    // Intentar renderizar la aplicación
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('No se encontró el elemento root');
      throw new Error('No se encontró el elemento root');
    }
    console.log('Elemento root encontrado:', rootElement);
    const root = createRoot(rootElement);
    console.log('Creando root de React...');
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    console.log('Aplicación renderizada correctamente');
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
    showModuleError(error instanceof Error ? error : new Error(String(error)));
  }
}

// Iniciar la aplicación
initApp();
