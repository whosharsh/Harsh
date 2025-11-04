
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#36451b] text-lime-200 mt-auto transition-colors">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Plant AI. AI for a greener world.</p>
      </div>
    </footer>
  );
};