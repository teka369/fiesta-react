import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { fetchCategories } from '../../lib/api';
import type { Product, ProductSaleType, ProductStatus } from '../../types/product';
import type { Category } from '../../types/product';

const STATUS_OPTIONS = [
  { value: 'DISPONIBLE', label: 'Disponible' },
  { value: 'OCUPADO', label: 'Ocupado' },
  { value: 'VENDIDO', label: 'Vendido' },
  { value: 'EN_CAMINO', label: 'En camino' },
];

const SALE_TYPE_OPTIONS: { value: ProductSaleType; label: string }[] = [
  { value: 'COMPRABLE', label: 'Comprable (venta)' },
  { value: 'ALQUILABLE', label: 'Alquilable (alquiler)' },
];

interface ImageRow {
  url: string;
  alt: string;
}

interface ProductoFormProps {
  initialData?: Product | null;
  onSubmit: (data: {
    title: string;
    description: string;
    price: number;
    status: string;
    saleType?: ProductSaleType;
    categoryId?: string;
    isActive: boolean;
    images?: { url: string; alt?: string; sortOrder?: number }[];
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ProductoForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductoFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [price, setPrice] = useState(
    initialData?.price != null ? String(initialData.price) : ''
  );
  const [status, setStatus] = useState<ProductStatus>(initialData?.status ?? 'DISPONIBLE');
  const [saleType, setSaleType] = useState<ProductSaleType>(
    (initialData?.saleType as ProductSaleType) ?? 'ALQUILABLE'
  );
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [images, setImages] = useState<ImageRow[]>(
    initialData?.images?.length
      ? initialData.images.map((i) => ({ url: i.url, alt: i.alt ?? '' }))
      : [{ url: '', alt: '' }]
  );
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  const addImage = () => setImages((prev) => [...prev, { url: '', alt: '' }]);
  const removeImage = (index: number) =>
    setImages((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const updateImage = (index: number, field: 'url' | 'alt', value: string) =>
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const priceNum = parseFloat(price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setError('Precio debe ser un número mayor o igual a 0');
      return;
    }
    const imageList = images
      .filter((i) => i.url.trim())
      .map((i, idx) => ({ url: i.url.trim(), alt: i.alt.trim() || undefined, sortOrder: idx }));
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        price: priceNum,
        status,
        saleType,
        categoryId: categoryId || undefined,
        isActive,
        images: imageList.length ? imageList : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Título *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          placeholder="Ej: Trampolín gigante"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Descripción *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none resize-y"
          placeholder="Descripción del producto (puedes usar HTML: <p>, <strong>, etc.)"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Precio (USD) *</label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
        >
          <option value="">Sin categoría</option>
          {categories.filter((c) => c.isActive !== false).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Tipo</label>
        <div className="flex flex-wrap gap-4">
          {SALE_TYPE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="saleType"
                value={opt.value}
                checked={saleType === opt.value}
                onChange={() => setSaleType(opt.value)}
                className="w-4 h-4 text-orange-500 border-orange-300"
              />
              <span className="font-semibold text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProductStatus)}
            className="px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 rounded border-orange-300 text-orange-500"
          />
          <label htmlFor="isActive" className="font-bold text-gray-700">
            Visible en tienda
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-gray-700">Imágenes (URLs)</label>
          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:underline"
          >
            <Plus className="w-4 h-4" />
            Añadir imagen
          </button>
        </div>
        <div className="space-y-3">
          {images.map((img, index) => (
            <div key={index} className="flex gap-2 items-start">
              <input
                type="url"
                value={img.url}
                onChange={(e) => updateImage(index, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm"
              />
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateImage(index, 'alt', e.target.value)}
                placeholder="Alt (opcional)"
                className="w-32 px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl shadow-lg disabled:opacity-70"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
