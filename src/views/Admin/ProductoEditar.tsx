import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchProductById } from '../../lib/api';
import { updateProduct } from '../../lib/api';
import type { Product } from '../../types/product';
import ProductoForm from './ProductoForm';

export default function ProductoEditar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: {
    title: string;
    description: string;
    price: number;
    status: string;
    isActive: boolean;
    images?: { url: string; alt?: string; sortOrder?: number }[];
  }) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateProduct(id, data);
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

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-gray-600 mb-4">Producto no encontrado.</p>
          <Link to="/admin" className="text-orange-600 font-bold hover:underline">
            Volver al listado
          </Link>
        </div>
      </main>
    );
  }

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
        <h1 className="text-2xl font-black text-gray-800 mb-8">Editar producto</h1>
        <ProductoForm
          initialData={product}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
