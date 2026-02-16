import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 'Contact us';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

const CarritoIndex: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems } = useCart();

  const subtotal = items.reduce((sum, i) => {
    const p = typeof i.product.price === 'string' ? parseFloat(i.product.price) : i.product.price;
    return sum + (Number.isNaN(p) ? 0 : p * i.quantity);
  }, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue shopping
        </Link>

        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 rounded-2xl bg-white shadow-lg border-2 border-orange-100">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800">Shopping cart</h1>
            <p className="text-gray-600">
              {totalItems === 0
                ? 'Your cart is empty'
                : `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-100 p-16 text-center">
            <div className="text-7xl mb-4">🛒</div>
            <h2 className="text-xl font-black text-gray-800 mb-2">No items in your cart</h2>
            <p className="text-gray-600 mb-6">Add items from the store to reserve or purchase.</p>
            <Link
              to="/tienda"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl"
            >
              Go to store
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const imageUrl = item.product.images?.[0]?.url;
                const price = typeof item.product.price === 'string'
                  ? parseFloat(item.product.price)
                  : item.product.price;
                const lineTotal = Number.isNaN(price) ? 0 : price * item.quantity;
                return (
                  <div
                    key={item.productId}
                    className="bg-white rounded-2xl shadow-lg border-2 border-orange-100 p-4 flex gap-4"
                  >
                    <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                      {imageUrl ? (
                        <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🎪</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/tienda/${item.product.slug}`}
                        className="font-bold text-gray-800 hover:text-orange-600 line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-orange-600 font-bold mt-1">
                        {formatPrice(item.product.price)} ea.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-xl border-2 border-orange-200 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 hover:bg-orange-50 text-orange-600"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 font-bold text-gray-700 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 hover:bg-orange-50 text-orange-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-black text-gray-800">
                      {formatPrice(lineTotal)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-6 sticky top-28">
                <h2 className="text-xl font-black text-gray-800 mb-4">Summary</h2>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="border-t-2 border-orange-100 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-black text-gray-800 mb-6">
                    <span>Total</span>
                    <span className="text-orange-600">{formatPrice(subtotal)}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="block w-full text-center py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl"
                  >
                    Request / Reserve
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CarritoIndex;
