import React from 'react';
import type { HistoryItem } from '../types';
import { HistoryIcon } from '../components/icons/HistoryIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { LinkIcon } from '../components/icons/LinkIcon';

interface HistoryPageProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ history, onClearHistory }) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="flex items-center">
                <HistoryIcon className="h-10 w-10 text-[#80a040]" />
                <h1 className="ml-4 text-4xl font-bold text-[#36451b]">Analysis History</h1>
            </div>
            {history.length > 0 && (
                <button
                    onClick={onClearHistory}
                    className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-rose-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Clear History
                </button>
            )}
        </div>

        {history.length === 0 ? (
          <div className="text-center bg-white/80 backdrop-blur-md p-12 rounded-xl shadow-2xl shadow-[#9ebf4f]/10 border border-[#dce8b9]/50">
            <h2 className="text-xl font-semibold text-[#4d6426]">No History Yet</h2>
            <p className="mt-2 text-[#648232]">Your past analysis results will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div key={item.id} className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-[#dce8b9]/50 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-300 hover:shadow-lg hover:border-[#b9cc85]">
                <img
                  src={item.imageSrc}
                  alt="Analyzed leaf"
                  className="w-24 h-24 object-cover rounded-md border border-[#dce8b9] flex-shrink-0"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-[#36451b]">{item.result.plantName}</h3>
                  <p className={`font-semibold ${item.result.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                    {item.result.isHealthy ? 'Healthy' : item.result.diseaseName}
                  </p>
                   {item.result.safetyWarning && (
                     <p className="text-sm text-amber-700 font-medium mt-1">Safety Warning Issued</p>
                   )}
                   {item.result.sources && item.result.sources.length > 0 && (
                        <div className="mt-2 text-xs text-[#648232] flex items-center justify-center sm:justify-start">
                            <LinkIcon className="w-3 h-3 mr-1.5" />
                            <span>Sourced from web</span>
                        </div>
                    )}
                </div>
                <div className="text-sm text-[#648232] flex-shrink-0">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};