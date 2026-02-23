import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Gift, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { to: '/', label: 'Main' },
    { to: '/tienda', label: 'Shop' },
    { to: '/nosotros', label: 'About us' },
    { to: '/#preguntas', label: 'Frecuently questions' },
    { to: '/contact', label: 'Contact' },
    { to: '/carrito', label: 'Car' },
  ];

  return (
    <footer className="bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 border-t-2 border-orange-200">
      <div className="container mx-auto px-4 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-black bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Sunny Party
              </span>
              <span className="text-orange-600 font-bold">Rentals</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 mb-6 max-w-xs">
              We make every celebration unforgettable. Bounce houses, inflatables, furniture and decor for your party.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-orange-200 shadow-md">
              <Gift className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-700">Rentals & sales</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-orange-700 font-black text-sm uppercase tracking-wider mb-4">Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-700 hover:text-orange-600 transition-colors inline-flex items-center gap-2 group text-sm font-semibold"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-orange-700 font-black text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors text-sm font-medium"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border-2 border-orange-200 shadow">
                    <Phone className="w-4 h-4 text-orange-500" />
                  </span>
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sunnyparty.com"
                  className="inline-flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors text-sm font-medium"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border-2 border-orange-200 shadow">
                    <Mail className="w-4 h-4 text-orange-500" />
                  </span>
                  info@sunnyparty.com
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span>Check coverage and delivery areas</span>
              </li>
            </ul>
          </div>

          {/* Social & legal */}
          <div>
            <h3 className="text-orange-700 font-black text-sm uppercase tracking-wider mb-4">Follow us</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 rounded-xl bg-white border-2 border-orange-200 shadow flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-white border-2 border-orange-200 shadow flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <Link
              to="/login"
              className="text-xs text-gray-500 hover:text-orange-600 transition-colors font-medium"
              title="Acceso administrador"
            >
              Admin acces
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 font-semibold">
            © {currentYear} Sunny Party Rentals. Made by <a href="https://luxentium.top">Luxentium</a>.
          </p>
          <p className="text-xs text-gray-500 font-medium">
            Made with 🎉 for unforgettable partys
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
