import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface FloatingElement {
  id: number;
  left: number;
  top: number;
  animationDuration: number;
  delay: number;
  size: number;
  emoji: string;
  rotation: number;
}

interface CarouselImage {
  id: number;
  url: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
}

// ============================================
// 🎠 CARRUSEL COMPONENT
// ============================================
const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* 
    ============================================
    📸 CONFIGURA TUS IMÁGENES AQUÍ
    ============================================
    Reemplaza las URLs con tus imágenes reales:
    - Pueden ser rutas relativas: "/images/trampolin1.jpg"
    - O URLs absolutas: "https://..."
    - Formatos soportados: .jpg, .png, .webp, .gif
  */
  const images: CarouselImage[] = [
    {
      id: 1,
      url: '/images/trampolin1.jpg', // 👈 REEMPLAZA AQUÍ
      alt: 'Trampolín gigante colorido para niños',
      badge: '¡MÁS POPULAR!',
      badgeColor: 'bg-red-500'
    },
    {
      id: 2,
      url: '/images/inflable-castillo.jpg', // 👈 REEMPLAZA AQUÍ
      alt: 'Castillo inflable para fiestas',
      badge: '¡NUEVO!',
      badgeColor: 'bg-green-500'
    },
    {
      id: 3,
      url: '/images/mesas-sillas.jpg', // 👈 REEMPLAZA AQUÍ
      alt: 'Mesas y sillas decoradas para eventos',
      badge: '-20% OFF',
      badgeColor: 'bg-orange-500'
    },
    {
      id: 4,
      url: '/images/decoracion.jpg', // 👈 REEMPLAZA AQUÍ
      alt: 'Decoración completa de fiesta infantil',
      badge: '✨ PREMIUM',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 5,
      url: '/images/juegos-inflables.jpg', // 👈 REEMPLAZA AQUÍ
      alt: 'Juegos inflables variados',
      badge: 'TOP 3',
      badgeColor: 'bg-yellow-500'
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div 
      className="relative w-full h-full bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 overflow-hidden rounded-[2rem]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Images Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? 'opacity-100 scale-100 z-10'
                : index === (currentIndex - 1 + images.length) % images.length
                ? 'opacity-0 scale-95 -translate-x-full z-0'
                : index === (currentIndex + 1) % images.length
                ? 'opacity-0 scale-95 translate-x-full z-0'
                : 'opacity-0 scale-90 z-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback si la imagen no carga - muestra placeholder colorido
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f59e0b" width="400" height="500"/%3E%3Ctext x="50%25" y="40%25" font-size="100" text-anchor="middle" fill="%23ffffff"%3E🎪%3C/text%3E%3Ctext x="50%25" y="55%25" font-size="24" font-weight="bold" text-anchor="middle" fill="%23ffffff"%3EImagen ' + image.id + '%3C/text%3E%3Ctext x="50%25" y="65%25" font-size="16" text-anchor="middle" fill="%23ffffff"%3EAgrega tu foto aquí%3C/text%3E%3C/svg%3E';
              }}
            />

            {/* Badge del producto - Más pequeño */}
            {image.badge && index === currentIndex && (
              <div className={`absolute top-4 left-4 ${image.badgeColor} text-white font-black px-4 py-2 rounded-full rotate-[-10deg] shadow-2xl text-sm lg:text-base animate-bounce border-3 border-white z-20`}>
                {image.badge}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Más pequeños */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border-2 border-orange-400 group"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors" strokeWidth={3} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border-2 border-orange-400 group"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors" strokeWidth={3} />
      </button>

      {/* Indicators (Dots) - Más compactos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl border-2 border-orange-300">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-orange-300 hover:scale-125'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter - Más pequeño */}
      <div className="absolute bottom-4 right-4 z-30 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl border-2 border-orange-300">
        <span className="text-sm font-black text-gray-700">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Auto-play indicator - Más pequeño */}
      {isAutoPlaying && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-orange-500/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-xl border-2 border-white">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Auto-Play
          </span>
        </div>
      )}
    </div>
  );
};



