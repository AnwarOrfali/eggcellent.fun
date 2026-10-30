'use client';

import React, { useState } from 'react';
import { Recipe } from '@/types/recipe';
import { X, Plus, Sparkles, ChefHat } from 'lucide-react';

interface SubmitRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: Omit<Recipe, 'id' | 'likes_count' | 'created_at' | 'comments'>) => Promise<void>;
}

const CATEGORIES: Recipe['category'][] = [
  'Breakfast',
  'Brunch',
  'Quick & Easy',
  'Gourmet',
  'Baking',
  'Global Favorites'
];

const PRESET_IMAGES = [
  { label: 'Sunny Skillet', url: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Soft Scramble', url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Poached Benedict', url: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Rolled Omelette', url: 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Jammy Ramen Egg', url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80' }
];

export function SubmitRecipeModal({ isOpen, onClose, onSubmit }: SubmitRecipeModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState<Recipe['category']>('Breakfast');
  const [prepTime, setPrepTime] = useState('10 mins');
  const [cookTime, setCookTime] = useState('15 mins');
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>('Easy');
  const [eggsCount, setEggsCount] = useState<number>(2);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !ingredientsText || !instructionsText) return;

    const ingredients = ingredientsText
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean);

    const instructions = instructionsText
      .split('\n')
      .map(i => i.trim())
      .filter(Boolean);

    setIsSubmitting(true);
    try {
      await onSubmit({
        title,
        description,
        author_name: authorName.trim() || 'Anonymous Chef',
        category,
        prep_time: prepTime,
        cook_time: cookTime,
        difficulty,
        eggs_count: Number(eggsCount),
        image_url: imageUrl,
        ingredients,
        instructions
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-amber-950 font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Submit an Egg Recipe</h2>
              <p className="text-xs text-neutral-500">Share your favorite egg creation with the world</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Recipe Title *</label>
              <input
                type="text"
                placeholder="e.g. Grandma's Crispy Chili Oil Fried Eggs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Your Name / Handle</label>
              <input
                type="text"
                placeholder="Chef Sunny"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">Short Description *</label>
            <textarea
              placeholder="What makes this egg dish unique or crave-worthy?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
            />
          </div>

          {/* Category, Eggs Count & Difficulty */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Recipe['category'])}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Number of Eggs</label>
              <input
                type="number"
                min={1}
                max={24}
                value={eggsCount}
                onChange={(e) => setEggsCount(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Prep Time</label>
              <input
                type="text"
                placeholder="10 mins"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Cook Time</label>
              <input
                type="text"
                placeholder="15 mins"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Photo URL & Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
              <span>Dish Photo (Image URL)</span>
              <span className="text-[11px] text-neutral-400">Paste any public URL or select preset</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono text-xs"
              required
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setImageUrl(img.url)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    imageUrl === img.url
                      ? 'bg-amber-400 border-amber-500 text-amber-950 font-bold'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients & Instructions (Newline separated) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">
                Ingredients (One per line) *
              </label>
              <textarea
                placeholder="3 large eggs&#10;1 tbsp butter&#10;Pinch of sea salt"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">
                Step-by-Step Instructions (One per line) *
              </label>
              <textarea
                placeholder="Melt butter in skillet on medium.&#10;Crack eggs and season.&#10;Serve immediately."
                value={instructionsText}
                onChange={(e) => setInstructionsText(e.target.value)}
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Recipe'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
