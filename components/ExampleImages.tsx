
import React from 'react';
import type { ExampleImage } from '../types';

interface ExampleImagesProps {
  examples: ExampleImage[];
  onSelect: (url: string) => void;
}

export const ExampleImages: React.FC<ExampleImagesProps> = ({ examples, onSelect }) => {
  return (
    <div className="mb-8">
        <h3 className="text-center text-lg font-medium text-gray-600 mb-4">Or try with an example:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {examples.map((example) => (
            <div
            key={example.id}
            onClick={() => onSelect(example.url)}
            className="group cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 hover:shadow-lg transition-all duration-300"
            >
            <img 
                src={example.url} 
                alt={example.alt} 
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                crossOrigin="anonymous"
            />
            <p className="text-sm text-center bg-gray-100 p-2 text-gray-700 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">{example.alt}</p>
            </div>
        ))}
        </div>
    </div>
  );
};
