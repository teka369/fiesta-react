import React, { useState, useEffect } from 'react';
import { Menu, X, Facebook, Instagram, ShoppingCart, Search, } from 'lucide-react';
// Importamos HashLink para que el scroll funcione entre páginas
import { HashLink as Link } from 'react-router-hash-link';


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CORRECCIÓN DE RUTAS: 
  // Agregamos "/" antes de los "#" para que React sepa volver al Home si estás en "Nosotros"
  const navItems = [
    { name: 'Home', href: '/', emoji: '🏠' },
    { name: 'Alquileres', href: '/#alquileres', emoji: '🎪' },
    { name: 'Sobre Nosotros', href: '/nosotros', emoji: '⭐' }, // Ruta a tu página de Nosotros
    { name: 'Preguntas Frecuentes', href: '/#preguntas', emoji: '❓' },
    { name: 'Contáctenos', href: '/contact', emoji: '📞' },
  ];

  return (
    <header className="fixed w-full z-50 transition-all duration-500">
      {/* Top Bar - Colores del sol */}
      <div 
        className={`bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 transition-all duration-500 ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
        }`}
      >
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-wrap justify-between items-center text-white text-sm">
            <div className="flex items-center gap-4 md:gap-6">
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 hover:scale-110 transition-transform duration-300 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <div className="animate-bounce">📞</div>
                <span className="font-bold">(123) 456-7890</span>
              </a>
              <a 
                href="mailto:info@sunnypartyrentals.com" 
                className="hidden md:flex items-center gap-2 hover:scale-110 transition-transform duration-300 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <span className="animate-pulse">✉️</span>
                <span className="font-semibold">info@sunnyparty.com</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-bold bg-white/30 px-3 py-1 rounded-full">
                ✨ ¡Envío GRATIS! ✨
              </span>
              <a 
                href="#" 
                className="hover:scale-125 hover:rotate-12 transition-all duration-300 bg-white/20 p-2 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                className="hover:scale-125 hover:rotate-12 transition-all duration-300 bg-white/20 p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Colores cálidos del sol */}
      <nav 
        className={`transition-all duration-500 ${
          isScrolled 
            ? 'bg-white shadow-2xl shadow-orange-100' 
            : 'bg-white/98 backdrop-blur-lg'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-28">
            
            {/* Logo - Usamos Link para volver al Home sin recargar */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group relative"
            >
              <div className="absolute -top-2 -left-2 text-yellow-400 animate-ping">✨</div>
              <div className="absolute -bottom-2 -right-2 text-orange-400 animate-ping" style={{animationDelay: '0.5s'}}>✨</div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                <div className={`relative bg-gradient-to-br from-yellow-400 via-orange-400 to-amber-500 rounded-full transition-all duration-500 shadow-2xl group-hover:shadow-3xl group-hover:scale-110 flex items-center justify-center ${
                  isScrolled ? 'w-14 h-14' : 'w-16 h-16 lg:w-20 lg:h-20'
                }`}>
                  <div className="text-white text-3xl lg:text-4xl font-black">
                    <img 
                    src="logo.png" 
                    alt="Sunny Party Rentals Logo" 
                    className={`relative transition-all duration-500 shadow-2xl ${
                      isScrolled ? 'w-14 h-14' : 'w-16 h-16 lg:w-20 lg:h-20'
                    }`}
                  />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className={`font-black bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent transition-all duration-500 ${
                  isScrolled ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-4xl'
                }`}>
                  Sunny Party
                </span>
                <span className={`font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent transition-all duration-500 ${
                  isScrolled ? 'text-xs' : 'text-sm lg:text-base'
                }`}>
                  Rentals LLC ⭐
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Cambiados a HashLink */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item,) => (
                <Link
                  key={item.name}
                  smooth // Habilita el scroll suave
                  to={item.href}
                  onClick={() => setActiveSection(item.href.replace('/#', ''))}
                  className={`relative px-4 xl:px-5 py-3 font-bold rounded-2xl transition-all duration-300 group ${
                    activeSection === item.href.replace('/#', '') 
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white shadow-lg scale-105' 
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                  
                >
                  <span className="flex items-center gap-2">
                    <span className={`text-lg transition-transform duration-300 ${
                      activeSection === item.href.replace('/#', '') ? 'scale-125' : 'group-hover:scale-125'
                    }`}>
                      {item.emoji}
                    </span>
                    <span>{item.name}</span>
                  </span>
                  
                  {activeSection !== item.href.replace('/#', '') && (
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Search + CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              
              <div className={`hidden md:flex items-center transition-all duration-500 ${
                isSearchFocused ? 'w-64' : 'w-48'
              }`}>
                <div className={`relative w-full transition-all duration-300 ${
                  isSearchFocused ? 'scale-105' : ''
                }`}>
                  <input
                    type="text"
                    placeholder="Buscar trampolín, mesa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`w-full pl-11 pr-4 py-3 rounded-full font-semibold transition-all duration-300 outline-none ${
                      isSearchFocused
                        ? 'bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 border-2 border-orange-400 shadow-lg'
                        : 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200'
                    }`}
                  />
                  <Search 
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isSearchFocused ? 'text-orange-600 scale-110' : 'text-orange-400'
                    }`}
                    size={20}
                  />
                </div>
              </div>

              {/* CTA Button - También con HashLink */}
              <Link
                smooth
                to="/#reservar"
                className="hidden sm:flex items-center gap-2 px-5 lg:px-7 py-3 lg:py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-sm lg:text-base rounded-full shadow-2xl shadow-orange-300 hover:shadow-3xl hover:shadow-amber-400 hover:scale-110 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="animate-bounce">🎉</span>
                  ¡Reserva Ya!
                  <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-30"></div>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Buscar..."
                value={searchQuery}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 border-2 border-orange-300 font-semibold outline-none focus:border-orange-500 focus:shadow-lg transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
            </div>
          </div>

          {/* Mobile Menu - Cambiados a HashLink */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              isMobileMenuOpen ? 'max-h-screen opacity-100 mb-6' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-3 py-4">
              {navItems.map((item,) => (
                <Link
                  key={item.name}
                  smooth
                  to={item.href}
                  onClick={() => {
                    setActiveSection(item.href.replace('/#', ''));
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-5 py-4 font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                    activeSection === item.href.replace('/#', '')
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white shadow-xl scale-105'
                      : 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <Link
                smooth
                to="/#reservar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-5 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black rounded-2xl text-center shadow-2xl flex items-center justify-center gap-2"
              >
                <span className="animate-bounce">🎉</span>
                ¡Reserva Ahora!
                <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🎈</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hover\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(251, 146, 60, 0.5);
        }
      `}</style>
    </header>
  );
};

export default Navbar;