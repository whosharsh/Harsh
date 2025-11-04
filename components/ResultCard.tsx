
import React from 'react';
import type { AnalysisResult } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { InfoIcon } from './icons/InfoIcon';
import { HeartPulseIcon } from './icons/HeartPulseIcon';

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultPill: React.FC<{ isHealthy: boolean }> = ({ isHealthy }) => {
    const bgColor = isHealthy ? 'bg-green-100' : 'bg-red-100';
    const textColor = isHealthy ? 'text-green-800' : 'text-red-800';
    const Icon = isHealthy ? CheckCircleIcon : AlertTriangleIcon;
  
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${bgColor} ${textColor}`}>
        <Icon className="w-5 h-5 mr-2" />
        {isHealthy ? 'Healthy' : 'Diseased'}
      </span>
    );
};

const ConfidenceMeter: React.FC<{ value: number }> = ({ value }) => {
    const width = `${value}%`;
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-600">Confidence</span>
                <span className="text-sm font-bold text-green-700">{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width }}></div>
            </div>
        </div>
    );
};

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-fade-in">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{result.disease}</h2>
                <div className="mt-2">
                    <ResultPill isHealthy={result.isHealthy} />
                </div>
            </div>
            <div className="w-full md:w-48 flex-shrink-0">
                <ConfidenceMeter value={result.confidence} />
            </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <InfoIcon className="w-6 h-6 mr-3 text-blue-500" />
                Description
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed">{result.description}</p>
          </div>
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <HeartPulseIcon className="w-6 h-6 mr-3 text-teal-500" />
                Treatment & Care
            </h3>
            <p className="mt-2 text-gray-600 leading-relaxed whitespace-pre-wrap">{result.treatment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
