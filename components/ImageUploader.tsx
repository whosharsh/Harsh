
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  imagePreview: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imagePreview, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  }, [onImageSelect]);


  if (imagePreview) {
    return (
      <div className="w-full text-center">
        <div className="relative inline-block">
          <img src={imagePreview} alt="Selected leaf" className="max-w-full max-h-80 rounded-lg shadow-lg" />
          <button 
            onClick={onClear}
            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            &times;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter} // Use the same handler
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex justify-center w-full h-64 px-4 transition bg-white border-2 ${isDragging ? 'border-green-400' : 'border-gray-300'} border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none`}
      >
        <span className="flex flex-col items-center justify-center space-y-2">
          <UploadIcon className="w-12 h-12 text-gray-400" />
          <span className="font-medium text-gray-600">
            <span className="text-green-600 underline">Click to upload</span> or drag and drop
          </span>
          <span className="text-sm text-gray-500">
            PNG, JPG, or WEBP
          </span>
        </span>
        <input
          type="file"
          name="file_upload"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
