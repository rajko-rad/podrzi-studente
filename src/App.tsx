import React from 'react';
import Navbar from './components/Navbar';
import WorkInProgress from './components/WorkInProgress';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const path = window.location.pathname;
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {path === '/' ? (
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {t('landing.title')}
          </h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="mb-6 text-gray-700 leading-relaxed">
              {t('landing.intro')}
            </p>
            
            <p className="mb-6 text-gray-700 leading-relaxed">
              {t('landing.current')}
            </p>
            
            <p className="mb-8 text-gray-700 leading-relaxed">
              {t('landing.about')}
            </p>

            <p className="mb-8 text-gray-700 font-medium">
              {t('landing.transparency')}
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {t('landing.support.title')}
              </h2>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  {t('landing.support.paypal')}
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  {t('landing.support.bank')}
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  {t('landing.support.crypto')}
                </a>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <WorkInProgress />
      )}
      
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;