
import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { InfoIcon } from './icons/InfoIcon';
import { HeartPulseIcon } from './icons/HeartPulseIcon';
import { ShareIcon } from './icons/ShareIcon';
import { LinkIcon } from './icons/LinkIcon';

interface ResultCardProps {
  result: AnalysisResult;
  imageSrc: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, imageSrc }) => {
  const isHealthy = result.isHealthy;
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleShare = async () => {
    const sourcesText = result.sources && result.sources.length > 0
      ? `\nSources:\n${result.sources.map(s => s.web ? `- ${s.web.title} (${s.web.uri})` : '').filter(Boolean).join('\n')}`
      : '';

    const shareText = `Plant Analysis Result:
- Plant: ${result.plantName}
- Status: ${isHealthy ? 'Healthy' : `Diseased with ${result.diseaseName}`}
- Description: ${result.description}
${result.treatment ? `- Treatment: ${result.treatment}` : ''}
${result.safetyWarning ? `- SAFETY WARNING: ${result.safetyWarning}` : ''}${sourcesText}`;

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
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl shadow-[#9ebf4f]/10 dark:shadow-[#9ebf4f]/5 border border-[#dce8b9]/50 dark:border-gray-700 overflow-hidden transition-all duration-300 animate-fade-in flex flex-col items-center p-6 md:p-8 hover:shadow-lg hover:-translate-y-1">
      <h2 className="text-2xl font-bold text-[#36451b] dark:text-white mb-6">Analysis Complete</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="flex justify-center items-center">
            <img 
                src={imageSrc} 
                alt="Submitted plant leaf"
                className="w-full max-w-xs h-auto rounded-lg shadow-sm border-2 border-[#dce8b9] dark:border-gray-600"
            />
        </div>
        
        <div className="flex flex-col space-y-4">
            {result.safetyWarning && (
                <div className="p-4 rounded-lg bg-amber-100 border border-amber-200 text-amber-800 dark:bg-amber-900/50 dark:border-amber-800/60 dark:text-amber-300">
                    <div className="flex items-center">
                        <AlertTriangleIcon className="h-6 w-6 mr-3 flex-shrink-0" />
                        <h4 className="font-bold text-lg">Safety Warning</h4>
                    </div>
                    <p className="mt-2 text-sm">
                        {result.safetyWarning}
                    </p>
                </div>
            )}
          
            <div className={`p-4 rounded-lg flex items-center ${isHealthy ? 'bg-[#eef3d9] text-[#36451b] dark:bg-green-900/50 dark:text-green-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300'}`}>
                {isHealthy ? <CheckCircleIcon className="h-6 w-6 mr-3" /> : <AlertTriangleIcon className="h-6 w-6 mr-3" />}
                <div>
                    <h3 className="font-bold text-lg">{result.plantName}: {isHealthy ? 'Healthy' : result.diseaseName}</h3>
                </div>
            </div>

             <div className="p-4 rounded-lg bg-gray-100 border border-gray-200 dark:bg-gray-700/60 dark:border-gray-600">
                <div className="flex items-center text-gray-800 dark:text-gray-200">
                    <InfoIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <h4 className="font-bold">Description</h4>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                    {result.description}
                </p>
            </div>

            {result.treatment && (
                 <div className="p-4 rounded-lg bg-[#eef3d9]/70 border border-[#dce8b9] dark:bg-gray-700/60 dark:border-gray-600">
                    <div className="flex items-center text-[#36451b] dark:text-gray-200">
                        <HeartPulseIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <h4 className="font-bold">Treatment Suggestion</h4>
                    </div>
                    <p className="mt-2 text-[#4d6426] dark:text-gray-300 text-sm">
                        {result.treatment}
                    </p>
                </div>
            )}

            {result.sources && result.sources.length > 0 && (
                <div className="p-4 rounded-lg bg-gray-100 border border-gray-200 dark:bg-gray-700/60 dark:border-gray-600">
                    <div className="flex items-center text-gray-800 dark:text-gray-200">
                        <LinkIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <h4 className="font-bold">Sources from the web</h4>
                    </div>
                    <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
                        {result.sources.map((source, index) => (
                            source.web && (
                                <li key={index}>
                                    <a 
                                        href={source.web.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#648232] dark:text-lime-400 hover:text-[#36451b] dark:hover:text-lime-300 hover:underline break-words"
                                        title={source.web.title}
                                    >
                                        {source.web.title || source.web.uri}
                                    </a>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-[#dce8b9]/50 dark:border-gray-700 w-full flex justify-center">
        <button
            onClick={handleShare}
            className="flex items-center px-6 py-2 bg-[#eef3d9] text-[#36451b] font-semibold rounded-lg shadow-sm hover:bg-[#dce8b9] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f] dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-lime-400"
            >
            <ShareIcon className="w-5 h-5 mr-2" />
            {shareStatus === 'copied' ? 'Copied!' : 'Share Result'}
        </button>
      </div>
    </div>
  );
};
