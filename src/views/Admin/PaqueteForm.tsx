import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { fetchProducts } from '../../lib/api';
import type { Product } from '../../types/product';

interface ItemRow {
  productId: string;
  quantity: number;
}

interface PaqueteFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialSpecialPrice?: string | number;
  initialIsActive?: boolean;
  initialItems?: { productId: string; quantity: number }[];
  onSubmit: (data: {
    title: string;
    description?: string;
    specialPrice: number;
    isActive: boolean;
    items?: { productId: string; quantity: number }[];
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function PaqueteForm({
  initialTitle = '',
  initialDescription = '',
  initialSpecialPrice = '',
  initialIsActive = true,
  initialItems = [],
  onSubmit,
  onCancel,
  isSubmitting,
}: PaqueteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [specialPrice, setSpecialPrice] = useState(
    initialSpecialPrice !== '' ? String(initialSpecialPrice) : ''
  );
  const [isActive, setIsActive] = useState(initialIsActive);
  const [items, setItems] = useState<ItemRow[]>(
    initialItems.length ? initialItems : [{ productId: '', quantity: 1 }]
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts({ limit: 100 })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  const addItem = () => setItems((prev) => [...prev, { productId: '', quantity: 1 }]);
  const removeItem = (index: number) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const updateItem = (index: number, field: 'productId' | 'quantity', value: string | number) =>
    setItems((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: field === 'quantity' ? Number(value) || 1 : value } : row
      )
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const priceNum = parseFloat(specialPrice);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setError('Precio debe ser un número mayor o igual a 0');
      return;
    }
    const validItems = items.filter((i) => i.productId && i.quantity > 0);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        specialPrice: priceNum,
        isActive,
        items: validItems.length ? validItems : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold">{error}</div>
      )}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Título del paquete *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          placeholder="Ej: Fiesta infantil completa"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Descripción (opcional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none resize-y"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Precio especial (USD) *</label>
        <input
          type="number"
          step="0.01"
          min={0}
          value={specialPrice}
          onChange={(e) => setSpecialPrice(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="pkgActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="w-5 h-5 rounded border-orange-300 text-orange-500"
        />
        <label htmlFor="pkgActive" className="font-bold text-gray-700">
          Activo (visible)
        </label>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-gray-700">Productos en el paquete</label>
          <button type="button" onClick={addItem} className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Añadir producto
          </button>
        </div>
        <div className="space-y-3">
          {items.map((row, index) => (
            <div key={index} className="flex gap-2 items-center">
              <select
                value={row.productId}
                onChange={(e) => updateItem(index, 'productId', e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none"
              >
                <option value="">Seleccionar producto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={row.quantity}
                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                className="w-20 px-4 py-2 rounded-lg border border-gray-200 focus:border-orange-400 outline-none"
              />
              <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
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
        <button type="button" onClick={onCancel} className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
          Cancelar
        </button>
      </div>
    </form>
  );
}
