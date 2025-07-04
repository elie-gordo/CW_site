import React, { useState, useEffect } from 'react';
import { Menu, Wallet2, Users, X, Home, Store, TextSelection as Collection, Info, HelpCircle, Newspaper, Users2, MessageCircle, FileText, Handshake, Shield, Send } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleDiscoverClick = () => {
    setIsLoading(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'about', label: 'À propos', icon: Info },
    { id: 'marketplace', label: 'Marché', icon: Store },
    { id: 'collections', label: 'Collections', icon: Collection },
    { id: 'dao', label: 'DAO', icon: Users },
    { id: 'guide', label: 'Guide', icon: HelpCircle },
  ];

  const footerLinks = [
    { id: 'blog', label: 'Blog', icon: Newspaper },
    { id: 'community', label: 'Communauté', icon: Users2 },
    { id: 'support', label: 'Support', icon: MessageCircle },
    { id: 'terms', label: 'Conditions', icon: FileText },
    { id: 'partners', label: 'Partenaires', icon: Handshake },
    { id: 'security', label: 'Sécurité', icon: Shield },
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: "Sakura Spirit",
      price: "0.5 ETH",
      image: "https://images.unsplash.com/photo-1578950435899-d1c1bf932ab2?q=80&w=800",
    },
    {
      id: 2,
      title: "Cyber Ninja",
      price: "0.8 ETH",
      image: "https://images.unsplash.com/photo-1578950435898-d1c1bf932ab3?q=80&w=800",
    },
    {
      id: 3,
      title: "Moon Princess",
      price: "0.6 ETH",
      image: "https://images.unsplash.com/photo-1578950435897-d1c1bf932ab4?q=80&w=800",
    }
  ];

  const collections = [
    {
      id: 1,
      title: "Collection Cyberpunk",
      image: "https://images.unsplash.com/photo-1578950435896-d1c1bf932ab5?q=80&w=800",
    },
    {
      id: 2,
      title: "Collection Fantasy",
      image: "https://images.unsplash.com/photo-1578950435895-d1c1bf932ab6?q=80&w=800",
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return { id: item.id, offset: 0 };
        const rect = element.getBoundingClientRect();
        return {
          id: item.id,
          offset: Math.abs(rect.top)
        };
      });

      const closest = sections.reduce((prev, curr) => 
        prev.offset < curr.offset ? prev : curr
      );

      setActiveSection(closest.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center gap-8 px-4">
        <div 
          className="absolute inset-0 bg-[url('https://image.noelshack.com/fichiers/2025/13/5/1743119568-cyberpunk-one.jpg')] bg-cover bg-center"
          style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        ></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 animate-float">
            CryptoWaifus
          </h1>
          <button
            onClick={handleDiscoverClick}
            className="btn-primary text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 text-white hover:text-white/90"
          >
            Découvrir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-pink-500">CryptoWaifus</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-105'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      <Icon size={16} />
                      {item.label}
                    </a>
                  );
                })}
                <button className="relative overflow-hidden px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-500 border border-pink-500/30 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 hover:scale-105 flex items-center gap-1.5">
                  <Wallet2 size={14} />
                  Connecter
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
          <div className="p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center space-y-4 mt-16">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 text-lg ${
                      activeSection === item.id
                        ? 'text-pink-500'
                        : 'text-gray-300 hover:text-pink-500'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </a>
                );
              })}
              <button className="btn-primary flex items-center gap-2 mt-4">
                <Wallet2 size={20} />
                Connecter
              </button>
            </div>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-[url('https://image.noelshack.com/fichiers/2025/13/5/1743119568-cyberpunk-one.jpg')] bg-cover bg-center opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Découvrez l'Art des CryptoWaifus
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez notre collection exclusive d'art digital inspiré de l'anime sur la blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn-primary"
                onClick={() => scrollToSection('marketplace')}
              >
                Explorer la Collection
              </button>
              <button 
                className="btn-secondary"
                onClick={() => scrollToSection('about')}
              >
                En savoir plus
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-20 md:py-24 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              À Propos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-pink-500">Art Unique</h3>
                <p className="text-gray-300">Chaque CryptoWaifu est une œuvre d'art unique</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-pink-500">Blockchain</h3>
                <p className="text-gray-300">Sécurisé sur la blockchain Ethereum</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-pink-500">Communauté</h3>
                <p className="text-gray-300">Rejoignez une communauté passionnée</p>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section id="marketplace" className="py-16 sm:py-20 md:py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Marché
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {marketplaceItems.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-48 sm:h-56 object-cover" />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-pink-500 mb-4">{item.price}</p>
                    <button className="btn-primary w-full">Acheter</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section id="collections" className="py-16 sm:py-20 md:py-24 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Collections
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {collections.map((collection) => (
                <div key={collection.id} className="bg-gray-900 rounded-xl overflow-hidden">
                  <img src={collection.image} alt={collection.title} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">{collection.title}</h3>
                    <button className="btn-secondary w-full">Voir la collection</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DAO Section */}
        <section id="dao" className="py-16 sm:py-20 md:py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              DAO
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-gray-800 p-6 sm:p-8 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Gouvernance</h3>
                <p className="text-gray-300 mb-6">Votez sur l'évolution du projet</p>
                <button className="btn-primary">Participer</button>
              </div>
              <div className="bg-gray-800 p-6 sm:p-8 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Récompenses</h3>
                <p className="text-gray-300 mb-6">Gagnez des récompenses</p>
                <button className="btn-primary">En savoir plus</button>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Section */}
        <section id="guide" className="py-16 sm:py-20 md:py-24 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Créer un Wallet</h3>
                <p className="text-gray-300">Créez et sécurisez votre wallet</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Acheter des NFTs</h3>
                <p className="text-gray-300">Achetez vos premiers CryptoWaifus</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Rejoindre la DAO</h3>
                <p className="text-gray-300">Participez à la gouvernance</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 sm:py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold text-pink-500 mb-4">CryptoWaifus</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                La première collection NFT d'art anime sur la blockchain
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className="text-gray-400 hover:text-pink-500 transition-colors text-sm sm:text-base"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Ressources</h4>
              <ul className="space-y-2">
                {footerLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-gray-400 hover:text-pink-500 transition-colors text-sm sm:text-base"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                Restez informé des dernières actualités
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-gray-800 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                />
                <button className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 transition-all duration-300 hover:scale-105 flex items-center justify-center border border-pink-500/30">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2025 CryptoWaifus. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;