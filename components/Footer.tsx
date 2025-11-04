import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#36451b] text-[#dce8b9] mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Plant AI. AI for a greener world.</p>
      </div>
    </footer>
  );
};