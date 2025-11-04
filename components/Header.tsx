import React from 'react';
import { LeafIcon } from './icons/LeafIcon';
import type { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onLogout }) => {
  const navLinkClasses = (page: Page) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPage === page 
      ? 'bg-emerald-700 text-white' 
      : 'text-lime-200 hover:bg-emerald-800 hover:text-white'
    }`;

  return (
    <header className="bg-emerald-900 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LeafIcon className="h-8 w-8 text-lime-400" />
            <h1 className="ml-3 text-xl font-bold text-white tracking-tight hidden sm:block">
              Plant AI
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className={navLinkClasses('home')}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className={navLinkClasses('about')}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} className={navLinkClasses('help')}>Help</a>
          </nav>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 focus:ring-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};