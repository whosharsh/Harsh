
import React from 'react';
import type { EducationalContent } from '../types';
import { LeafIcon } from '../components/icons/LeafIcon';
import { useI18n } from '../contexts/I18nContext';

const diseaseData: EducationalContent[] = [
    {
        name: 'Apple Scab',
        scientificName: 'Venturia inaequalis',
        description: 'A common disease of apple and crabapple trees, causing olive-green to brown spots on leaves, fruit, and twigs. Severe infections can lead to defoliation and reduced fruit quality.',
        prevention: 'Plant resistant varieties, ensure good air circulation through pruning, and clean up fallen leaves in the autumn to reduce fungal spores.',
        image: 'https://storage.googleapis.com/aistudio-project-showcase-assets/plant-ai-assets/apple_scab.jpg'
    },
    {
        name: 'Tomato Late Blight',
        scientificName: 'Phytophthora infestans',
        description: 'A devastating fungal disease affecting tomatoes and potatoes. Symptoms include large, dark, water-soaked lesions on leaves and stems, which can quickly destroy the entire plant.',
        prevention: 'Ensure proper spacing for air flow, avoid overhead watering, and apply preventative fungicides, especially during cool, moist weather.',
        image: 'https://storage.googleapis.com/aistudio-project-showcase-assets/plant-ai-assets/tomato_late_blight.jpg'
    },
    {
        name: 'Rose Black Spot',
        scientificName: 'Diplocarpon rosae',
        description: 'A fungal disease that manifests as black spots with fringed margins on the upper surfaces of rose leaves. Affected leaves often turn yellow and drop prematurely, weakening the plant.',
        prevention: 'Keep leaves as dry as possible by watering at the base. Prune affected canes and remove fallen leaves. Fungicidal sprays can be effective if applied early.',
        image: 'https://storage.googleapis.com/aistudio-project-showcase-assets/plant-ai-assets/rose_black_spot.jpg'
    },
     {
        name: 'Corn Common Rust',
        scientificName: 'Puccinia sorghi',
        description: 'Characterized by small, cinnamon-brown, powdery pustules on both upper and lower leaf surfaces. While typically not a major yield-limiting disease, severe infections can reduce photosynthetic area.',
        prevention: 'Planting resistant hybrids is the most effective management strategy. Fungicides are generally not necessary unless the infection is severe on a susceptible hybrid.',
        image: 'https://storage.googleapis.com/aistudio-project-showcase-assets/plant-ai-assets/corn_rust.jpg'
    }
];


export const LearnPage: React.FC = () => {
    const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <LeafIcon className="mx-auto h-16 w-auto text-[#80a040] dark:text-lime-400" />
          <h1 className="mt-4 text-4xl font-bold text-[#36451b] dark:text-white">{t('learnTitle')}</h1>
          <p className="mt-4 text-lg text-[#648232] dark:text-gray-300">
            {t('learnSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diseaseData.map((disease) => (
                <div key={disease.name} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50 dark:border-gray-700 flex flex-col overflow-hidden transition-transform hover:scale-105 duration-300">
                    <img src={disease.image} alt={disease.name} className="w-full h-48 object-cover rounded-md mb-4" />
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-[#36451b] dark:text-white">{disease.name}</h2>
                        <p className="text-sm italic text-[#648232] dark:text-gray-400 mb-3">{disease.scientificName}</p>
                        <p className="text-[#4d6426] dark:text-gray-300 text-sm mb-4">
                            <strong>{t('learnDescription')}:</strong> {disease.description}
                        </p>
                        <p className="text-[#4d6426] dark:text-gray-300 text-sm">
                             <strong>{t('learnPrevention')}:</strong> {disease.prevention}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};