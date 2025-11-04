import React from 'react';
import { LeafIcon } from '../components/icons/LeafIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';


export const AboutPage: React.FC = () => {
    const features = [
        "Instant AI-Powered Diagnosis",
        "Actionable Treatment Suggestions",
        "Safety-First Approach",
        "Interactive AI Chat for Deeper Insights"
    ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-emerald-200">
        <div className="text-center mb-8">
          <LeafIcon className="mx-auto h-16 w-auto text-emerald-600" />
          <h1 className="mt-4 text-4xl font-bold text-emerald-900">About Plant AI</h1>
          <p className="mt-4 text-lg text-emerald-700">
            Cultivating a healthier relationship between people and plants through technology.
          </p>
        </div>
        
        <div className="space-y-6 text-emerald-800">
          <p>
            Welcome to Plant AI, a smart tool designed for gardeners, farmers, and plant enthusiasts of all levels. Our mission is to make plant care simple, accessible, and effective by leveraging the power of artificial intelligence. We believe that a greener world starts in our own backyards, and with the right knowledge, anyone can help their plants thrive.
          </p>
          <p>
            Using a state-of-the-art generative AI model, Plant AI can analyze a photo of a plant leaf to quickly identify potential diseases. But we don't just stop at a diagnosis. Our system provides clear, concise descriptions of the issue and offers practical, easy-to-follow treatment suggestions.
          </p>

           <h2 className="text-2xl font-bold text-emerald-900 pt-4">Our Features</h2>
            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
          
          <p>
            Whether you're tending to a small houseplant or managing a large garden, Plant AI is here to be your trusted partner in plant care. Thank you for joining us on this journey to create a healthier, greener planet, one leaf at a time.
          </p>
        </div>
      </div>
    </div>
  );
};