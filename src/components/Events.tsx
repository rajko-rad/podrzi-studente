import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
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

const INITIAL_LOAD_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const Events = () => {
  const { t } = useLanguage();
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const [loadedEmbeds, setLoadedEmbeds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    vrstaNaloga: [],
    vrstaUstanove: [],
    grad: [],
    imeInstitucije: []
  });

  // Load Instagram embed script once on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Fetch accounts data
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

  const visibleAccounts = useMemo(() => {
    return filteredAccounts.slice(0, visibleCount);
  }, [filteredAccounts, visibleCount]);

  const loadEmbed = useCallback((username: string) => {
    if (loadedEmbeds.has(username)) return;
    
    // @ts-ignore
    if (window.instgrm) {
      // @ts-ignore
      window.instgrm.Embeds.process();
      setLoadedEmbeds(prev => new Set([...prev, username]));
    }
  }, [loadedEmbeds]);

  // Setup Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const username = entry.target.getAttribute('data-username');
            if (username) {
              loadEmbed(username);
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    return () => observerRef.current?.disconnect();
  }, [loadEmbed]);

  // Setup infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredAccounts.length) {
          setVisibleCount(prev => prev + LOAD_MORE_COUNT);
        }
      },
      { rootMargin: '200px' }
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => observer.disconnect();
  }, [filteredAccounts.length, visibleCount]);

  // Priority loading for first visible items
  useEffect(() => {
    const priorityAccounts = visibleAccounts.slice(0, INITIAL_LOAD_COUNT);
    priorityAccounts.forEach(account => loadEmbed(account.username));
  }, [visibleAccounts, loadEmbed]);

  const handleFilterChange = (filterType: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const institutionCounts = useMemo(() => {
    const higher = accounts.filter(a => 
      a.vrstaUstanove?.toLowerCase().includes('viš') || 
      a.vrstaUstanove?.toLowerCase().includes('fakultet')
    ).length;
    
    const secondary = accounts.filter(a => 
      a.vrstaUstanove?.toLowerCase().includes('srednj')
    ).length;

    return { higher, secondary };
  }, [accounts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold text-center mb-2">{t('nav.events')}</h1>
      
      <p className="text-center text-sm text-gray-600 mb-2">
        {t('events.summary')
          .replace('{higher}', institutionCounts.higher.toString())
          .replace('{secondary}', institutionCounts.secondary.toString())}
      </p>

      <InstagramFilters
        options={filterOptions}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {visibleAccounts.map((account) => (
          <div 
            key={account.username}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            ref={el => {
              if (el) observerRef.current?.observe(el);
            }}
            data-username={account.username}
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
                  {!loadedEmbeds.has(account.username) ? 'Loading...' : ''}
                </a>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
      
      <div ref={loadMoreTriggerRef} className="h-4" />
    </div>
  );
};

export default Events; 