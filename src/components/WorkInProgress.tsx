import React from 'react';
import { Construction } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const WorkInProgress = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <Construction size={48} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        {t('wip.title')}
      </h2>
      <p className="text-gray-500">
        {t('wip.message')}
      </p>
    </div>
  );
};

export default WorkInProgress;