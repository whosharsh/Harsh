import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

const en = {
  "appTitle": "Plant AI",
  "navHome": "Home",
  "navAbout": "About",
  "navHelp": "Help",
  "navSettings": "Settings",
  "logoutButton": "Logout",
  "homeTitle": "Plant Disease Detection",
  "homeSubtitle": "Upload a photo of a plant leaf, and our AI will identify potential diseases and provide care suggestions.",
  "welcomeTitle": "Begin Your Analysis",
  "welcomeInstruction": "Take a clear photo of a single leaf under natural light for the best results.",
  "buttonUploadFile": "Upload File",
  "buttonUseCamera": "Use Camera",
  "buttonTryAgain": "Try Again",
  "buttonAnalyzeAnother": "Analyze Another Leaf",
  "buttonCancel": "Cancel",
  "errorTitle": "Analysis Failed",
  "errorAnalysis": "An error occurred during analysis. The AI model may be unable to process this image. Please try another.",
  "errorCameraAccess": "Could not access the camera. Please ensure you have given permission in your browser settings.",
  "didYouKnowTitle": "Did you know?",
  "didYouKnowFacts": [
    "Some plants, like the sensitive plant (Mimosa pudica), can move their leaves when touched.",
    "The world's oldest living tree, a bristlecone pine named Methuselah, is over 4,800 years old.",
    "Bamboo is the fastest-growing woody plant in the world; it can grow up to 35 inches in a single day.",
    "Around 85% of plant life is found in the ocean.",
    "The smell of freshly cut grass is actually a plant distress call."
  ]
};

const hi = {
  "appTitle": "प्लांट एआई",
  "navHome": "होम",
  "navAbout": "हमारे बारे में",
  "navHelp": "सहायता",
  "navSettings": "सेटिंग्स",
  "logoutButton": "लॉग आउट",
  "homeTitle": "पौधों में रोग का पता लगाना",
  "homeSubtitle": "एक पौधे की पत्ती का फोटो अपलोड करें, और हमारा एआई संभावित बीमारियों की पहचान करेगा और देखभाल के सुझाव देगा।",
  "welcomeTitle": "अपना विश्लेषण शुरू करें",
  "welcomeInstruction": "सर्वोत्तम परिणामों के लिए प्राकृतिक प्रकाश में एक ही पत्ते का स्पष्ट फोटो लें।",
  "buttonUploadFile": "फ़ाइल अपलोड करें",
  "buttonUseCamera": "कैमरा का प्रयोग करें",
  "buttonTryAgain": "पुनः प्रयास करें",
  "buttonAnalyzeAnother": "दूसरी पत्ती का विश्लेषण करें",
  "buttonCancel": "रद्द करें",
  "errorTitle": "विश्लेषण विफल",
  "errorAnalysis": "विश्लेषण के दौरान एक त्रुटि हुई। हो सकता है कि AI मॉडल इस छवि को संसाधित करने में असमर्थ हो। कृपया दूसरा प्रयास करें।",
  "errorCameraAccess": "कैमरे तक नहीं पहुंच सका। कृपया सुनिश्चित करें कि आपने अपने ब्राउज़र सेटिंग्स में अनुमति दी है।",
  "didYouKnowTitle": "क्या आप जानते हैं?",
  "didYouKnowFacts": [
    "कुछ पौधे, जैसे संवेदनशील पौधा (मिमोसा पुडिका), छूने पर अपनी पत्तियां हिला सकते हैं।",
    "दुनिया का सबसे पुराना जीवित पेड़, मेथुसेलह नामक एक ब्रिसलकोन पाइन, 4,800 साल से अधिक पुराना है।",
    "बांस दुनिया में सबसे तेजी से बढ़ने वाला लकड़ी का पौधा है; यह एक ही दिन में 35 इंच तक बढ़ सकता है।",
    "लगभग 85% पौधों का जीवन महासागर में पाया जाता है।",
    "ताज़ी कटी घास की गंध वास्तव में एक पौधे की संकट की पुकार होती है।"
  ]
};

type Language = 'en' | 'hi';
type TranslationValue = string | string[];
type Translations = { [key: string]: TranslationValue };

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => TranslationValue;
}

const translations: { [key in Language]: Translations } = { en, hi };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && (storedLang === 'en' || storedLang === 'hi')) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  const t = useCallback((key: string): TranslationValue => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);

  const value = { language, setLanguage: handleSetLanguage, t };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
