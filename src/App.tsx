import React from 'react';
import Navbar from './components/Navbar';
import WorkInProgress from './components/WorkInProgress';

function App() {
  const path = window.location.pathname;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {path === '/' ? (
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Podrška studentskim protestima u Srbiji
          </h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="mb-6 text-gray-700 leading-relaxed">
              Studenti u Srbiji već nedeljama protestuju protiv manjka vladavine prava i urušenih institucija. 
              Povod za proteste bila je tragedija u železničkoj stanici u Novom Sadu, gde je poginulo 15 ljudi, 
              ali se pokret od tada razvio u širi zahtev za promenama.
            </p>
            
            <p className="mb-6 text-gray-700 leading-relaxed">
              Trenutno studenti 24/7 blokiraju rad na više od 18 univerziteta širom zemlje. 
              Potrebna im je podrška u osnovnim namirnicama: voda, hrana, higijenska sredstva, 
              grejalice i drugo. Lokalno stanovništvo već pomaže direktnim donacijama, ali potrebna je dodatna pomoć.
            </p>
            
            <p className="mb-8 text-gray-700 leading-relaxed">
              Ovaj sajt omogućava ljudima iz dijaspore i svima koji nisu u mogućnosti da direktno 
              dostave pomoć da se uključe. Kroz linkove ispod možete donirati novčana sredstva, 
              koja će biti iskorišćena za kupovinu i dostavu potrebnih stvari studentima.
            </p>
            
            <p className="mb-8 text-gray-700 font-medium">
              Sve aktivnosti i troškovi biće transparentno objavljeni.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Podržite studentske proteste:
              </h2>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  Donacija preko PayPal-a
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  Donacija putem bankovnog računa
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  Donacija kriptovalutama
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
          <p>© 2024 Podrška Studentskim Protestima. Sva prava zadržana.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;