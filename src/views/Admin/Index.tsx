import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Loader2,
  ArrowLeft,
  User,
  FolderTree,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  fetchProducts,
  deleteProduct,
  fetchCategories,
  deleteCategory,
  fetchPackages,
  deletePackage,
} from '../../lib/api';
import type { Product } from '../../types/product';

type Tab = 'productos' | 'categorias' | 'paquetes';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface PackageItem {
  productId: string;
  product?: { title: string };
  quantity: number;
}
interface PackageRow {
  id: string;
  title: string;
  slug: string;
  specialPrice: string | number;
  isActive: boolean;
  items?: PackageItem[];
}

const STATUS_LABELS: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  OCUPADO: 'Ocupado',
  VENDIDO: 'Vendido',
  EN_CAMINO: 'En camino',
};

export default function AdminIndex() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('productos');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({ limit: 100 });
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPackages = async () => {
    setLoading(true);
    try {
      const data = await fetchPackages();
      setPackages(data);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'productos') loadProducts();
    else if (tab === 'categorias') loadCategories();
    else loadPackages();
  }, [tab]);

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!window.confirm(`¿Eliminar producto "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar categoría "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeletePackage = async (id: string, title: string) => {
    if (!window.confirm(`¿Eliminar paquete "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Ver tienda
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/perfil"
              className="inline-flex items-center gap-2 px-4 py-3 border-2 border-orange-200 rounded-xl font-bold text-orange-600 hover:bg-orange-50"
            >
              <User className="w-5 h-5" />
              Mi perfil
            </Link>
            {tab === 'productos' && (
              <Link
                to="/admin/productos/nuevo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Nuevo producto
              </Link>
            )}
            {tab === 'categorias' && (
              <Link
                to="/admin/categorias/nueva"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Nueva categoría
              </Link>
            )}
            {tab === 'paquetes' && (
              <Link
                to="/admin/paquetes/nuevo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Nuevo paquete
              </Link>
            )}
            <button
              type="button"
              onClick={() => { logout(); navigate('/'); }}
              className="inline-flex items-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:border-orange-400 hover:text-orange-600"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'productos' as Tab, label: 'Productos / Servicios', icon: Package },
            { id: 'categorias' as Tab, label: 'Categorías', icon: FolderTree },
            { id: 'paquetes' as Tab, label: 'Paquetes', icon: Layers },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 ${
                tab === t.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300'
              }`}
            >
              <t.icon className="w-5 h-5" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {tab === 'productos' && (
            <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-orange-500" />
                <h1 className="text-xl font-black text-gray-800">Productos y servicios</h1>
              </div>
              <Link
                to="/admin/productos/nuevo"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Crear producto
              </Link>
            </div>
          )}
          {tab === 'categorias' && (
            <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <FolderTree className="w-6 h-6 text-orange-500" />
                <h1 className="text-xl font-black text-gray-800">Categorías</h1>
              </div>
              <Link
                to="/admin/categorias/nueva"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Crear categoría
              </Link>
            </div>
          )}
          {tab === 'paquetes' && (
            <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Layers className="w-6 h-6 text-orange-500" />
                <h1 className="text-xl font-black text-gray-800">Paquetes</h1>
              </div>
              <Link
                to="/admin/paquetes/nuevo"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Crear paquete
              </Link>
            </div>
          )}

          {tab === 'productos' && (loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              Cargando...
            </div>
          ) : products.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-600 mb-6">Aún no hay productos.</p>
              <Link
                to="/admin/productos/nuevo"
                className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-xl"
              >
                <Plus className="w-5 h-5" />
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-black text-gray-700">Producto</th>
                    <th className="text-left py-4 px-4 font-black text-gray-700">Precio</th>
                    <th className="text-left py-4 px-4 font-black text-gray-700">Estado</th>
                    <th className="text-right py-4 px-4 font-black text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-orange-50/30">
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-800">{p.title}</div>
                        {p.category && (
                          <div className="text-sm text-gray-500">{p.category.name}</div>
                        )}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-700">
                        ${typeof p.price === 'string' ? p.price : Number(p.price)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                          {STATUS_LABELS[p.status] ?? p.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/productos/${p.id}/editar`}
                            className="p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.title)}
                            disabled={deletingId === p.id}
                            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50"
                            title="Eliminar"
                          >
                            {deletingId === p.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {tab === 'categorias' && (loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              Cargando...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-600 mb-6">Aún no hay categorías.</p>
              <Link to="/admin/categorias/nueva" className="inline-block px-5 py-3 bg-orange-500 text-white font-bold rounded-xl">
                <Plus className="w-5 h-5" />
                Crear la primera
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-black text-gray-700">Nombre</th>
                    <th className="text-left py-4 px-4 font-black text-gray-700">Slug</th>
                    <th className="text-left py-4 px-4 font-black text-gray-700">Activa</th>
                    <th className="text-right py-4 px-4 font-black text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-b border-gray-100 hover:bg-orange-50/30">
                      <td className="py-4 px-4 font-bold text-gray-800">{c.name}</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{c.slug}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {c.isActive ? 'Sí' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/categorias/${c.id}/editar`} className="p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button type="button" onClick={() => handleDeleteCategory(c.id, c.name)} disabled={deletingId === c.id} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50" title="Eliminar">
                            {deletingId === c.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {tab === 'paquetes' && (loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              Cargando...
            </div>
          ) : packages.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-gray-600 mb-6">Aún no hay paquetes.</p>
              <Link to="/admin/paquetes/nuevo" className="inline-block px-5 py-3 bg-orange-500 text-white font-bold rounded-xl">
                <Plus className="w-5 h-5" />
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-black text-gray-700">Paquete</th>
                    <th className="text-left py-4 px-4 font-black text-gray-700">Precio especial</th>
                    <th className="text-left py-4 px-4 font-black text-gray-700">Productos</th>
                    <th className="text-right py-4 px-4 font-black text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-orange-50/30">
                      <td className="py-4 px-4 font-bold text-gray-800">{p.title}</td>
                      <td className="py-4 px-4 font-semibold text-gray-700">
                        ${typeof p.specialPrice === 'string' ? p.specialPrice : Number(p.specialPrice)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {p.items?.length ? `${p.items.length} producto(s)` : '—'}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/paquetes/${p.id}/editar`} className="p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200" title="Editar">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button type="button" onClick={() => handleDeletePackage(p.id, p.title)} disabled={deletingId === p.id} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50" title="Eliminar">
                            {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
