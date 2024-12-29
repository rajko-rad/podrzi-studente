import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const instagramAccounts = [
  'studenti_u_blokadi',
  'filozofi.u.blokadi',
  'flu_blokada',
  'blokadapmf',
  'etfublokadi',
  'blokada.fpn',
  'blokada.auns',
  'vhs.blokada',
  'stomfbg_blokada',
  'fasper_inicijativa_studenata',
  'filoloski.blokada',
  'blokada.bioloski',
  'sviublokade.fdu',
  'blokada_pravni',
  'blokada.ffubg',
  'blokada.arh.bg',
  'blokada.fon',
  'ekof.blokada',
  'blokadaffh',
  'dif.blokada',
  'grf.blokade',
  'blokada.fb',
  'poljoprivredniblokada',
  'masinci.u.blokadi'
];

const Events = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{t('nav.events')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instagramAccounts.map((account) => (
          <div 
            key={account}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`https://www.instagram.com/${account}/?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events; 