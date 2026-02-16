import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createCategory } from '../../lib/api';
import CategoriaForm from './CategoriaForm';

export default function CategoriaNueva() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { name: string; description?: string; sortOrder: number; isActive: boolean }) => {
    setIsSubmitting(true);
    try {
      await createCategory(data);
      navigate('/admin', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/admin" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-black text-gray-800 mb-8">New category</h1>
        <CategoriaForm onSubmit={handleSubmit} onCancel={() => navigate('/admin')} isSubmitting={isSubmitting} />
      </div>
    </main>
  );
}
