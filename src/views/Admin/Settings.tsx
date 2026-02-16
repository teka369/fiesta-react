import React, { useEffect, useState } from 'react';
import { Loader2, Save, MapPin } from 'lucide-react';
import { fetchSettings, updateSettings, type SiteSettings } from '../../lib/api';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings()
      .then((data) => {
        setSettings(data);
        setEmbedUrl(data.googleMapsEmbedUrl ?? '');
      })
      .catch(() => setSettings({ googleMapsEmbedUrl: null }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const cleaned = embedUrl.trim() || null;
      const updated = await updateSettings({ googleMapsEmbedUrl: cleaned });
      setSettings(updated);
      setSuccess('Settings saved successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-black text-gray-800 mb-6">Site Settings</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold text-sm">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Google Maps embed URL
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Paste the <strong>embed</strong> URL from Google Maps (it usually starts with
              <code className="ml-1 bg-gray-100 px-1 rounded">https://www.google.com/maps/embed?...</code>).
            </p>
            <textarea
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none text-sm"
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 bg-orange-50 border border-orange-100 rounded-xl p-3">
            <MapPin className="w-4 h-4 text-orange-500" />
            <p>
              This map will be used on the home page and contact page. You can update it any time
              if your business moves to a new location.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl shadow-lg disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save settings
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Settings;

