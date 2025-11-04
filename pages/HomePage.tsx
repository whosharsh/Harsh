
import React, { useState, useCallback, useEffect } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ResultCard } from '../components/ResultCard';
import { Spinner } from '../components/Spinner';
import { Chatbox } from '../components/Chatbox';
import { analyzePlantLeaf } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon';
import { UploadIcon } from '../components/icons/UploadIcon';
import { LightbulbIcon } from '../components/icons/LightbulbIcon';
import { useI18n } from '../contexts/I18nContext';

type AppState = 'welcome' | 'loading' | 'result' | 'error';

interface HomePageProps {
  onAnalysisComplete: (result: AnalysisResult, imageSrc: string) => void;
  onStartOver: () => void;
  analysisContext: AnalysisResult | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onAnalysisComplete, onStartOver, analysisContext }) => {
  const [appState, setAppState] = useState<AppState>(analysisContext ? 'result' : 'welcome');
  const [error, setError] = useState<string | null>(null);
  const [submittedImage, setSubmittedImage] = useState<string | null>(null);
  const [currentFact, setCurrentFact] = useState<string>('');
  const { t } = useI18n();

  const facts = t('didYouKnowFacts') as string[];

  useEffect(() => {
    if (appState === 'welcome' && facts && facts.length > 0) {
      setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
      const interval = setInterval(() => {
        setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
      }, 7000); // Change fact every 7 seconds
      return () => clearInterval(interval);
    }
  }, [appState, facts]);

  const performAnalysis = useCallback(async (imageDataUrl: string) => {
    setAppState('loading');
    setError(null);
    setSubmittedImage(imageDataUrl);

    try {
      const result = await analyzePlantLeaf(imageDataUrl);
      onAnalysisComplete(result, imageDataUrl);
      setAppState('result');
    } catch (err) {
      console.error(err);
      setError(t('errorAnalysis') as string);
      setAppState('error');
    }
  }, [onAnalysisComplete, t]);
  
  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      performAnalysis(base64String);
    };
    reader.readAsDataURL(file);
  }, [performAnalysis]);

  const handleStartOverClick = () => {
    onStartOver();
    setSubmittedImage(null);
    setError(null);
    setAppState('welcome');
  };

  const WelcomeContent = () => (
    <div className="text-center">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl shadow-[#9ebf4f]/10 border border-[#dce8b9]/50">
            <h2 className="text-xl font-bold text-[#36451b]">{t('welcomeTitle')}</h2>
            <p className="mt-2 text-sm text-[#648232] mb-6">{t('welcomeInstruction')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => document.querySelector<HTMLElement>('.dropzone-input')?.click()}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-[#80a040] text-white font-semibold rounded-lg shadow-sm hover:bg-[#648232] transition-colors"
                >
                    <UploadIcon className="w-5 h-5 mr-2" />
                    {t('buttonUploadFile')}
                </button>
            </div>
        </div>
        {/* Hidden dropzone for the upload button */}
        <div className="hidden">
            <ImageUploader onImageUpload={handleImageUpload} />
        </div>
    </div>
  );
  
  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <Spinner />;
      case 'result':
        return analysisContext && submittedImage && (
          <div className="space-y-8">
            <ResultCard result={analysisContext} imageSrc={submittedImage} />
            <Chatbox context={analysisContext} />
          </div>
        );
      case 'error':
        return (
          <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-rose-200">
            <div className="flex justify-center items-center mb-4">
               <AlertTriangleIcon className="h-10 w-10 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-rose-700">{t('errorTitle')}</h2>
            <p className="mt-2 text-[#648232]">{error}</p>
            <button
              onClick={handleStartOverClick}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-[#80a040] to-[#648232] text-white font-semibold rounded-lg shadow-sm hover:from-[#648232] hover:to-[#4d6426] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f]"
            >
              {t('buttonTryAgain')}
            </button>
          </div>
        );
      case 'welcome':
      default:
        return <WelcomeContent />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {appState !== 'result' && (
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#36451b]">{t('homeTitle')}</h1>
            <p className="mt-4 text-lg text-[#648232]">
                {t('homeSubtitle')}
            </p>
        </div>
      )}
       <div className={`mx-auto ${appState === 'result' ? 'max-w-4xl' : 'mt-10 max-w-2xl'}`}>
         {renderContent()}
       </div>
       {appState === 'result' && (
         <div className="mt-8 flex justify-center">
            <button
              onClick={handleStartOverClick}
              className="px-8 py-3 bg-gradient-to-r from-[#80a040] to-[#648232] text-white font-semibold rounded-lg shadow-sm hover:from-[#648232] hover:to-[#4d6426] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f]"
            >
              {t('buttonAnalyzeAnother')}
            </button>
          </div>
       )}
       {appState === 'welcome' && currentFact && (
          <div className="mt-12 max-w-2xl mx-auto animate-fade-in">
             <div className="bg-white/50 p-4 rounded-xl border border-[#dce8b9]/30">
                <div className="flex items-center">
                    <div className="p-2 bg-[#eef3d9] rounded-full mr-4">
                        <LightbulbIcon className="w-6 h-6 text-[#80a040]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-md text-[#36451b]">{t('didYouKnowTitle')}</h3>
                        <p className="text-sm text-[#4d6426]">{currentFact}</p>
                    </div>
                </div>
            </div>
          </div>
       )}
    </div>
  );
};