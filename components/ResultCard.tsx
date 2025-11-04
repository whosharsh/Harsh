import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { InfoIcon } from './icons/InfoIcon';
import { HeartPulseIcon } from './icons/HeartPulseIcon';
import { ShareIcon } from './icons/ShareIcon';

interface ResultCardProps {
  result: AnalysisResult;
  imageSrc: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, imageSrc }) => {
  const isHealthy = result.isHealthy;
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleShare = async () => {
    const shareText = `Plant Analysis Result:
- Plant: ${result.plantName}
- Status: ${isHealthy ? 'Healthy' : `Diseased with ${result.diseaseName}`}
- Description: ${result.description}
${result.treatment ? `- Treatment: ${result.treatment}` : ''}
${result.safetyWarning ? `- SAFETY WARNING: ${result.safetyWarning}` : ''}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plant AI Analysis Result',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy results to clipboard.');
      }
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-200 overflow-hidden transition-all duration-300 animate-fade-in flex flex-col items-center p-6 md:p-8 hover:shadow-lg hover:-translate-y-1">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6">Analysis Complete</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="flex justify-center items-center">
            <img 
                src={imageSrc} 
                alt="Submitted plant leaf"
                className="w-full max-w-xs h-auto rounded-lg shadow-sm border-2 border-emerald-200"
            />
        </div>
        
        <div className="flex flex-col space-y-4">
            {result.safetyWarning && (
                <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-200 text-yellow-800">
                    <div className="flex items-center">
                        <AlertTriangleIcon className="h-6 w-6 mr-3 flex-shrink-0" />
                        <h4 className="font-bold text-lg">Safety Warning</h4>
                    </div>
                    <p className="mt-2 text-sm">
                        {result.safetyWarning}
                    </p>
                </div>
            )}
          
            <div className={`p-4 rounded-lg flex items-center ${isHealthy ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isHealthy ? <CheckCircleIcon className="h-6 w-6 mr-3" /> : <AlertTriangleIcon className="h-6 w-6 mr-3" />}
                <div>
                    <h3 className="font-bold text-lg">{result.plantName}: {isHealthy ? 'Healthy' : result.diseaseName}</h3>
                </div>
            </div>

             <div className="p-4 rounded-lg bg-lime-100 border border-lime-200">
                <div className="flex items-center text-emerald-800">
                    <InfoIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <h4 className="font-bold">Description</h4>
                </div>
                <p className="mt-2 text-emerald-700 text-sm">
                    {result.description}
                </p>
            </div>

            {result.treatment && (
                 <div className="p-4 rounded-lg bg-emerald-100 border border-emerald-200">
                    <div className="flex items-center text-emerald-800">
                        <HeartPulseIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <h4 className="font-bold">Treatment Suggestion</h4>
                    </div>
                    <p className="mt-2 text-emerald-700 text-sm">
                        {result.treatment}
                    </p>
                </div>
            )}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-emerald-200 w-full flex justify-center">
        <button
            onClick={handleShare}
            className="flex items-center px-6 py-2 bg-emerald-100 text-emerald-800 font-semibold rounded-lg shadow-sm hover:bg-emerald-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
            <ShareIcon className="w-5 h-5 mr-2" />
            {shareStatus === 'copied' ? 'Copied!' : 'Share Result'}
        </button>
      </div>
    </div>
  );
};