
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

// This component is now designed to be a functional, non-visible dropzone
// that can be triggered programmatically.
export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      // Error handling can be managed by the parent component if needed
      console.error('Invalid file type uploaded.');
      return;
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxFiles: 1,
    multiple: false,
    noClick: true, // Prevents opening file dialog on click
    noKeyboard: true, // Prevents opening file dialog with keyboard
  });

  return (
    <div {...getRootProps()} className="dropzone-container">
      <input {...getInputProps()} className="dropzone-input" />
      {/* No visible content is rendered */}
    </div>
  );
};