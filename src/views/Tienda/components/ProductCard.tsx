import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import type { Product, ProductStatus } from '../../../types/product';

const STATUS_LABELS: Record<ProductStatus, string> = {
  DISPONIBLE: 'Available',
  OCUPADO: 'Booked',
  VENDIDO: 'Sold',
  EN_CAMINO: 'On the way',
};

const STATUS_COLORS: Record<ProductStatus, string> = {
  DISPONIBLE: 'bg-green-500',
  OCUPADO: 'bg-amber-500',
  VENDIDO: 'bg-gray-500',
  EN_CAMINO: 'bg-blue-500',
};

function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 'Contact us';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addItem } = useCart();
  const inCart = items.some((i) => i.productId === product.id);
  const imageUrl = product.images?.[0]?.url;
  const categoryName = product.category?.name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) return;
    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      images: product.images,
    });
  };

  return (
    <Link
      to={`/tienda/${product.slug}`}
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 block"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-7xl mb-2">🎪</div>
            <div className="text-sm text-gray-500 font-semibold">No image</div>
          </div>
        )}

        <div
          className={`absolute top-4 right-4 ${STATUS_COLORS[product.status]} text-white font-black px-4 py-2 rounded-full text-sm shadow-lg`}
        >
          {STATUS_LABELS[product.status]}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg group-hover:scale-105 transition-transform inline-flex items-center gap-2">
            Ver Detalles
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {categoryName && (
          <div className="text-sm font-bold text-orange-500">{categoryName}</div>
        )}
        <h3 className="text-xl font-black text-gray-800 line-clamp-2">{product.title}</h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-2xl font-black text-orange-600">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-2">
            {inCart ? (
              <Link
                to="/carrito"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition-all flex items-center justify-center shadow font-bold text-xs"
                title="Already in cart"
              >
                <Check className="w-5 h-5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleAddToCart}
                className="p-2.5 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all flex items-center justify-center shadow"
                title="Add to cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            )}
          <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border-4 border-orange-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
};

export default ProductCard;
