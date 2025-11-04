import React, { useState } from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import type { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = (page: Page, isMobile: boolean = false) => {
    const baseClasses = isMobile 
      ? 'block px-3 py-2 rounded-md text-base font-medium flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium flex items-center';
    
    return `${baseClasses} transition-colors ${
      currentPage === page 
      ? 'bg-emerald-700 text-white' 
      : 'text-lime-200 hover:bg-emerald-800 hover:text-white'
    }`;
  };

  const handleNavClick = (page: Page) => {
      onNavigate(page);
      setIsMenuOpen(false); // Close menu on navigation
  };

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
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={navLinkClasses('home')}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={navLinkClasses('about')}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('help'); }} className={navLinkClasses('help')}>Help</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('history'); }} className={navLinkClasses('history')}>
                <HistoryIcon className="w-4 h-4 mr-2" />
                History
            </a>
          </nav>
          <div className="flex items-center">
            <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-900 focus:ring-white"
            >
                Logout
            </button>
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-lime-200 hover:text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <CloseIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={navLinkClasses('home', true)}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={navLinkClasses('about', true)}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('help'); }} className={navLinkClasses('help', true)}>Help</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('history'); }} className={navLinkClasses('history', true)}>
                <HistoryIcon className="w-5 h-5 mr-3" />
                History
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};