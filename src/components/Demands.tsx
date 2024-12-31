import React, { useEffect } from 'react';
import { FileText, Instagram, MessageCircle, ExternalLink } from 'lucide-react';

interface DemandSection {
  id: number;
  title: string;
  shortTitle: string;
  fullText: string;
  imagePath: string;
}

const Demands = () => {
  const demands: DemandSection[] = [
    {
      id: 1,
      title: "1. Objavljivanje dokumentacije",
      shortTitle: "1. Dokumentacija železničke stanice",
      fullText: "Nakon urušavanja nadstrešnice na nedavno rekonstruisanoj železničkoj stanici u Novom Sadu, pri čemu je smrtno stradalo 15 osoba, javnost s pravom traži objašnjenja. Uvid u dokumentaciju bi nam pokazao koji su to propusti načinjeni tokom projektovanja, izvođenja i nadzora radova, a koje aktuelna vlast pokušava da sakrije. Od urušavanja nadstrešnice prošlo je mesec dana, a javnost i dalje ne zna i nije obaveštena o odgovornosti konkretnih ljudi i institucija koje su bile uključene u realizaciju ovog projekta. Skrivanje dokumentacije izaziva sumnju u nepravilnosti i korupciju, čime se ugrožava poverenje u javne projekte. Zahtevamo hitno objavljivanje svih ugovora, dokumentacije, izveštaja o nadzoru i kvalitetu radova, kako bi se jasno utvrdila odgovornost i sprečilo ponavljanje sličnih događaja. Transparentnost u ovakvim situacijama je nužna radi osiguravanja bezbednosti građana.",
      imagePath: "/zahtevi_slike/prvi.png"
    },
    {
      id: 2,
      title: "2. Odbacivanje optužbi protiv studenta",
      shortTitle: "2. Optužbe protiv studenta",
      fullText: "Tokom protesta, mnogi studenti i građani su privedeni ili uhapšeni, a protiv nekih su podignute optužbe bez jasnih dokaza. Neki su proveli u pritvoru i do 23 dana, u nehumanim uslovima. Privođenje bez pravnog osnova predstavlja kršenje prava na slobodu izražavanja i okupljanja. Studenti zahtevaju da se sve optužbe koje nisu utemeljene na dokazima hitno odbace, a odgovorni za neosnovano lišavanje slobode pozovu na odgovornost. Takvo postupanje šalje negativnu poruku i stvara atmosferu straha, što je neprihvatljivo u demokratskom društvu.",
      imagePath: "/zahtevi_slike/drugi.png"
    },
    {
      id: 3,
      title: "3. Podnošenje krivičnih prijava",
      shortTitle: "3. Prijave protiv nasilnika",
      fullText: "Zabeleženi napadi na studente i profesore tokom protesta zahtevaju adekvatnu reakciju nadležnih organa. Fizičko nasilje nad učesnicima javnih okupljanja ozbiljno ugrožava prava i slobode građana. Zahtevamo od Ministarstva unutrašnjih poslova da identifikuje počinioce, podnese krivične prijave i obezbedi procesuiranje odgovornih. Pravovremeno postupanje u ovom slučaju je ključno za očuvanje osnovnih prava i sigurnosti svih učesnika u javnim aktivnostima. ",
      imagePath: "/zahtevi_slike/treci.png"
    },
    {
      id: 4,
      title: "4. Povećanje izdvajanja sredstava",
      shortTitle: "4. Sredstva za obrazovanje",
      fullText: "Državni fakulteti se suočavaju sa hroničnim nedostatkom sredstava, što dovodi do loših uslova za rad i studiranje, kao i problema u realizaciji nastavnih i naučnih aktivnosti. Povećanje budžetskih izdvajanja za 20% je nužno kako bi se unapredio kvalitet obrazovanja, poboljšali uslovi na fakultetima i obezbedila adekvatna podrška studentima i zaposlenima. Potrebno je da se sredstva preraspodele u korist obrazovanja, koje predstavlja temelj društvenog napretka, umesto da se troše na manje prioritetne i znatno skuplje projekte. Ulaganje u obrazovanje nije trošak, već investicija u budućnost zemlje i njene građane.",
      imagePath: "/zahtevi_slike/cetvrti.png"
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Source Attribution */}
        <div className="mb-8 text-center">
          <a 
            href="https://www.instagram.com/p/DDDLv_VgrSo/?img_index=6"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span>Izvor: Originalna objava na Instagramu</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {demands.map((demand) => (
            <a
              key={demand.id}
              href={`#zahtev-${demand.id}`}
              className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-red-600"
            >
              {demand.shortTitle}
            </a>
          ))}
        </div>

        {/* Demands with Interleaved Images */}
        <div className="space-y-24 mb-24">
          {demands.map((demand, index) => (
            <div
              key={demand.id}
              id={`zahtev-${demand.id}`}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="lg:w-1/2 order-2 lg:order-none">
                <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-red-100 p-2 rounded-full">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold">{demand.title}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {demand.fullText}
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 flex items-center justify-center order-1 lg:order-none">
                <img
                  src={demand.imagePath}
                  alt={`Zahtev ${demand.id}`}
                  className="rounded-lg shadow-md w-[85%] h-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Explanations Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold">Detaljnija Objašnjenja</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['DECYPNRAJv6', 'DEFfXm5AVAh', 'DEHvVVyg2gP'].map((postId) => (
              <div key={postId} className="instagram-embed-container">
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-captioned 
                  data-instgrm-permalink={`https://www.instagram.com/p/${postId}/?utm_source=ig_embed&amp;utm_campaign=loading`}
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
      </div>
    </div>
  );
};

export default Demands; 