import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShoppingCart,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProductBySlug, fetchContactLink } from '../../lib/api';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';

function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 'Consultar';
  return new Intl.NumberFormat('es', { style: 'currency', currency: 'USD' }).format(n);
}

const STATUS_LABELS: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADO: 'Ocupado',
  VENDIDO: 'Vendido',
  EN_CAMINO: 'En camino',
};

const STATUS_COLORS: Record<string, string> = {
  DISPONIBLE: 'bg-green-500',
  OCUPADO: 'bg-amber-500',
  VENDIDO: 'bg-gray-500',
  EN_CAMINO: 'bg-blue-500',
};

// ============================================
// 📄 DETALLE DE PRODUCTO (por slug)
// ============================================
const ProductoDetalle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { items, addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const inCart = product ? items.some((i) => i.productId === product.id) : false;
  const [error, setError] = useState<string | null>(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetchProductBySlug(slug)
      .then(setProduct)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false));
  }, [slug]);

  const images = product?.images?.length ? product.images : [];
  const currentImage = images[currentImageIndex];

  const handleContact = async (channel: 'whatsapp' | 'phone') => {
    if (!product?.id) return;
    setContactLoading(true);
    try {
      const { url } = await fetchContactLink(product.id, channel);
      if (url) window.open(url, '_blank');
    } finally {
      setContactLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-yellow-50">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
        <p className="text-xl font-bold text-gray-600">Cargando producto...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 text-center py-16">
          <div className="text-7xl mb-6">😕</div>
          <h1 className="text-3xl font-black text-gray-800 mb-4">
            {error || 'Producto no encontrado'}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/tienda')}
            className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la tienda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-orange-50/50 to-yellow-50/50">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <button
          type="button"
          onClick={() => navigate('/tienda')}
          className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a la tienda
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Galería */}
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-orange-200 bg-white">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-yellow-100 relative">
                {currentImage?.url ? (
                  <img
                    src={currentImage.url}
                    alt={currentImage.alt || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-9xl mb-4">🎪</div>
                    <span className="text-gray-600 font-semibold">Sin imagen</span>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ChevronLeft className="w-6 h-6 text-orange-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentImageIndex((i) => (i + 1) % images.length)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <ChevronRight className="w-6 h-6 text-orange-600" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            i === currentImageIndex
                              ? 'bg-orange-500 w-8'
                              : 'bg-white/80 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {product.category && (
              <div className="text-sm font-bold text-orange-500">{product.category.name}</div>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
              {product.title}
            </h1>
            <div
              className={`inline-block ${STATUS_COLORS[product.status]} text-white font-black px-6 py-2 rounded-full text-sm`}
            >
              {STATUS_LABELS[product.status]}
            </div>
            <div className="text-4xl font-black text-orange-600">
              {formatPrice(product.price)}
              <span className="text-lg font-bold text-gray-500 ml-2">
                / {product.saleType === 'COMPRABLE' ? 'venta' : 'alquiler'}
              </span>
            </div>
            <div
              className="prose prose-lg max-w-none text-gray-700 prose-headings:font-black prose-a:text-orange-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="flex flex-wrap gap-4 pt-4">
              {inCart ? (
                <Link
                  to="/carrito"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <Check className="w-6 h-6" />
                  Ya en el carrito (ver carrito)
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      title: product.title,
                      slug: product.slug,
                      price: product.price,
                      images: product.images,
                    })
                  }
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Añadir al carrito
                </button>
              )}
              <button
                type="button"
                onClick={() => handleContact('whatsapp')}
                disabled={contactLoading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-70"
              >
                {contactLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <MessageCircle className="w-6 h-6" />
                )}
                Contactar por WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleContact('phone')}
                disabled={contactLoading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-4 border-orange-400 text-orange-600 font-black rounded-2xl hover:bg-orange-50 transition-all disabled:opacity-70"
              >
                <Phone className="w-6 h-6" />
                Llamar
              </button>
            </div>
            <div className="pt-6 flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>Entrega e instalación según disponibilidad. Consulta por tu zona.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductoDetalle;
