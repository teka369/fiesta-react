import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchCategoryById } from '../../lib/api';
import { updateCategory } from '../../lib/api';
import CategoriaForm from './CategoriaForm';

export default function CategoriaEditar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<{ id: string; name: string; description?: string | null; sortOrder: number; isActive: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchCategoryById(id)
      .then(setCategory)
      .catch(() => setCategory(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: { name: string; description?: string; sortOrder: number; isActive: boolean }) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateCategory(id, data);
      navigate('/admin', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </main>
    );
  }

  if (!category) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-gray-600 mb-4">Categoría no encontrada.</p>
          <Link to="/admin" className="text-orange-600 font-bold hover:underline">
            Volver al panel
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/admin" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold mb-8">
          <ArrowLeft className="w-5 h-5" />
          Volver al panel
        </Link>
        <h1 className="text-2xl font-black text-gray-800 mb-8">Editar categoría</h1>
        <CategoriaForm
          initialName={category.name}
          initialDescription={category.description ?? ''}
          initialSortOrder={category.sortOrder}
          initialIsActive={category.isActive}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
