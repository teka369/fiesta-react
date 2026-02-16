import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Gift, Search, ChevronLeft, ChevronRight, Loader2, FolderOpen, Package, ShoppingBag } from 'lucide-react';
import { fetchProducts, fetchCategories, fetchPackages } from '../../lib/api';
import type {
  Product,
  ProductsMeta,
  ProductStatus,
  SortByOption,
  SortOrderOption,
  Category,
  Package as PackageType,
} from '../../types/product';
import ProductCard from './components/ProductCard';
import PackageCard from './components/PackageCard';

const STATUS_OPTIONS: { value: '' | ProductStatus; label: string }[] = [
  { value: '', label: 'Todos los estados' },
  { value: 'DISPONIBLE', label: 'Disponible' },
  { value: 'OCUPADO', label: 'Ocupado' },
  { value: 'VENDIDO', label: 'Vendido' },
  { value: 'EN_CAMINO', label: 'En camino' },
];

const SORT_OPTIONS: { sortBy: SortByOption; sortOrder: SortOrderOption; label: string }[] = [
  { sortBy: 'createdAt', sortOrder: 'desc', label: 'Más recientes' },
  { sortBy: 'createdAt', sortOrder: 'asc', label: 'Más antiguos' },
  { sortBy: 'title', sortOrder: 'asc', label: 'Nombre A-Z' },
  { sortBy: 'title', sortOrder: 'desc', label: 'Nombre Z-A' },
  { sortBy: 'price', sortOrder: 'asc', label: 'Precio menor' },
  { sortBy: 'price', sortOrder: 'desc', label: 'Precio mayor' },
];

// ============================================
// 🛒 PÁGINA TIENDA - Listado desde backend
// ============================================
const TiendaIndex: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') ?? '';
  const urlCategoryId = searchParams.get('categoryId') ?? '';

  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<ProductsMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<PackageType[]>([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState(urlSearch);
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [status, setStatus] = useState<'' | ProductStatus>('');
  const [categoryId, setCategoryId] = useState<string>(urlCategoryId);
  const [sortBy, setSortBy] = useState<SortByOption>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrderOption>('desc');

  const productsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setSearch(urlSearch);
    setSearchInput(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setCategoryId(urlCategoryId);
  }, [urlCategoryId]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
    fetchPackages()
      .then((data) => setPackages(Array.isArray(data) ? data : []))
      .catch(() => setPackages([]));
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
        sortBy,
        sortOrder,
      };
      if (status) params.status = status;
      if (categoryId) params.categoryId = categoryId;
      if (search.trim()) params.search = search.trim();
      const res = await fetchProducts(params);
      setProducts(res.data);
      setMeta(res.meta);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar productos');
      setProducts([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, categoryId, search, sortBy, sortOrder]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim();
    setSearch(q);
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (q) next.set('search', q);
    else next.delete('search');
    setSearchParams(next, { replace: true });
  };

  const handleCategoryClick = (catId: string) => {
    setCategoryId(catId);
    setPage(1);
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const activePackages = packages.filter((p) => p.isActive !== false);
  const activeCategories = categories.filter((c) => c.isActive !== false);

  const totalPages = meta?.totalPages ?? 0;

  return (
    <main className="relative min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-16 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #f97316 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white rounded-full font-black shadow-lg border-4 border-white/50">
              <Gift className="w-6 h-6" />
              Rental catalog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Our Store
              </span>
              <br />
              <span className="text-gray-800">Book your next party 🎉</span>
            </h1>
            <p className="text-xl text-gray-600">
              Bounce houses, inflatables, tables, decor and more. Everything you need for an unforgettable event.
            </p>
          </div>
        </div>
      </section>

      {/* Productos y servicios individuales (primero) */}
      <section
        id="productos"
        ref={productsSectionRef}
        className="relative py-12 lg:py-16 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100">
              <ShoppingBag className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800">Products & services</h2>
              <p className="text-gray-600">All items available for rent</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by name or description..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-semibold"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Buscar
              </button>
            </form>
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={categoryId}
                onChange={(e) => {
                  const val = e.target.value;
                  setCategoryId(val);
                  setPage(1);
                  const next = new URLSearchParams(searchParams);
                  if (val) next.set('categoryId', val);
                  else next.delete('categoryId');
                  setSearchParams(next, { replace: true });
                }}
                className="px-4 py-3 rounded-2xl border-2 border-orange-200 font-bold text-gray-700 focus:border-orange-400 outline-none"
              >
                <option value="">All categories</option>
                {activeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as '' | ProductStatus);
                  setPage(1);
                }}
                className="px-4 py-3 rounded-2xl border-2 border-orange-200 font-bold text-gray-700 focus:border-orange-400 outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value || 'all'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sb, so] = e.target.value.split('-') as [SortByOption, SortOrderOption];
                  setSortBy(sb);
                  setSortOrder(so);
                  setPage(1);
                }}
                className="px-4 py-3 rounded-2xl border-2 border-orange-200 font-bold text-gray-700 focus:border-orange-400 outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={`${opt.sortBy}-${opt.sortOrder}`} value={`${opt.sortBy}-${opt.sortOrder}`}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-3xl text-center">
              <p className="text-red-700 font-bold">{error}</p>
              <p className="text-sm text-red-600 mt-2">
                Is the backend running and reachable?
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
              <p className="text-xl font-bold text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl border-2 border-orange-200">
              <div className="text-7xl mb-4">🎪</div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">No products found</h2>
              <p className="text-gray-600">
                {search || status || categoryId
                  ? 'Try different filters, category or search.'
                  : 'There are no products in the store yet.'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && meta && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-3 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-200 font-black text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all inline-flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <span className="px-4 py-2 font-bold text-gray-700">
                    Page {meta.page} of {meta.totalPages} ({meta.total} products)
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                    disabled={page >= meta.totalPages}
                    className="p-3 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-200 font-black text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all inline-flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Categorías (segundo) */}
      {activeCategories.length > 0 && (
        <section className="relative py-12 lg:py-16 bg-gradient-to-b from-orange-50 to-amber-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 rounded-2xl bg-white shadow-lg border-2 border-orange-100">
                <FolderOpen className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800">Browse by category</h2>
                <p className="text-gray-600">Choose a category to see its products</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="text-left p-6 rounded-3xl bg-white shadow-xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl hover:-translate-y-1 transition-all font-bold text-gray-800"
                >
                  {cat.imageUrl ? (
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <img src={cat.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-4 text-4xl">
                      🎪
                    </div>
                  )}
                  <h3 className="text-lg font-black text-gray-800">{cat.name}</h3>
                  {cat.description ? (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
                  ) : null}
                  <span className="inline-block mt-3 text-orange-600 font-bold text-sm">
                    View products →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Paquetes (último) */}
      {activePackages.length > 0 && (
        <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100">
                <Package className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-800">Bundles</h2>
                <p className="text-gray-600">Special-price combos for your event</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {activePackages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default TiendaIndex;
