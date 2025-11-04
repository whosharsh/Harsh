
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';
import { LoginPage } from './pages/LoginPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { Footer } from './components/Footer';
import type { AnalysisResult, HistoryItem } from './types';
import { getHistory, saveHistory, clearHistory as clearHistoryStorage } from './utils/historyStorage';
import { getLoggedInUser, loginUser, logoutUser } from './utils/auth';

export type Page = 'home' | 'about' | 'help' | 'history' | 'settings';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getLoggedInUser());
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisContext, setAnalysisContext] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
        setHistory(getHistory());
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    loginUser();
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setAnalysisContext(null); 
  };
  
  const handleAnalysisComplete = useCallback((result: AnalysisResult, imageSrc: string) => {
    setAnalysisContext(result);
    
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      result,
      imageSrc,
    };

    setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory];
        saveHistory(updatedHistory);
        return updatedHistory;
    });

  }, []);
  
  const handleStartOver = useCallback(() => {
    setAnalysisContext(null);
  }, []);

  const handleClearHistory = () => {
    clearHistoryStorage();
    setHistory([]);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'help':
        return <HelpPage />;
      case 'history':
        return <HistoryPage history={history} onClearHistory={handleClearHistory} />;
      case 'settings':
        return <SettingsPage onLogout={handleLogout} onClearHistory={handleClearHistory} onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage onAnalysisComplete={handleAnalysisComplete} onStartOver={handleStartOver} analysisContext={analysisContext} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
