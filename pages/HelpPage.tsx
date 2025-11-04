import React from 'react';
import { InfoIcon } from '../components/icons/InfoIcon';

const faqs = [
    {
        q: "How do I use the Plant AI analyzer?",
        a: "Simply navigate to the Home page, and you'll see an upload area. You can either drag and drop a clear photo of a single plant leaf into the box, or click the box to select a file from your device. The AI will begin analysis automatically."
    },
    {
        q: "What kind of photos work best?",
        a: "For the most accurate results, use a clear, well-lit photo of a single leaf against a neutral background. Make sure the area of concern (e.g., spots, discoloration) is in focus."
    },
    {
        q: "The analysis failed. What should I do?",
        a: "Occasionally, an image may be too blurry, dark, or complex for the AI to process. Please try taking another, clearer photo. If the problem persists, the AI service may be temporarily unavailable."
    },
    {
        q: "How does the AI Chatbot work?",
        a: "After you receive an analysis result, the chatbot will appear. It is already aware of your plant and its diagnosis. You can ask it follow-up questions like 'How can I prevent this in the future?' or 'Are there organic treatment options?' to get more detailed, conversational help."
    },
    {
        q: "Is the diagnosis always 100% accurate?",
        a: "While our AI is highly advanced, it should be used as a guidance tool. AI-based diagnosis is not a substitute for professional agricultural or botanical advice. Always consider multiple factors and, if in doubt, consult a local expert."
    }
];

export const HelpPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl shadow-[#9ebf4f]/10 border border-[#dce8b9]/50">
        <div className="text-center mb-8">
          <InfoIcon className="mx-auto h-12 w-auto text-[#80a040]" />
          <h1 className="mt-4 text-4xl font-bold text-[#36451b]">Help Center</h1>
          <p className="mt-4 text-lg text-[#648232]">
            Frequently Asked Questions
          </p>
        </div>
        
        <div className="space-y-8">
            {faqs.map((faq, index) => (
                 <div key={index}>
                    <h2 className="text-xl font-semibold text-[#36451b]">{faq.q}</h2>
                    <p className="mt-2 text-[#4d6426]">{faq.a}</p>
                 </div>
            ))}
        </div>
      </div>
    </div>
  );
};