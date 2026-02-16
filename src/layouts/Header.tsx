import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { fetchProducts } from '../lib/api';

interface CarouselSlide {
  id: string;
  url: string;
  alt: string;
  title?: string;
}

const FLOATING_EMOJIS = ['🎈', '🎉', '🎊', '⭐', '🎪', '🎁', '✨', '🎀'];
const FLOATING_COUNT = 8;

// Carrusel memoizado: solo se re-renderiza cuando cambian las slides
const Carousel = React.memo<{ slides: CarouselSlide[] }>(function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = slides.length;
  const hasSlides = total > 0;

  useEffect(() => {
    if (!hasSlides || !isAutoPlaying) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, total, hasSlides]);

  const handlePrev = useCallback(() => {
    if (!hasSlides) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [hasSlides, total]);

  const handleNext = useCallback(() => {
    if (!hasSlides) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [hasSlides, total]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (!hasSlides) {
    return (
      <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center rounded-2xl">
        <div className="text-6xl">🎪</div>
        <span className="ml-2 text-gray-500 font-semibold">Cargando...</span>
      </div>
    );
  }

  const current = slides[currentIndex];
  const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f59e0b" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" fill="%23fff"%3E🎪%3C/text%3E%3C/svg%3E`;

  return (
    <div
      className="relative w-full h-full min-h-[280px] bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 10 : 0,
            pointerEvents: index === currentIndex ? 'auto' : 'none',
          }}
        >
          <img
            src={slide.url || placeholderSvg}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={index <= 1 ? 'eager' : 'lazy'}
            onError={(e) => {
              (e.target as HTMLImageElement).src = placeholderSvg;
            }}
          />
          <div className="absolute top-3 left-3 bg-red-500/95 text-white font-black px-3 py-1.5 rounded-full text-xs shadow-lg">
            ¡DESTACADO!
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white border border-orange-200"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white border border-orange-200"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-white/90 px-3 py-1.5 rounded-full shadow border border-orange-200">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-200 ${
              i === currentIndex ? 'w-6 h-2 bg-orange-500' : 'w-2 h-2 bg-gray-300 hover:bg-orange-300'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-3 right-3 z-20 bg-white/90 px-2.5 py-1 rounded-full text-xs font-bold text-gray-700 border border-orange-200">
        {currentIndex + 1} / {total}
      </div>
    </div>
  );
});

const Header: React.FC = () => {
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);
  const [floatingStyles, setFloatingStyles] = useState<Array<{ left: number; top: number; size: number; emoji: string; duration: number; delay: number }>>([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const lastMoveRef = useRef(0);

  // Cargar productos para el carrusel (solo los que tengan imagen, máximo 8)
  useEffect(() => {
    fetchProducts({ limit: 20, sortBy: 'createdAt', sortOrder: 'desc' })
      .then((res) => {
        const list = res?.data ?? [];
        const withImage = list.filter((p) => p.images?.[0]?.url);
        const slides: CarouselSlide[] = (withImage.length ? withImage : list)
          .slice(0, 8)
          .map((p) => ({
            id: p.id,
            url: p.images?.[0]?.url ?? '',
            alt: p.images?.[0]?.alt ?? p.title,
            title: p.title,
          }));
        setCarouselSlides(slides);
      })
      .catch(() => setCarouselSlides([]));
  }, []);

  // Elementos flotantes: una sola generación, estilos estáticos
  useEffect(() => {
    setFloatingStyles(
      Array.from({ length: FLOATING_COUNT }, (_, i) => ({
        left: 5 + (i * 12) % 90,
        top: 10 + (i * 17) % 80,
        size: 22 + (i % 3) * 8,
        emoji: FLOATING_EMOJIS[i % FLOATING_EMOJIS.length],
        duration: 12 + (i % 5),
        delay: i * 0.6,
      }))
    );
  }, []);

  // Parallax suavizado: throttle con requestAnimationFrame
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const now = Date.now();
      if (now - lastMoveRef.current < 50) return;
      lastMoveRef.current = now;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 40;
      const y = (e.clientY - rect.top - rect.height / 2) / 40;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setParallax({ x, y });
        rafRef.current = undefined;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const carouselTransform = useMemo(() => {
    if (Math.abs(parallax.x) < 0.5 && Math.abs(parallax.y) < 0.5) return undefined;
    return `perspective(1000px) rotateY(${parallax.x * 0.4}deg) rotateX(${-parallax.y * 0.4}deg)`;
  }, [parallax.x, parallax.y]);

  return (
    <>
      <div
        ref={heroRef}
        className="relative min-h-[80vh] lg:min-h-[85vh] bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 overflow-hidden pt-32 lg:pt-40 pb-8 lg:pb-12"
      >
        {/* Patrón de fondo estático */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #f97316 2px, transparent 2px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Elementos flotantes: clases CSS en lugar de inline animation */}
        {floatingStyles.map((el, i) => (
          <div
            key={i}
            className="absolute pointer-events-none opacity-70"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              fontSize: `${el.size}px`,
              animation: `floatRandom ${el.duration}s ease-in-out infinite`,
              animationDelay: `${el.delay}s`,
            }}
            aria-hidden
          >
            {el.emoji}
          </div>
        ))}

        {/* Orbes de gradiente: menos pesados */}
        <div className="absolute top-10 -left-32 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl pointer-events-none" aria-hidden />
        <div className="absolute bottom-10 -right-32 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" aria-hidden />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-5">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-full shadow-lg border-2 border-white/50"
                style={{ transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)` }}
              >
                <span className="text-lg">⭐</span>
                <span className="text-sm font-black text-white">¡La Fiesta Más Divertida!</span>
                <Sparkles className="w-4 h-4 text-yellow-200 animate-spin-slow" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <div className="mb-2">
                  <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-bg">
                    ¡La Mejor
                  </span>
                </div>
                <div className="mb-2">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Fiesta</span>
                    <span className="absolute -top-4 -right-8 text-4xl lg:text-5xl animate-spin-slow">🎉</span>
                  </span>
                </div>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">Empieza Aquí!</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 rounded-full opacity-60" />
                </span>
              </h1>
            </div>

            <div className="relative" style={{ transform: carouselTransform }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-h-[520px] lg:max-h-[620px] border-2 border-orange-200">
                <Carousel slides={carouselSlides} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
