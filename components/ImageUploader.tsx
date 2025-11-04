
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
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-xl shadow-2xl shadow-[#9ebf4f]/10 dark:shadow-[#9ebf4f]/5 border border-[#dce8b9]/50 dark:border-gray-700 text-center transition-all duration-300 animate-fade-in hover:shadow-lg hover:-translate-y-1">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
          isDragActive 
            ? 'border-[#9ebf4f] dark:border-lime-400 bg-[#f7f9ed]/50 dark:bg-gray-700/50 scale-[1.02] shadow-lg animate-pulse-drag' 
            : 'border-[#b9cc85] dark:border-gray-600 hover:border-[#9ebf4f] dark:hover:border-lime-400 hover:scale-[1.02] hover:shadow-lg'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <UploadIcon className="w-12 h-12 text-[#80a040] dark:text-lime-400" />
          {isDragActive ? (
            <p className="mt-4 text-lg font-semibold text-[#648232] dark:text-lime-300">Drop the image here...</p>
          ) : (
            <>
              <p className="mt-4 text-lg font-semibold text-[#4d6426] dark:text-gray-100">Drag & drop a leaf photo</p>
              <p className="text-[#648232] dark:text-gray-400">or click to select a file</p>
            </>
          )}
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
};