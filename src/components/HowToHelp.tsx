import React from 'react';
import { ExternalLink, Clock, Gift, Wallet, AlertCircle, UserPlus, HelpingHand, Truck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Link {
  text: string;
  href: string;
}

interface SupportOption {
  icon: React.ReactNode;
  title: string;
  description: string;
  links: Link[];
}

interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  links: Link[];
}

const HowToHelp = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "Hrana i piće",
      items: [
        "Voda (Obična, Kisela, Flaširana)",
        "Sokovi (Negazirani, Gazirani, Energetska pića)",
        "Mlečni napici (Mleko, Jogurt)",
        "Pekarski proizvodi (Hleb, Peciva)",
        "Gotova jela (Kuvana, Posna, Mrsna)",
        "Namazi i dodaci (Pavlaka, Sirni namazi, Pašteta, Kačkavalj)",
        "Grickalice (Slane grickalice, Slatkiši)"
      ]
    },
    {
      title: "Oprema",
      items: [
        "Grejna tela (Grejalice, Rešo, Indukciona ploča)",
        "Pribor za jelo (Plastični pribor, Plastični tanjiri)",
        "Kuhinjska oprema (Džezva, Šerpe, Tiganji)",
        "Uređaji (Mikrotalasna, Mini frižider)",
        "Spavanje (Dušeci, Jastuci, Vreće za spavanje)"
      ]
    },
    {
      title: "Higijena",
      items: [
        "Toaletne potrebe (Toalet papir, Vlažne maramice)",
        "Sredstva za čišćenje (Sredstvo za pranje sudova)",
        "Zaštitna oprema (Rukavice za pranje)"
      ]
    },
    {
      title: "Materijali za proteste",
      items: [
        "Materijali za transparente (Hameri, Markeri)",
        "Tekstil (Veće tkanine, Vodootporne boje)",
        "Audio oprema (Megafoni, Zvučnici)"
      ]
    }
  ];

  const localSupport: SupportOption[] = [
    {
      icon: <UserPlus className="w-8 h-8 text-blue-500" />,
      title: "Pridružite se Protestima",
      description: "Najnovije vesti o planiranim akcijama i protestima možete naći u",
      links: [
        { text: "aktuelnim dešavanjima", href: "/aktuelno" },
        { text: "studentskim stranicama", href: "/pratite" }
      ]
    },
    {
      icon: <HelpingHand className="w-8 h-8 text-red-500" />,
      title: "Posetite blokade uživo",
      description: "Odite, upoznajte studente, izrazite im podršku sa pismom",
      links: []
    },
    {
      icon: <Gift className="w-8 h-8 text-green-500" />,
      title: "Odnesite pomoć studentima",
      description: "Pogledajte trenutno potrebne namirnice i odnesite studentima u blokadama direktno",
      links: [{ text: "spisak potrebnih namirnica", href: "#potrebne-namirnice" }]
    }
  ];

  const remoteSupport: SupportOption[] = [
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      title: "Ponudite svoje vreme i veštine",
      description: "Pravna pomoć i savetovanje, grafički dizajn, napravite stranicu i širite dalje svojim prijateljima i poznanicima",
      links: []
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Online pošiljke",
      description: "Koristite usluge kao što su Wolt ili Maxi dostava kako biste poslali potrebne namirnice studentima",
      links: [{ text: "spiskovi i uputstva", href: "#spiskovi" }]
    },
    {
      icon: <Wallet className="w-8 h-8 text-teal-500" />,
      title: "Indirektna uplata",
      description: "Uplatite nam novčana sredstva koja ćemo transparentno raspodeliti studentskim grupama",
      links: [{ text: "PayPal donacija", href: "#" }]
    }
  ];

  const SupportCard: React.FC<SupportCardProps> = ({ icon, title, description, links }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">
        {description}
        {links.map((link, i) => (
          <React.Fragment key={link.href}>
            {i === 0 && description ? " " : ""}
            <a 
              href={link.href}
              className="text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              {link.text}
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            {i < links.length - 1 ? " ili " : ""}
          </React.Fragment>
        ))}
      </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Kako možete pomoći?
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Svaki vid podrške je dragocen. Izaberite način koji vam najviše odgovara.
      </p>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          U mogućnosti ste da se pridružite na lokalu?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localSupport.map((option, index) => (
            <SupportCard key={index} {...option} />
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Podržite iz daljine
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remoteSupport.map((option, index) => (
            <SupportCard key={index} {...option} />
          ))}
        </div>
      </div>

      {/* Needed Items Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Potrebne namirnice i materijali</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-gray-600 text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Current Needs Table */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            Aktuelne potrebe po lokacijama
          </h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          [TABLE PLACEHOLDER]
        </div>
      </div>
    </div>
  );
};

export default HowToHelp; 