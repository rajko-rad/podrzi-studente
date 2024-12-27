import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'sr', name: 'Srpski' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
        <Globe size={20} />
        <span className="uppercase">{language}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              language === lang.code ? 'bg-gray-50 font-medium' : ''
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector; 