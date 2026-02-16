import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Loader2, MessageCircle } from 'lucide-react';
import { fetchPackageById } from '../../lib/api';
import type { Package as PackageType } from '../../types/product';

function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 'Consultar';
  return new Intl.NumberFormat('es', { style: 'currency', currency: 'USD' }).format(n);
}

const PaqueteDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchPackageById(id)
      .then(setPkg)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-yellow-50">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
        <p className="text-xl font-bold text-gray-600">Cargando paquete...</p>
      </main>
    );
  }

  if (error || !pkg) {
    return (
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-xl text-red-600 font-bold mb-6">{error || 'Paquete no encontrado'}</p>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  const items = pkg.items ?? [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="container mx-auto px-4">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la tienda
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-2xl font-bold mb-6">
              <Package className="w-5 h-5" />
              Paquete
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">{pkg.title}</h1>
            {pkg.description ? (
              <p className="text-xl text-gray-600 mb-8">{pkg.description}</p>
            ) : null}

            <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-100 overflow-hidden mb-8">
              <div className="p-8 md:p-10 border-b-2 border-orange-100">
                <h2 className="text-lg font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Incluye
                </h2>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        {item.product ? (
                          <Link
                            to={`/tienda/${item.product.slug}`}
                            className="font-bold text-gray-800 hover:text-orange-600 transition-colors"
                          >
                            {item.product.title}
                          </Link>
                        ) : (
                          <span className="font-bold text-gray-600">Producto</span>
                        )}
                        {item.quantity > 1 && (
                          <span className="ml-2 text-gray-500">× {item.quantity}</span>
                        )}
                      </div>
                      {item.product?.price != null && (
                        <span className="text-gray-500 font-semibold">
                          {formatPrice(item.product.price)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 md:p-10 bg-gradient-to-r from-orange-50 to-amber-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Precio del paquete</p>
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    {formatPrice(pkg.specialPrice)}
                  </p>
                </div>
                <Link
                  to={`/contact?paquete=${encodeURIComponent(pkg.title)}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                  Solicitar información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaqueteDetalle;
