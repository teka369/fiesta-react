import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchPackageById } from '../../lib/api';
import { updatePackage } from '../../lib/api';
import PaqueteForm from './PaqueteForm';

export default function PaqueteEditar() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<{
    id: string;
    title: string;
    description?: string | null;
    specialPrice: string | number;
    isActive: boolean;
    items?: { productId: string; quantity: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchPackageById(id)
      .then((data) =>
        setPkg({
          id: data.id,
          title: data.title,
          description: data.description,
          specialPrice: data.specialPrice,
          isActive: data.isActive,
          items: data.items?.map((i: { productId: string; quantity: number }) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        })
      )
      .catch(() => setPkg(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: {
    title: string;
    description?: string;
    specialPrice: number;
    isActive: boolean;
    items?: { productId: string; quantity: number }[];
  }) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updatePackage(id, data);
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

  if (!pkg) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-20">
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-gray-600 mb-4">Bundle not found.</p>
          <Link to="/admin" className="text-orange-600 font-bold hover:underline">
            Back to dashboard
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
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-black text-gray-800 mb-8">Edit bundle</h1>
        <PaqueteForm
          initialTitle={pkg.title}
          initialDescription={pkg.description ?? ''}
          initialSpecialPrice={pkg.specialPrice}
          initialIsActive={pkg.isActive}
          initialItems={pkg.items?.length ? pkg.items : undefined}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin')}
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
