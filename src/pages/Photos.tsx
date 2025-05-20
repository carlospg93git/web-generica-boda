import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import DropZone from '../components/DropZone';

const Photos = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Nueva función para interceptar selección o drop
  const handleFiles = () => {
    setModalOpen(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Camera className="text-nature-600 w-8 h-8" />
        <h1 className="text-2xl font-display font-bold ml-2">Fotos y vídeos</h1>
      </div>
      <div className="space-y-6">
        <DropZone
          fileInputRef={fileInputRef}
          dropZoneRef={dropZoneRef}
          uploading={false}
          handleFiles={handleFiles}
          setError={() => {}}
          setSuccess={() => {}}
        />
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">La subida de archivos no está permitida en este prototipo</h2>
              <p className="mb-4 text-gray-700">
                Si quieres probar esta funcionalidad escríbenos en{' '}
                <a
                  href="https://orsoie.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nature-600 underline hover:text-nature-800"
                >
                  orsoie
                </a>.
              </p>
              <button
                className="mt-2 px-4 py-2 bg-nature-600 text-white rounded hover:bg-nature-700"
                onClick={() => setModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;