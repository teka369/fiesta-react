import React, { useEffect, useState } from 'react';
import { Loader2, Save, MapPin, Phone } from 'lucide-react';
import { fetchSettings, updateSettings, type SiteSettings } from '../../lib/api';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings()
      .then((data) => {
        setSettings(data);
        setEmbedUrl(data.googleMapsEmbedUrl ?? '');
        setContactPhone(data.contactPhone ?? '');
      })
      .catch(() => setSettings({ googleMapsEmbedUrl: null, contactPhone: null }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const cleaned = embedUrl.trim() || null;
      const cleanedPhone = contactPhone.trim() || null;
      const updated = await updateSettings({ 
        googleMapsEmbedUrl: cleaned,
        contactPhone: cleanedPhone,
      });
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

          {/* Contact Phone */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              <Phone className="w-4 h-4 inline mr-1" />
              WhatsApp / Phone Number
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Used for all WhatsApp and phone buttons on the website. Include country code (e.g., +1234567890).
            </p>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none text-sm"
              placeholder="+1234567890"
            />
          </div>

          {/* Google Maps */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
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
