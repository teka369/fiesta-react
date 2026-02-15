import React, { useState } from 'react';
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
  FileQuestion
} from 'lucide-react';
import FAQSection from './components/Preguntas-Frecuentes';

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
            <span className="font-bold text-orange-700">Bienvenido a Sunny Party Rentals</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Hacemos que Cada Celebración
            </span>
            <br />
            <span className="text-gray-800">Sea Inolvidable 🎉</span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Con más de <span className="font-bold text-orange-600">12 años</span> creando momentos mágicos, 
            somos tu mejor aliado para fiestas infantiles espectaculares. Desde trampolines gigantes 
            hasta decoraciones de ensueño, <span className="font-bold text-orange-600">tenemos todo lo que necesitas</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {[
              { icon: Users, number: '5,000+', label: 'Fiestas Realizadas' },
              { icon: Star, number: '4.9/5', label: 'Rating Promedio' },
              { icon: Award, number: '50+', label: 'Productos Únicos' },
              { icon: Heart, number: '100%', label: 'Satisfacción' },
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
// 🎪 SECCIÓN 2: MEJOR SERVICIO (Inflable Grande)
// ============================================
const BestServiceSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              {/* Border animado */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 p-3 rounded-[3rem]">
                <div className="w-full h-full bg-white rounded-[2.7rem] overflow-hidden">
                  {/* 
                    ============================================
                    📸 IMAGEN DEL INFLABLE GRANDE
                    ============================================
                    Reemplaza con: <img src="/images/inflable-grande.jpg" />
                  */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-9xl">🏰</div>
                      <div className="text-2xl font-bold text-gray-700">Inflable Grande Aquí</div>
                      <div className="text-gray-500">Imagen del mejor servicio</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge flotante */}
              <div className="absolute top-6 right-6 bg-red-500 text-white font-black px-6 py-3 rounded-full rotate-12 shadow-2xl animate-bounce border-4 border-white">
                ¡FAVORITO! 👑
              </div>
            </div>

            {/* Floating emoji */}
            <div className="absolute -bottom-6 -left-6 text-6xl animate-bounce" style={{ animationDuration: '3s' }}>
              🎈
            </div>
            <div className="absolute -top-6 -right-6 text-6xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              ⭐
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              El Más Solicitado
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                El Mejor Servicio
              </span>
              <br />
              <span className="text-gray-800">Para Tu Fiesta</span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Nuestro inflable estrella ha traído sonrisas a miles de niños. 
              Con <span className="font-bold text-orange-600">instalación profesional</span>, 
              supervisión incluida y limpieza premium, es la opción perfecta para 
              hacer de tu evento algo <span className="font-bold text-orange-600">verdaderamente especial</span>.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Shield, text: 'Certificado de Seguridad' },
                { icon: Truck, text: 'Entrega e Instalación Gratis' },
                { icon: Clock, text: 'Disponible 24/7' },
                { icon: ThumbsUp, text: 'Garantía de Diversión' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Reservar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🌟 SECCIÓN 3: PRODUCTOS DESTACADOS
// ============================================
const FeaturedProductsSection: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Trampolín Gigante',
      category: 'Trampolines',
      price: 'Desde $150',
      image: '/images/trampolin.jpg',
      badge: 'Popular',
      badgeColor: 'bg-red-500',
      emoji: '🎪'
    },
    {
      id: 2,
      name: 'Castillo Inflable',
      category: 'Inflables',
      price: 'Desde $200',
      image: '/images/castillo.jpg',
      badge: 'Nuevo',
      badgeColor: 'bg-green-500',
      emoji: '🏰'
    },
    {
      id: 3,
      name: 'Mesas y Sillas Premium',
      category: 'Mobiliario',
      price: 'Desde $80',
      image: '/images/mesas.jpg',
      badge: 'Oferta',
      badgeColor: 'bg-orange-500',
      emoji: '🪑'
    },
    {
      id: 4,
      name: 'Decoración Temática',
      category: 'Decoración',
      price: 'Desde $120',
      image: '/images/decoracion.jpg',
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
      emoji: '🎨'
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full border-2 border-orange-200 mb-6">
            <Gift className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-700">Productos Destacados</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Lo Más Solicitado
            </span>
            <br />
            <span className="text-gray-800">Por Nuestros Clientes</span>
          </h2>

          <p className="text-xl text-gray-600">
            Descubre los favoritos de nuestras familias felices
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
                {/* Placeholder - Reemplazar con imagen real */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">{product.emoji}</div>
                  <div className="text-sm text-gray-500">Imagen del producto</div>
                </div>

                {/* Badge */}
                <div className={`absolute top-4 right-4 ${product.badgeColor} text-white font-black px-4 py-2 rounded-full text-sm shadow-lg`}>
                  {product.badge}
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <button className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
                    Ver Detalles
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="text-sm font-bold text-orange-500">{product.category}</div>
                <h3 className="text-xl font-black text-gray-800">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-orange-600">{product.price}</span>
                  <button className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 border-4 border-orange-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
            Ver Todos Los Productos →
          </button>
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
      title: '12+ Años de Experiencia',
      description: 'Somos líderes en el mercado con miles de fiestas exitosas',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Shield,
      title: '100% Certificado y Seguro',
      description: 'Todos nuestros productos cumplen con estándares de seguridad',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Truck,
      title: 'Entrega e Instalación Gratis',
      description: 'Nos encargamos de todo, tú solo disfruta',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Respuesta rápida en menos de 1 hora',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Limpieza Premium',
      description: 'Desinfección completa entre cada evento',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Garantía de Satisfacción',
      description: 'Si no quedas feliz, te devolvemos tu dinero',
      color: 'from-pink-400 to-red-500'
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
            <span className="font-bold text-orange-700">Por Qué Elegirnos</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-800">Somos La Mejor Opción</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Para Tu Celebración
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
// 🎯 SECCIÓN 5: EXPLORA NUESTROS ALQUILERES
// ============================================
const ExploreRentalsSection: React.FC = () => {
  const categories = [
    { name: 'Trampolines', count: '15+', icon: '🎪', color: 'from-red-400 to-pink-500' },
    { name: 'Inflables', count: '20+', icon: '🏰', color: 'from-blue-400 to-cyan-500' },
    { name: 'Mesas & Sillas', count: '30+', icon: '🪑', color: 'from-green-400 to-emerald-500' },
    { name: 'Decoraciones', count: '25+', icon: '🎨', color: 'from-purple-400 to-pink-500' },
    { name: 'Juegos', count: '18+', icon: '🎮', color: 'from-orange-400 to-amber-500' },
    { name: 'Sonido', count: '10+', icon: '🎵', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Explora Nuestros
            </span>
            <br />
            <span className="text-gray-800">Alquileres</span>
          </h2>

          <p className="text-xl text-gray-600">
            Tenemos más de <span className="font-bold text-orange-600">100+ productos</span> para hacer tu fiesta perfecta
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-orange-200 hover:border-orange-400"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {category.icon}
              </div>

              {/* Name */}
              <h3 className="text-lg font-black text-gray-800 mb-2">{category.name}</h3>

              {/* Count */}
              <div className={`inline-block px-4 py-1 bg-gradient-to-r ${category.color} text-white font-bold rounded-full text-sm`}>
                {category.count} opciones
              </div>

              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-10 py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
            Ver Catálogo Completo
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🗺️ SECCIÓN 6: ÁREAS DE ENTREGA
// ============================================
const DeliveryAreasSection: React.FC = () => {
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
              <span className="text-gray-800">Entregamos En</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Todo Estados Unidos
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Llevamos alegría a <span className="font-bold text-blue-600">todo el país</span>. 
              Consulta disponibilidad en tu área y agenda tu entrega gratuita.
            </p>

            {/* States List */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Estados Principales:</h3>
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

            {/* CTA */}
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
              <Phone className="w-6 h-6" />
              Consulta Tu Área
            </button>
          </div>

          {/* Right - Map Placeholder */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              {/* 
                ============================================
                🗺️ GOOGLE MAPS AQUÍ
                ============================================
                Reemplaza con tu componente de Google Maps
                o iframe de Google Maps embebido
              */}
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center relative">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
                }}></div>
                <div className="text-center space-y-4 relative z-10">
                  <MapPin className="w-20 h-20 text-blue-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-700">Mapa de Google</div>
                  <div className="text-gray-500">Integra tu Google Maps API aquí</div>
                  <div className="text-sm text-gray-400 max-w-xs mx-auto">
                    <code className="bg-white/80 px-3 py-1 rounded">
                      &lt;GoogleMap /&gt;
                    </code>
                  </div>
                </div>
              </div>

              {/* Decorative pins */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500 rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-green-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
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
            <span className="font-bold text-purple-700">Testimonios</span>
          </div>

            

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-800">Lo Que Dicen</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Nuestras Familias Felices
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-2xl font-bold text-gray-700 ml-3">4.9/5</span>
            <span className="text-gray-500">(500+ reseñas)</span>
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
  return (
    <main className="relative">
      <WelcomeSection />
      <BestServiceSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <ExploreRentalsSection />
      <DeliveryAreasSection />
      <TestimonialsSection />
      <QuestionsSection/>
       {/* Esta es la que recibirá el scroll */}
    </main>
  );
};

export default Main;