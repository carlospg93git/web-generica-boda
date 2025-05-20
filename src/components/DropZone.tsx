import React from 'react';
import { Upload } from 'lucide-react';

type DropZoneProps = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  dropZoneRef: React.RefObject<HTMLDivElement>;
  uploading: boolean;
  handleFiles: () => void;
  setError: (msg: string | null) => void;
  setSuccess: (val: boolean) => void;
};

const DropZone: React.FC<DropZoneProps> = ({
  fileInputRef,
  dropZoneRef,
  uploading,
  handleFiles,
  setError,
  setSuccess
}: DropZoneProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('bg-nature-50');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('bg-nature-50');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('bg-nature-50');
    }
    // Prevenir la subida y mostrar el modal
    handleFiles();
    // Limpiar el input si existe
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Prevenir la subida y mostrar el modal
    handleFiles();
    // Limpiar el input
    event.target.value = '';
  };

  return (
    <div
      ref={dropZoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="bg-white p-8 rounded-lg shadow-lg text-center transition-colors duration-200"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*,video/*"
        className="hidden"
        multiple
        onClick={(e) => {
          // Prevenir la apertura del diálogo de archivos
          e.preventDefault();
          handleFiles();
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFiles();
        }}
        disabled={uploading}
        className="w-full min-h-[200px] border-2 border-dashed border-nature-300 rounded-lg p-8 flex flex-col items-center justify-center space-y-4 hover:border-nature-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Upload size={48} className="text-nature-600" />
        <div className="text-center">
          <p className="text-lg font-semibold text-nature-600 mb-2">
            {uploading ? 'Subiendo archivos...' : 'Arrastra tus fotos y vídeos aquí'}
          </p>
          <p className="text-sm text-gray-500">
            o haz clic para seleccionar archivos
          </p>
        </div>
      </button>
    </div>
  );
};

export default DropZone; 