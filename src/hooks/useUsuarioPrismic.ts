import { useEffect, useState } from 'react';
import * as prismic from '@prismicio/client';

const REPO_NAME = 'invitaciondigital';
const API_ENDPOINT = `https://${REPO_NAME}.cdn.prismic.io/api/v2`;

export interface UsuarioPrismic {
  imagen: string;
  nombre_uno: string;
  nombre_dos: string;
  fecha: string;
}

export function useUsuarioPrismic() {
  const [usuario, setUsuario] = useState<UsuarioPrismic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const client = prismic.createClient(API_ENDPOINT, {
          accessToken: import.meta.env.VITE_PRISMIC_ACCESS_TOKEN,
        });
        // Suponemos que solo hay un documento de tipo 'usuario'
        const response = await client.getSingle('usuario');
        setUsuario({
          imagen: response.data.imagen.url,
          nombre_uno: response.data.nombre_uno,
          nombre_dos: response.data.nombre_dos,
          fecha: response.data.fecha,
        });
      } catch (err: any) {
        setError(err.message || 'Error al cargar datos de Prismic');
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, []);

  return { usuario, loading, error };
} 