const Header: React.FC = () => {
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Generate floating party elements
  useEffect(() => {
    const emojis = ['🎈', '🎉', '🎊', '🎁', '⭐', '🌟', '🎀', '🎪', '🎨', '🎭', '🍰', '🍭', '🎵', '💝', '🌈', '✨'];
    const elements: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 10 + Math.random() * 15,
      delay: Math.random() * 5,
      size: 25 + Math.random() * 35,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 360,
    }));
    setFloatingElements(elements);
  }, []);

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 30,
          y: (e.clientY - rect.top - rect.height / 2) / 30,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-[80vh] lg:min-h-[85vh] bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 overflow-hidden pt-32 lg:pt-40 pb-8 lg:pb-12"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #f97316 2px, transparent 2px),
                             radial-gradient(circle, #f59e0b 2px, transparent 2px),
                             radial-gradient(circle, #eab308 2px, transparent 2px)`,
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0, 40px 40px, 20px 60px',
          }}></div>
        </div>

        {/* Floating Party Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute pointer-events-none transition-opacity duration-500"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              fontSize: `${element.size}px`,
              animation: `floatRandom ${element.animationDuration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              transform: `rotate(${element.rotation}deg)`,
              opacity: 0.7,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          >
            {element.emoji}
          </div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-10 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-yellow-300/40 via-orange-400/40 to-amber-400/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-orange-400/40 via-amber-400/40 to-yellow-300/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content - SOLO TÍTULO */}
            <div className="space-y-6">
              
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer border-3 border-white/50"
                style={{
                  transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
                }}
              >
                <div className="flex gap-1">
                  <span className="text-xl animate-bounce">⭐</span>
                  <span className="text-xl animate-bounce" style={{ animationDelay: '0.1s' }}>⭐</span>
                  <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
                </div>
                <span className="text-xs lg:text-sm font-black text-white drop-shadow-lg">
                  ¡La Fiesta Más Divertida de la Ciudad!
                </span>
                <Sparkles className="text-yellow-200 w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              {/* Main Heading - TÍTULO AJUSTADO */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <div className="mb-2">
                  <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
                    ¡La Mejor
                  </span>
                </div>
                <div className="mb-2">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      Fiesta
                    </span>
                    <span className="absolute -top-4 -right-8 lg:-right-10 text-4xl lg:text-5xl animate-spin-slow">🎉</span>
                  </span>
                </div>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Empieza Aquí!
                  </span>
                  {/* Decorative underline */}
                  <div className="absolute -bottom-3 left-0 right-0 h-2.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 rounded-full"></div>
                </span>
              </h1>
            </div>

            {/* Right Content - CARRUSEL MÁS PEQUEÑO */}
            <div className="relative">
              {/* Carousel Container - Más pequeño */}
              <div 
                className="relative rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 aspect-[3/4] max-h-[500px] lg:max-h-[600px]"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
                }}
              >
                {/* Border colorido animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 p-2 rounded-[2rem] animate-gradient">
                  <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
                    
                    {/* CARRUSEL AQUÍ */}
                    <Carousel />

                  </div>
                </div>
              </div>

              {/* Decorative orbs - más pequeños */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-2xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      

      {/* CSS Animations */}
      <style>{`
        @keyframes floatRandom {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-15px, -60px) rotate(180deg);
          }
          75% {
            transform: translate(25px, -30px) rotate(270deg);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes wave-slow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25px);
          }
        }

        @keyframes wave-medium {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-15px);
          }
        }

        @keyframes wave-fast {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-10px);
          }
        }

        @keyframes wave-slower {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-35px);
          }
        }

        .animate-wave-slow {
          animation: wave-slow 15s ease-in-out infinite;
        }

        .animate-wave-medium {
          animation: wave-medium 10s ease-in-out infinite;
        }

        .animate-wave-fast {
          animation: wave-fast 7s ease-in-out infinite;
        }

        .animate-wave-slower {
          animation: wave-slower 20s ease-in-out infinite;
        }

        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 70px -15px rgba(251, 146, 60, 0.5);
        }
      `}</style>
    </>
  );
};

export default Header;