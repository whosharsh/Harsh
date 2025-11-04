
import React, { useState } from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { useTheme } from '../contexts/ThemeContext';
import type { Page } from '../App';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkClasses = (page: Page, isMobile: boolean = false) => {
    const baseClasses = isMobile 
      ? 'block px-3 py-2 rounded-md text-base font-medium flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium flex items-center';
    
    return `${baseClasses} transition-colors ${
      currentPage === page 
      ? 'bg-[#648232] dark:bg-[#9ebf4f] text-white dark:text-[#36451b]' 
      : 'text-lime-200 dark:text-gray-300 hover:bg-[#4d6426] dark:hover:bg-gray-700 hover:text-white dark:hover:text-white'
    }`;
  };

  const handleNavClick = (page: Page) => {
      onNavigate(page);
      setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className="bg-[#36451b] dark:bg-gray-900 shadow-md sticky top-0 z-20 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <LeafIcon className="h-8 w-8 text-[#9ebf4f]" />
            <h1 className="ml-3 text-xl font-bold text-white tracking-tight hidden sm:block">
              Plant AI
            </h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={navLinkClasses('home')}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={navLinkClasses('about')}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('help'); }} className={navLinkClasses('help')}>Help</a>
          </nav>
          <div className="flex items-center">
             <button
                onClick={() => handleNavClick('settings')}
                className="p-2 rounded-full text-lime-200 dark:text-gray-300 hover:bg-[#4d6426] dark:hover:bg-gray-700 hover:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#36451b] dark:focus:ring-offset-gray-900 focus:ring-white transition-colors"
                aria-label="Open settings"
            >
                <SettingsIcon className="h-5 w-5" />
            </button>
             <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full text-lime-200 dark:text-gray-300 hover:bg-[#4d6426] dark:hover:bg-gray-700 hover:text-white dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#36451b] dark:focus:ring-offset-gray-900 focus:ring-white transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
            <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#80a040] dark:bg-[#9ebf4f] dark:text-[#36451b] rounded-md hover:bg-[#648232] dark:hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#36451b] dark:focus:ring-offset-gray-900 focus:ring-white transition-colors"
            >
                Logout
            </button>
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-lime-200 dark:text-gray-300 hover:text-white hover:bg-[#4d6426] dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('settings'); }} className={navLinkClasses('settings', true)}>
                <SettingsIcon className="w-5 h-5 mr-3" />
                Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
