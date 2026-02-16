import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  CheckCircle, 
  Truck, 
  Shield, 
  Clock, 
  Heart,
  Award,
  MapPin,
  Phone,
  Calendar,
  Sparkles,
  TrendingUp,
  Users,
  Gift,
  Zap,
  ThumbsUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Loader2,
} from 'lucide-react';
import { fetchProducts, fetchCategories, fetchProductById, fetchSettings, type SiteSettings } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import type { Product } from '../../types/product';
import type { Category } from '../../types/product';
import FAQSection from './components/Preguntas-Frecuentes';

const HOME_FEATURED_PRODUCT_KEY = 'fiesta_home_featured_product_id';

// ============================================
// 🎊 SECCIÓN 1: WELCOME
// ============================================
const WelcomeSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full border-2 border-orange-300 shadow-lg animate-bounce-slow">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-700">Welcome to Sunny Party Rentals</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              We Make Every Celebration
            </span>
            <br />
            <span className="text-gray-800">Truly Unforgettable 🎉</span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            With more than <span className="font-bold text-orange-600">12 years</span> creating magical
            moments, we are your best partner for unforgettable parties. From giant inflatables
            to dreamy decor, <span className="font-bold text-orange-600">we have everything you need</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {[
              { icon: Users, number: '5,000+', label: 'Events hosted' },
              { icon: Star, number: '4.9/5', label: 'Average rating' },
              { icon: Award, number: '50+', label: 'Unique rentals' },
              { icon: Heart, number: '100%', label: 'Happiness guaranteed' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-3xl font-black text-orange-600">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🎪 SECCIÓN 2: MEJOR SERVICIO (producto destacado; admin: seleccionar → Aceptar / Reemplazar)
// ============================================
const BestServiceSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const { token } = useAuth();
  const [savedId, setSavedId] = useState<string>(() => localStorage.getItem(HOME_FEATURED_PRODUCT_KEY) ?? '');
  const [pendingId, setPendingId] = useState<string>(savedId);
  const [fetchedFeatured, setFetchedFeatured] = useState<Product | null>(null);
  const [imageError, setImageError] = useState(false);

  const fromList = products.find((p) => p.id === savedId);
  const featuredProduct = fromList ?? fetchedFeatured ?? products[0];
  const hasFeatured = !!savedId;

  // Si hay un producto guardado pero no está en la lista (ej. no viene en los primeros 50), cargarlo por ID
  useEffect(() => {
    if (!savedId) {
      setFetchedFeatured(null);
      return;
    }
    if (products.some((p) => p.id === savedId)) {
      setFetchedFeatured(null);
      return;
    }
    fetchProductById(savedId)
      .then((p: Product) => setFetchedFeatured(p))
      .catch(() => setFetchedFeatured(null));
  }, [savedId, products]);

  const handleAcceptOrReplace = () => {
    if (!pendingId) return;
    localStorage.setItem(HOME_FEATURED_PRODUCT_KEY, pendingId);
    setSavedId(pendingId);
    setImageError(false);
  };

  const rawUrl = featuredProduct?.images?.[0]?.url;
  const imageUrl = typeof rawUrl === 'string' && rawUrl.trim() !== '' ? rawUrl.trim() : undefined;
  const showImage = !!imageUrl && !imageError;

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" aria-hidden />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" aria-hidden />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Fixed-size container so image/placeholder always takes space */}
          <div className="relative w-full aspect-[4/3] max-h-[480px] lg:max-h-[560px] rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 p-2 lg:p-3 rounded-[3rem]">
              <div className="w-full h-full bg-white rounded-[2.5rem] lg:rounded-[2.7rem] overflow-hidden flex items-center justify-center">
                {showImage ? (
                  <img
                    src={imageUrl}
                    alt={featuredProduct?.title ?? ''}
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-orange-100 to-yellow-100 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <span className="text-8xl" role="img" aria-hidden>🏰</span>
                    <span className="text-xl lg:text-2xl font-bold text-gray-700">
                      {featuredProduct?.title ?? 'Featured product'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-red-500 text-white font-black px-4 py-2 lg:px-6 lg:py-3 rounded-full rotate-12 shadow-2xl border-4 border-white text-sm lg:text-base">
              FAN FAVORITE 👑
            </div>
            <div className="absolute -bottom-4 -left-4 text-5xl lg:text-6xl animate-bounce pointer-events-none" style={{ animationDuration: '3s' }} aria-hidden>🎈</div>
            <div className="absolute -top-4 -right-4 text-5xl lg:text-6xl animate-bounce pointer-events-none" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} aria-hidden>⭐</div>
          </div>

          <div className="space-y-6">
            {token && (
              <div className="p-4 bg-white rounded-xl border-2 border-orange-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Admin: featured product for this section
                </label>
                <select
                  value={pendingId}
                  onChange={(e) => setPendingId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 font-semibold mb-3"
                >
                  <option value="">— Select product —</option>
                  {products.filter((p) => p.isActive !== false).map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
                {pendingId && (
                  <button
                    type="button"
                    onClick={handleAcceptOrReplace}
                    className="w-full py-3 rounded-xl font-black text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                  >
                    {hasFeatured ? 'Replace featured product' : 'Set featured product'}
                  </button>
                )}
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              Most requested rental
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                The Best Service
              </span>
              <br />
              <span className="text-gray-800">For Your Party</span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              {featuredProduct?.description ? (
                <>
                  {featuredProduct.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220)}
                  {featuredProduct.description.length > 220 ? '...' : ''}
                </>
              ) : (
                <>
                  Our star rental has brought smiles to thousands of kids.
                  With <span className="font-bold text-orange-600">professional setup</span> and
                  <span className="font-bold text-orange-600"> premium quality</span>.
                </>
              )}
            </p>

            <div className="space-y-4">
              {[
                { icon: Shield, text: 'Safety certified' },
                { icon: Truck, text: 'Free delivery & setup' },
                { icon: Clock, text: 'Available 24/7' },
                { icon: ThumbsUp, text: 'Fun guaranteed' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>

            {featuredProduct && (
              <Link
                to={`/tienda/${featuredProduct.slug}`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-6 h-6" />
                Book now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🌟 SECCIÓN 3: PRODUCTOS DESTACADOS (desde API, rotación)
// ============================================
function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 'Contact us';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

const BADGES = ['Popular', 'New', 'Deal', 'Featured'];
const BADGE_COLORS = ['bg-red-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];

const FeaturedProductsSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const [offset, setOffset] = useState(0);
  const total = products.length;
  const visible = total <= 4 ? products : [...products, ...products].slice(offset, offset + 4);

  useEffect(() => {
    if (total <= 4) return;
    const t = setInterval(() => {
      setOffset((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(t);
  }, [total]);

  if (products.length === 0) return null;

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full border-2 border-orange-200 mb-6">
            <Gift className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-700">Featured Rentals</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Most Loved by Families
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover the rentals our happy families book again and again.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visible.map((product, index) => {
            const imageUrl = product.images?.[0]?.url;
            const badge = BADGES[index % BADGES.length];
            const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];
            return (
              <Link
                key={product.id}
                to={`/tienda/${product.slug}`}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 block"
              >
                <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-7xl mb-4">🎪</div>
                      <div className="text-sm text-gray-500">No image</div>
                    </div>
                  )}
                  <div className={`absolute top-4 right-4 ${badgeColor} text-white font-black px-4 py-2 rounded-full text-sm shadow-lg`}>{badge}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg">
                      View details
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {product.category && <div className="text-sm font-bold text-orange-500">{product.category.name}</div>}
                  <h3 className="text-xl font-black text-gray-800 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-orange-600">{formatPrice(product.price)}</span>
                    <span className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 border-4 border-orange-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/tienda"
            className="inline-block px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            View all rentals →
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 💎 SECCIÓN 4: POR QUÉ ELEGIRNOS
// ============================================
const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: '12+ Years of Experience',
      description: 'Industry-leading team with thousands of successful events.',
      color: 'from-orange-400 to-red-500',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All rentals meet strict safety standards and inspections.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Truck,
      title: 'Free Delivery & Setup',
      description: 'We handle everything so you can relax and enjoy the party.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Fast response times and flexible schedules.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Premium Cleaning',
      description: 'Thorough cleaning and sanitizing between every event.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Heart,
      title: 'Happiness Guaranteed',
      description: 'If you are not thrilled, we will make it right.',
      color: 'from-pink-400 to-red-500',
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23f97316' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-orange-300 shadow-lg mb-6">
            <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-orange-700">Why Choose Sunny Party</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-800">The Best Choice</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              For Your Next Celebration
            </span>
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <reason.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-gray-800 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>

              {/* Decorative element */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${reason.color} opacity-10 rounded-bl-full`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🎯 SECCIÓN 5: EXPLORA NUESTROS ALQUILERES (categorías reales + productos)
// ============================================
const CATEGORY_ICONS: Record<string, string> = {
  trampolines: '🎪',
  inflables: '🏰',
  mesas: '🪑',
  decoracion: '🎨',
  juegos: '🎮',
  sonido: '🎵',
};
const CATEGORY_COLORS = ['from-red-400 to-pink-500', 'from-blue-400 to-cyan-500', 'from-green-400 to-emerald-500', 'from-purple-400 to-pink-500', 'from-orange-400 to-amber-500', 'from-yellow-400 to-orange-500'];

const ExploreRentalsSection: React.FC<{ categories: Category[]; productCountByCategory: Record<string, number>; totalProducts: number }> = ({
  categories,
  productCountByCategory,
  totalProducts,
}) => {
  const activeCategories = categories.filter((c) => c.isActive !== false);

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="text-gray-800">Party Rentals</span>
          </h2>
          <p className="text-xl text-gray-600">
            We offer more than <span className="font-bold text-orange-600">{totalProducts}+ items</span> to
            make your celebration perfect.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {activeCategories.map((category, index) => {
            const count = productCountByCategory[category.id] ?? 0;
            const icon = CATEGORY_ICONS[category.slug?.toLowerCase() ?? ''] ?? '🎪';
            const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
            return (
              <Link
                key={category.id}
                to={`/tienda?categoryId=${category.id}`}
                className="group relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-orange-200 hover:border-orange-400 block"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{icon}</div>
                <h3 className="text-lg font-black text-gray-800 mb-2">{category.name}</h3>
                <div className={`inline-block px-4 py-1 bg-gradient-to-r ${color} text-white font-bold rounded-full text-sm`}>
                  {count} {count === 1 ? 'item' : 'options'}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            View full catalog
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🗺️ SECCIÓN 6: ÁREAS DE ENTREGA
// ============================================
const DeliveryAreasSection: React.FC<{ googleMapsEmbedUrl?: string | null }> = ({ googleMapsEmbedUrl }) => {
  const states = [
    'California', 'Texas', 'Florida', 'New York', 
    'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full font-bold">
              <MapPin className="w-5 h-5" />
              Cobertura Nacional
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="text-gray-800">We Deliver</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Across the United States
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              We bring joy <span className="font-bold text-blue-600">all across the country</span>.
              Check availability in your area and book your free delivery.
            </p>

            {/* States List */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Main states:</h3>
              <div className="grid grid-cols-2 gap-3">
                {states.map((state, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-700">{state}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              <Phone className="w-6 h-6" />
              Check your area
            </Link>
          </div>

          {/* Right - Map */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              {googleMapsEmbedUrl ? (
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business location"
                />
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
                    }}
                  ></div>
                  <div className="text-center space-y-4 relative z-10">
                    <MapPin className="w-20 h-20 text-blue-600 mx-auto" />
                    <div className="text-2xl font-bold text-gray-700">Google Maps</div>
                    <div className="text-gray-500">Add your Google Maps embed URL in the admin settings.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 💬 SECCIÓN 7: TESTIMONIOS
// ============================================
const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      role: 'Madre de 2',
      image: '👩',
      rating: 5,
      text: '¡Increíble servicio! El trampolín fue el centro de atención en la fiesta de cumpleaños de mi hijo. Los niños no pararon de saltar en todo el día. Súper recomendado.',
      date: 'Hace 2 semanas'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      role: 'Organizador de Eventos',
      image: '👨',
      rating: 5,
      text: 'Trabajamos con Sunny Party para eventos corporativos y siempre superan nuestras expectativas. Profesionales, puntuales y con productos de primera calidad.',
      date: 'Hace 1 mes'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      role: 'Maestra de Preescolar',
      image: '👩‍🏫',
      rating: 5,
      text: 'Rentamos varios inflables para el festival de la escuela y fue todo un éxito. La instalación fue rápida y el personal muy amable. ¡Los niños estaban felices!',
      date: 'Hace 3 semanas'
    },
    {
      id: 4,
      name: 'Roberto López',
      role: 'Padre de 3',
      image: '👨‍👧‍👦',
      rating: 5,
      text: 'La mejor decisión que tomamos para la fiesta. El castillo inflable mantuvo entretenidos a 30 niños sin problema. Excelente relación calidad-precio.',
      date: 'Hace 1 semana'
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">💬</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border-2 border-purple-300 mb-6">
            <Heart className="w-5 h-5 text-purple-600 fill-purple-600" />
            <span className="font-bold text-purple-700">Testimonials</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-800">What Families Say</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              About Sunny Party
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-2xl font-bold text-gray-700 ml-3">4.9/5</span>
            <span className="text-gray-500">(500+ reviews)</span>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <Quote className="absolute top-6 left-6 w-12 h-12 text-orange-200" />

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {testimonials[currentIndex].image}
                </div>
                <div>
                  <div className="font-black text-gray-800 text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-500">{testimonials[currentIndex].role}</div>
                  <div className="text-sm text-orange-500 font-semibold">{testimonials[currentIndex].date}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-orange-300"
          >
            <ChevronLeft className="w-7 h-7 text-orange-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-orange-300"
          >
            <ChevronRight className="w-7 h-7 text-orange-600" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-gradient-to-r from-orange-500 to-amber-500'
                    : 'w-3 h-3 bg-gray-300 hover:bg-orange-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    
  );

  
};
 // ============================================
// ❓ SECCIÓN 8: PREGUNTAS FRECUENTES (FAQ)
// ============================================
const QuestionsSection: React.FC = () => {
  return (
    <section id="preguntas" className="py-20 bg-white"> 
      {/* El ID va aquí, en el contenedor principal de la sección */}
      <div className="container mx-auto px-4">
        <FAQSection />
      </div>
    </section>
  );
};
// ============================================
// 🎯 MAIN COMPONENT
// ============================================
const Main: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    Promise.all([
      fetchProducts({ limit: 50, sortBy: 'createdAt', sortOrder: 'desc' }).then((r) => r.data ?? []),
      fetchCategories().then((c) => (Array.isArray(c) ? c : [])),
      fetchSettings().catch(() => ({ googleMapsEmbedUrl: null })),
    ])
      .then(([data, cats, site]) => {
        setProducts(data);
        setCategories(cats);
        setSettings(site);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const productCountByCategory: Record<string, number> = {};
  products.forEach((p) => {
    if (p.categoryId) {
      productCountByCategory[p.categoryId] = (productCountByCategory[p.categoryId] ?? 0) + 1;
    }
  });
  const totalProducts = products.length;

  return (
    <main className="relative">
      <WelcomeSection />
      {loading ? (
        <section className="py-20 flex justify-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        </section>
      ) : (
        <>
          <BestServiceSection products={products} />
          <FeaturedProductsSection products={products} />
        </>
      )}
      <WhyChooseUsSection />
      {!loading && (
        <ExploreRentalsSection
          categories={categories}
          productCountByCategory={productCountByCategory}
          totalProducts={totalProducts}
        />
      )}
      <DeliveryAreasSection googleMapsEmbedUrl={settings?.googleMapsEmbedUrl ?? undefined} />
      <TestimonialsSection />
      <QuestionsSection />
    </main>
  );
};

export default Main;