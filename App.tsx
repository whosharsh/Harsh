
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { Spinner } from './components/Spinner';
import { ExampleImages } from './components/ExampleImages';
import { analyzePlantLeaf } from './services/geminiService';
import type { AnalysisResult } from './types';
import { LEAF_EXAMPLES } from './constants';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setAnalysisResult(null);
    setError(null);
  };

  const handleImageSelect = (file: File) => {
    resetState();
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleExampleImageSelect = async (url: string) => {
    resetState();
    setImage(null);
    setIsLoading(true);
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(blob);
    } catch (err) {
        setError('Failed to load example image. Please try again.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    resetState();
  };
  
  const handleAnalyze = useCallback(async () => {
    if (!image) return;

    setIsLoading(true);
    resetState();

    try {
      const base64Image = image.split(',')[1];
      const result = await analyzePlantLeaf(base64Image);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [image]);

  return (
    <div className="min-h-screen bg-green-50/50">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Is your plant healthy?</h1>
            <p className="mt-4 text-lg text-gray-600">
                Upload a photo of a plant leaf, and our AI will analyze it for diseases, providing insights and care tips in seconds.
            </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          {!image && <ExampleImages examples={LEAF_EXAMPLES} onSelect={handleExampleImageSelect} />}
          
          <ImageUploader 
            onImageSelect={handleImageSelect} 
            imagePreview={image}
            onClear={handleClear} 
          />

          <div className="mt-6 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!image || isLoading}
                className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Leaf'}
              </button>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          {isLoading && (
            <div className="flex justify-center items-center p-8">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {analysisResult && <ResultCard result={analysisResult} />}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Plant Disease Detection System. Powered by AI.</p>
      </footer>
    </div>
  );
};

export default App;
