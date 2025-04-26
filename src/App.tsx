import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AdminSpace } from './components/AdminSpace';
import { Dashboard } from './components/dashboard/Dashboard';
import { TestYourLevel } from './components/TestYourLevel';
import { PricingPacks } from './components/PricingPacks';
import { Registration } from './components/Registration';
import { Library } from './components/library/Library';
import { Footer } from './components/Footer';
import { useAuthStore } from './store/authStore';
import { DictionaryContextMenu } from './components/DictionaryContextMenu';
import { useDictionaryLookup } from './hooks/useDictionaryLookup';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { selectedWord, menuPosition, showMenu, closeMenu } = useDictionaryLookup();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <>
            <Hero />
            <About />
            <Registration />
            <div className="relative py-24 bg-gradient-to-b from-white to-gray-50">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
              <div className="relative">
                <PricingPacks />
              </div>
            </div>
            <TestYourLevel />
            <Library />
            <AdminSpace />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      
      {showMenu && (
        <DictionaryContextMenu
          word={selectedWord}
          position={menuPosition}
          onClose={closeMenu}
        />
      )}
    </div>
  );
}

export default App;