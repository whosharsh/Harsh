import React, { useState } from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { useI18n } from '../contexts/I18nContext';
import type { Page } from '../App';
import { GrowingPlantAnimation } from './icons/GrowingPlantAnimation';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimatingLogo, setIsAnimatingLogo] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const navLinkClasses = (page: Page, isMobile: boolean = false) => {
    const baseClasses = isMobile 
      ? 'block px-3 py-2 rounded-md text-base font-medium flex items-center'
      : 'px-3 py-2 rounded-md text-sm font-medium flex items-center';
    
    return `${baseClasses} transition-colors ${
      currentPage === page 
      ? 'bg-[#648232] text-white' 
      : 'text-lime-200 hover:bg-[#4d6426] hover:text-white'
    }`;
  };

  const handleNavClick = (page: Page) => {
      onNavigate(page);
      setIsMenuOpen(false); // Close menu on navigation
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimatingLogo) return; // Prevent re-triggering while animating
    setIsAnimatingLogo(true);
    setTimeout(() => {
        setIsAnimatingLogo(false);
        handleNavClick('home'); 
    }, 3500); // Animation duration
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="bg-[#36451b] shadow-md sticky top-0 z-20 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={handleLogoClick} className="cursor-pointer">
              {isAnimatingLogo ? (
                <GrowingPlantAnimation className="h-8 w-8 text-[#9ebf4f]" />
              ) : (
                <LeafIcon className="h-8 w-8 text-[#9ebf4f]" />
              )}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
              <h1 className="ml-3 text-xl font-bold text-white tracking-tight hidden sm:block">
                {t('appTitle')}
              </h1>
            </a>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={navLinkClasses('home')}>{t('navHome')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={navLinkClasses('about')}>{t('navAbout')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('help'); }} className={navLinkClasses('help')}>{t('navHelp')}</a>
          </nav>
          <div className="flex items-center">
             <button
                onClick={toggleLanguage}
                className="p-2 rounded-full text-lime-200 hover:bg-[#4d6426] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#36451b] focus:ring-white transition-colors font-semibold text-sm"
                aria-label="Toggle language"
             >
                {language === 'en' ? 'HI' : 'EN'}
             </button>
             <button
                onClick={() => handleNavClick('settings')}
                className="ml-1 p-2 rounded-full text-lime-200 hover:bg-[#4d6426] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#36451b] focus:ring-white transition-colors"
                aria-label="Open settings"
            >
                <SettingsIcon className="h-5 w-5" />
            </button>
            <button
                onClick={onLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#80a040] rounded-md hover:bg-[#648232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#36451b] focus:ring-white transition-colors"
            >
                {t('logoutButton')}
            </button>
            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-lime-200 hover:text-white hover:bg-[#4d6426] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={navLinkClasses('home', true)}>{t('navHome')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={navLinkClasses('about', true)}>{t('navAbout')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('help'); }} className={navLinkClasses('help', true)}>{t('navHelp')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('settings'); }} className={navLinkClasses('settings', true)}>
                <SettingsIcon className="w-5 h-5 mr-3" />
                {t('navSettings')}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};