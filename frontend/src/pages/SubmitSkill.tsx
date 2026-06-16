import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCategories } from '../hooks/useSkills';
import api from '../lib/api';
import { COUNTRIES, LANGUAGES, DIFFICULTY_LEVELS } from '../lib/constants';

export default function SubmitSkill() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    category_id: '',
    country: '',
    language: 'en',
    difficulty: 'beginner',
    learning_time: '',
    content_markdown: '',
    video_url: '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/skills', form);
      navigate(`/skills/${data.slug}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit skill');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">{t('submit.title')}</h1>
      <p className="text-muted-foreground mb-8">{t('submit.description')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateForm('title', e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Batik Tulis — Traditional Hand-Drawn Wax-Resist Dyeing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="A brief overview of this skill..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={form.category_id}
              onChange={(e) => updateForm('category_id', e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select category</option>
              {categories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Difficulty *</label>
            <select
              value={form.difficulty}
              onChange={(e) => updateForm('difficulty', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {DIFFICULTY_LEVELS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              value={form.country}
              onChange={(e) => updateForm('country', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Language *</label>
            <select
              value={form.language}
              onChange={(e) => updateForm('language', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Learning Time</label>
          <input
            type="text"
            value={form.learning_time}
            onChange={(e) => updateForm('learning_time', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 2-3 weeks"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content (Markdown) *</label>
          <textarea
            value={form.content_markdown}
            onChange={(e) => updateForm('content_markdown', e.target.value)}
            required
            rows={15}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            placeholder="## Overview&#10;&#10;Write your step-by-step instructions here using Markdown..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Video URL</label>
          <input
            type="url"
            value={form.video_url}
            onChange={(e) => updateForm('video_url', e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 font-medium"
        >
          {loading ? 'Submitting...' : 'Submit Skill'}
        </button>
      </form>
    </div>
  );
}