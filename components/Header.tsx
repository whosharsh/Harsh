
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <LeafIcon className="h-8 w-8 text-green-600" />
        <h1 className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">
          Plant Disease Detection
        </h1>
      </div>
    </header>
  );
};
