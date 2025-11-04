
import React, { useState, useCallback } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ResultCard } from '../components/ResultCard';
import { Spinner } from '../components/Spinner';
import { Chatbox } from '../components/Chatbox';
import { analyzePlantLeaf } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import { AlertTriangleIcon } from '../components/icons/AlertTriangleIcon';

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
      setError('An error occurred during analysis. The AI model may be unable to process this image. Please try another.');
      setAppState('error');
    }
  }, [onAnalysisComplete]);
  
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
          <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-rose-200 dark:border-rose-500/30">
            <div className="flex justify-center items-center mb-4">
               <AlertTriangleIcon className="h-10 w-10 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400">Analysis Failed</h2>
            <p className="mt-2 text-[#648232] dark:text-gray-300">{error}</p>
            <button
              onClick={handleStartOverClick}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-[#80a040] to-[#648232] text-white font-semibold rounded-lg shadow-sm hover:from-[#648232] hover:to-[#4d6426] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f] dark:from-[#9ebf4f] dark:to-[#80a040] dark:text-gray-900 dark:hover:from-lime-300 dark:hover:to-lime-400 dark:focus:ring-lime-300"
            >
              Try Again
            </button>
          </div>
        );
      case 'welcome':
      default:
        return (
            <ImageUploader onImageUpload={handleImageUpload} />
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {appState !== 'result' && (
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#36451b] dark:text-white">Plant Health Analysis</h1>
            <p className="mt-4 text-lg text-[#648232] dark:text-gray-300">
                Upload a photo of a plant leaf, and our AI will identify potential diseases and provide care suggestions.
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
              className="px-8 py-3 bg-gradient-to-r from-[#80a040] to-[#648232] text-white font-semibold rounded-lg shadow-sm hover:from-[#648232] hover:to-[#4d6426] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f] dark:from-[#9ebf4f] dark:to-[#80a040] dark:text-gray-900 dark:hover:from-lime-300 dark:hover:to-lime-400 dark:focus:ring-lime-300"
            >
              Analyze Another Leaf
            </button>
          </div>
       )}
    </div>
  );
};