import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createProduct } from '../../lib/api';
import ProductoForm from './ProductoForm';

export default function ProductoNuevo() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    price: number;
    status: string;
    isActive: boolean;
    images?: { url: string; alt?: string; sortOrder?: number }[];
  }) => {
    setIsSubmitting(true);
    try {
      await createProduct(data);
      navigate('/admin', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al listado
        </Link>
        <h1 className="text-2xl font-black text-gray-800 mb-8">Nuevo producto</h1>
        <ProductoForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
