import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';
import { LoginPage } from './pages/LoginPage';
import { Footer } from './components/Footer';
import type { AnalysisResult } from './types';

export type Page = 'home' | 'about' | 'help';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisContext, setAnalysisContext] = useState<AnalysisResult | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAnalysisContext(null); 
  };
  
  const handleAnalysisComplete = useCallback((result: AnalysisResult) => {
    setAnalysisContext(result);
  }, []);
  
  const handleStartOver = useCallback(() => {
    setAnalysisContext(null);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'help':
        return <HelpPage />;
      case 'home':
      default:
        return <HomePage onAnalysisComplete={handleAnalysisComplete} onStartOver={handleStartOver} analysisContext={analysisContext} />;
    }
  };

  return (
    <div className="min-h-screen bg-lime-50 flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;