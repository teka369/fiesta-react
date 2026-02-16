import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { fetchCategories, uploadProductImage } from '../../lib/api';
import type { Product, ProductSaleType, ProductStatus } from '../../types/product';
import type { Category } from '../../types/product';

const STATUS_OPTIONS = [
  { value: 'DISPONIBLE', label: 'Available' },
  { value: 'OCUPADO', label: 'Booked' },
  { value: 'VENDIDO', label: 'Sold' },
  { value: 'EN_CAMINO', label: 'On the way' },
];

const SALE_TYPE_OPTIONS: { value: ProductSaleType; label: string }[] = [
  { value: 'COMPRABLE', label: 'For sale' },
  { value: 'ALQUILABLE', label: 'For rent' },
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
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

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

  const handleImageFileChange = async (index: number, file: File | undefined | null) => {
    if (!file) return;
    setError('');
    setUploadingIndex(index);
    try {
      const { url } = await uploadProductImage(file);
      setImages((prev) =>
        prev.map((img, i) => (i === index ? { ...img, url } : img)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading image');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const priceNum = parseFloat(price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setError('Price must be a number greater or equal to 0');
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
      setError(err instanceof Error ? err.message : 'Error while saving');
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
        <label className="block text-sm font-bold text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          placeholder="E.g. Giant bounce house"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none resize-y"
          placeholder="Product description (you can use HTML: <p>, <strong>, etc.)"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Price (USD) *</label>
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
        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
        >
          <option value="">No category</option>
          {categories.filter((c) => c.isActive !== false).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
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
          <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
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
            Visible in store
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-bold text-gray-700">Images</label>
          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:underline"
          >
            <Plus className="w-4 h-4" />
            Add image
          </button>
        </div>
        <div className="space-y-3">
          {images.map((img, index) => (
            <div key={index} className="flex gap-2 items-start flex-wrap">
              <input
                type="url"
                value={img.url}
                onChange={(e) => updateImage(index, 'url', e.target.value)}
                placeholder="https://... or upload a file"
                className="flex-1 min-w-[220px] px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm"
              />
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateImage(index, 'alt', e.target.value)}
                placeholder="Alt (optional)"
                className="w-32 px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none text-sm"
              />
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-orange-300 text-xs font-semibold text-orange-700 cursor-pointer bg-orange-50 hover:bg-orange-100">
                <Upload className="w-3 h-3" />
                <span>{uploadingIndex === index ? 'Uploading...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageFileChange(index, e.target.files?.[0])}
                />
              </label>
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
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
