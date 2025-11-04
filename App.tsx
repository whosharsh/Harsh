import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';
import { LoginPage } from './pages/LoginPage';
import { HistoryPage } from './pages/HistoryPage';
import { Footer } from './components/Footer';
import type { AnalysisResult, HistoryItem } from './types';
import { getHistory, saveHistory, clearHistory as clearHistoryStorage } from './utils/historyStorage';

export type Page = 'home' | 'about' | 'help' | 'history';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisContext, setAnalysisContext] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
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