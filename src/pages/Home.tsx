import React from 'react';
import { useUsuarioPrismic } from '../hooks/useUsuarioPrismic';

function formateaFecha(fechaISO: string) {
  if (!fechaISO) return '';
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();
  return `${dia} de ${mes} de ${anio}`;
}

const Home = () => {
  const { usuario, loading, error } = useUsuarioPrismic();

  if (loading) return <div className="h-screen flex items-center justify-center">Cargando...</div>;
  if (error || !usuario) return <div className="h-screen flex items-center justify-center text-red-500">Error al cargar datos</div>;

  return (
    <div className="h-screen flex flex-col items-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6">
          <img
            src={usuario.imagen}
            alt={`${usuario.nombre_uno} & ${usuario.nombre_dos}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-logo mb-2">{usuario.nombre_uno} & {usuario.nombre_dos}</h1>
            <p className="text-lg">{formateaFecha(usuario.fecha)}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl text-gray-700">Bienvenidos a la aplicación de nuestra boda.</p>
          <p className="text-gray-600 mt-2">
            Usa el menú arriba a la izquierda para navegar entre las diferentes secciones. Esperamos que paséis un día estupendo y te agradecemos tu presencia en este día tan especial para nosotros.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;