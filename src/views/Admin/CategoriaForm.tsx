import React, { useState } from 'react';

interface CategoriaFormProps {
  initialName?: string;
  initialDescription?: string;
  initialSortOrder?: number;
  initialIsActive?: boolean;
  onSubmit: (data: { name: string; description?: string; sortOrder: number; isActive: boolean }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function CategoriaForm({
  initialName = '',
  initialDescription = '',
  initialSortOrder = 0,
  initialIsActive = true,
  onSubmit,
  onCancel,
  isSubmitting,
}: CategoriaFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [isActive, setIsActive] = useState(initialIsActive);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    try {
      await onSubmit({ name: name.trim(), description: description.trim() || undefined, sortOrder, isActive });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold">{error}</div>
      )}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Nombre *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          placeholder="Ej: Inflables, Utensilios de cocina"
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
      <div className="flex flex-wrap gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Orden</label>
          <input
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
            className="w-24 px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="catActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 rounded border-orange-300 text-orange-500"
          />
          <label htmlFor="catActive" className="font-bold text-gray-700">
            Activa (visible)
          </label>
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
