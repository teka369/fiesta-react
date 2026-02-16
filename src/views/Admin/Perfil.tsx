import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fetchProfile, updateProfile } from '../../lib/api';

export default function Perfil() {
  const { updateUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setName(data.name ?? '');
        setEmail(data.email ?? '');
      })
      .catch(() => setError('Could not load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword && newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }
    setSaving(true);
    try {
      const body: { name?: string; email?: string; currentPassword?: string; newPassword?: string } = {
        name: name.trim() || undefined,
        email: email.trim(),
      };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }
      const updated = await updateProfile(body);
      updateUser(updated);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-xl">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-black text-gray-800 mb-6">My profile</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-5">
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
            <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-bold text-gray-700 mb-3">Change password (optional)</p>
            <div className="space-y-3">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-sm"
                  placeholder="Current password (only if you want to change it)"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-sm"
                  placeholder="New password (min. 6 characters)"
                />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-sm"
                placeholder="Repeat new password"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-xl shadow-lg disabled:opacity-70"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <Link
              to="/admin"
              className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 inline-flex items-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
