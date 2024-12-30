import React, { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import InstagramFilters from './InstagramFilters';
import Papa from 'papaparse';

interface InstagramAccount {
  username: string;
  vrstaNaloga: string;
  vrstaUstanove: string;
  grad: string;
  imeInstitucije: string;
  orderNumber: number;
}

const Events = () => {
  const { t } = useLanguage();
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    vrstaNaloga: [],
    vrstaUstanove: [],
    grad: [],
    imeInstitucije: []
  });

  useEffect(() => {
    fetch('/Spiskovi univerziteta i informisanje - master_tabela (1).csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const parsedAccounts = results.data
              .map(row => ({
                username: row.Username?.trim(),
                vrstaNaloga: row.vrsta_naloga?.trim(),
                vrstaUstanove: row.vrsta_institucije?.trim(),
                grad: row.Grad?.trim(),
                imeInstitucije: row['Ime Institucije']?.trim(),
                orderNumber: parseInt(row.red) || Infinity
              }))
              .filter(account => account.username);
            setAccounts(parsedAccounts);
          }
        });
      })
      .catch(error => {
        console.error('Error loading CSV:', error);
      });
  }, []);

  console.log('All accounts:', accounts);
  console.log('Selected filters:', selectedFilters);

  const filterOptions = useMemo(() => {
    const countByField = (field: keyof InstagramAccount) => {
      return accounts.reduce((acc, account) => {
        const value = account[field];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    };

    return {
      vrstaNaloga: Object.entries(countByField('vrstaNaloga'))
        .map(([value, count]) => ({ value, label: value, count }))
        .filter(option => option.value),
      vrstaUstanove: Object.entries(countByField('vrstaUstanove'))
        .map(([value, count]) => ({ value, label: value, count }))
        .filter(option => option.value),
      grad: Object.entries(countByField('grad'))
        .map(([value, count]) => ({ value, label: value, count }))
        .filter(option => option.value)
        .sort((a, b) => b.count - a.count),
      imeInstitucije: Object.entries(countByField('imeInstitucije'))
        .map(([value, count]) => ({ value, label: value, count }))
        .filter(option => option.value)
        .sort((a, b) => a.label.localeCompare(b.label))
    };
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    const filtered = accounts.filter(account => {
      const matchesVrstaNaloga = selectedFilters.vrstaNaloga.length === 0 || 
        selectedFilters.vrstaNaloga.includes(account.vrstaNaloga);
      const matchesVrstaUstanove = selectedFilters.vrstaUstanove.length === 0 || 
        selectedFilters.vrstaUstanove.includes(account.vrstaUstanove);
      const matchesGrad = selectedFilters.grad.length === 0 || 
        selectedFilters.grad.includes(account.grad);
      const matchesImeInstitucije = selectedFilters.imeInstitucije.length === 0 || 
        selectedFilters.imeInstitucije.includes(account.imeInstitucije);

      return matchesVrstaNaloga && matchesVrstaUstanove && matchesGrad && matchesImeInstitucije;
    });

    // Sort accounts: ordered ones first, then random
    const orderedAccounts = [...filtered].sort((a, b) => {
      // If both have order numbers (not Infinity)
      if (isFinite(a.orderNumber) && isFinite(b.orderNumber)) {
        return a.orderNumber - b.orderNumber;
      }
      // If only a has order number
      if (isFinite(a.orderNumber)) return -1;
      // If only b has order number
      if (isFinite(b.orderNumber)) return 1;
      // If neither has order number, randomize
      return Math.random() - 0.5;
    });

    return orderedAccounts;
  }, [accounts, selectedFilters]);

  const handleFilterChange = (filterType: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  useEffect(() => {
    // Remove any existing embed.js scripts
    const existingScripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]');
    existingScripts.forEach(script => script.remove());

    // Add fresh embed.js script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
      }
    };

    document.body.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[src*="instagram.com/embed.js"]');
      scripts.forEach(script => script.remove());
    };
  }, [filteredAccounts]); // Re-run when filtered accounts change

  console.log('Filtered accounts:', filteredAccounts);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{t('nav.events')}</h1>
      
      <InstagramFilters
        options={filterOptions}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <div 
            key={account.username}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`https://www.instagram.com/${account.username}/`}
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
            >
              <div style={{ padding: '16px' }}>
                <a
                  href={`https://www.instagram.com/${account.username}/`}
                  style={{
                    background: '#FFFFFF',
                    lineHeight: '0',
                    padding: '0 0',
                    textAlign: 'center',
                    textDecoration: 'none',
                    width: '100%'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Loading...
                </a>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events; 