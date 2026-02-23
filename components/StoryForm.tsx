'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, MapPin } from 'lucide-react';

export default function StoryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    theme: 'biodiversité',
    location_name: 'Antananarivo, Madagascar',
    latitude: -18.8792,
    longitude: 47.5079,
    author: '',
  });

  const themes = [
    'biodiversité',
    'recyclage',
    'eau',
    'forêts',
    'climat',
    'énergie renouvelable',
    'agriculture durable',
    'océans',
  ];

  const handleGenerate = async () => {
    if (!formData.author) {
      alert('Veuillez entrer votre nom d&apos;auteur');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: formData.theme,
          location: formData.location_name,
          language: 'fr',
        }),
      });

      const data = await response.json();
      setFormData({
        ...formData,
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Erreur lors de la génération de l&apos;histoire');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const points = Math.floor(formData.content.length / 10) + 50;
      
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, points }),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, latitude, longitude });
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setFormData({
              ...formData,
              latitude,
              longitude,
              location_name: data.display_name || `${latitude}, ${longitude}`,
            });
          } catch (error) {
            console.error('Error fetching location name:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre nom
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            placeholder="Votre pseudo ou nom"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thème écologique
          </label>
          <select
            value={formData.theme}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu de l&apos;histoire
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.location_name}
              onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              placeholder="Nom du lieu"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark transition-colors flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Ma position
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Titre de l&apos;histoire
            </label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Générer avec IA
                </>
              )}
            </button>
          </div>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            placeholder="Un titre accrocheur pour votre histoire"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenu de l&apos;histoire
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
            placeholder="Racontez votre histoire écologique..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Points estimés : {Math.floor(formData.content.length / 10) + 50}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-eco-green text-green py-3 rounded-lg hover:bg-eco-dark transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enregistrement...
            </>
          ) : (
            'Publier l&apos;histoire'
          )}
        </button>
      </form>
    </div>
  );
}