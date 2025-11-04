import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    if (rejectedFiles && rejectedFiles.length > 0) {
      setError('Invalid file type. Please upload an image (jpeg, png, webp).');
      return;
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-emerald-200 text-center transition-all duration-300 animate-fade-in hover:shadow-lg hover:-translate-y-1">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
          isDragActive 
            ? 'border-emerald-600 bg-emerald-50 scale-[1.02] shadow-lg animate-pulse-drag' 
            : 'border-emerald-300 hover:border-emerald-500 hover:scale-[1.02] hover:shadow-lg'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <UploadIcon className="w-12 h-12 text-emerald-400" />
          {isDragActive ? (
            <p className="mt-4 text-lg font-semibold text-emerald-600">Drop the image here...</p>
          ) : (
            <>
              <p className="mt-4 text-lg font-semibold text-emerald-800">Drag & drop a leaf photo</p>
              <p className="text-emerald-600">or click to select a file</p>
            </>
          )}
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
};