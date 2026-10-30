'use client';

import React, { useState } from 'react';
import { Recipe, Comment } from '@/types/recipe';
import { X, Clock, ChefHat, Heart, MessageSquare, Send, Check } from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onAddComment: (recipeId: string, author: string, content: string, rating: number) => Promise<Comment | null>;
  onLike: (recipeId: string, e: React.MouseEvent) => void;
}

export function RecipeDetailModal({
  recipe,
  onClose,
  onAddComment,
  onLike
}: RecipeDetailModalProps) {
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  if (!recipe) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(recipe.id, commentName.trim(), commentText.trim(), rating);
      setCommentText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full bg-neutral-900">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-950">
                  {recipe.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
                  🥚 {recipe.eggs_count} {recipe.eggs_count === 1 ? 'Egg' : 'Eggs'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
                  {recipe.difficulty}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {recipe.title}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <span className="text-sm font-medium text-neutral-800">
                  Recipe by <strong className="font-bold">{recipe.author_name}</strong>
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Prep: {recipe.prep_time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Cook: {recipe.cook_time}</span>
                </div>
                <button
                  onClick={(e) => onLike(recipe.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm hover:text-red-500 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="font-bold">{recipe.likes_count}</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-700 leading-relaxed text-base sm:text-lg">
              {recipe.description}
            </p>

            {/* Ingredients Checklist */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <span>🛒</span> Ingredients
                </h3>
                <span className="text-xs text-neutral-500">
                  Tap to check off as you cook
                </span>
              </div>
              <ul className="space-y-2.5">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-neutral-50 border-neutral-200 text-neutral-400 line-through'
                          : 'bg-white border-neutral-200/80 hover:border-amber-300 text-neutral-800'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-neutral-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{ing}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span>🍳</span> Step-by-Step Instructions
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-bold flex items-center justify-center text-sm shadow-sm">
                      {idx + 1}
                    </div>
                    <p className="text-neutral-700 leading-relaxed text-sm sm:text-base pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Comments & Community Feedback */}
            <div className="pt-6 border-t border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                Community Reviews & Tips ({recipe.comments?.length || 0})
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Your Name / Nickname"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    required
                  />
                  
                  {/* Rating Selector */}
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-neutral-300 text-sm">
                    <span className="text-xs text-neutral-500">Egg Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-base transition-transform ${star <= rating ? 'scale-110' : 'opacity-30'}`}
                        >
                          🥚
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <textarea
                    placeholder="Share your culinary tips, substitutions, or feedback..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={2}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white resize-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl font-semibold text-sm flex items-center gap-1.5 transition-all self-end"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-3">
                {recipe.comments && recipe.comments.length > 0 ? (
                  recipe.comments.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-sm"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-neutral-800">{c.author_name}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: c.rating }).map((_, i) => (
                            <span key={i} className="text-xs">🥚</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-600 leading-relaxed">{c.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 italic">
                    No comments yet. Be the first to cook and review this egg recipe!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
