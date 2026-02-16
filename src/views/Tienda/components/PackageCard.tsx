import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import type { Package as PackageType } from '../../../types/product';

function formatPrice(price: string | number): string {
  const n = typeof price === 'string' ? parseFloat(price) : price;
  if (Number.isNaN(n)) return 'Consultar';
  return new Intl.NumberFormat('es', { style: 'currency', currency: 'USD' }).format(n);
}

interface PackageCardProps {
  pkg: PackageType;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const itemsCount = pkg.items?.length ?? 0;
  const firstImage = pkg.items?.[0]?.product?.images?.[0]?.url;

  return (
    <Link
      to={`/tienda/paquete/${pkg.id}`}
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 block"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        ) : null}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/40 to-transparent">
          <div className="absolute top-4 left-4 px-4 py-2 bg-amber-500/95 text-white rounded-2xl font-black text-sm shadow-lg flex items-center gap-2">
            <Package className="w-4 h-4" />
            Paquete
          </div>
          <div className="mt-auto p-4 w-full text-white text-center">
            <p className="text-sm font-bold opacity-90">
              {itemsCount} {itemsCount === 1 ? 'producto' : 'productos'}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
          {pkg.title}
        </h3>
        {pkg.description ? (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pkg.description}</p>
        ) : null}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
            {formatPrice(pkg.specialPrice)}
          </span>
          <span className="inline-flex items-center gap-1 text-orange-600 font-bold group-hover:gap-2 transition-all">
            Ver paquete
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
