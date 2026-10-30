'use client';

import React from 'react';
import { Recipe } from '@/types/recipe';
import { Clock, Heart, MessageSquare, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onLike: (recipeId: string, e: React.MouseEvent) => void;
}

export function RecipeCard({ recipe, onSelect, onLike }: RecipeCardProps) {
  const commentCount = recipe.comments?.length || 0;

  return (
    <article
      onClick={() => onSelect(recipe)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-amber-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-50">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-neutral-800 shadow-sm">
            {recipe.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-950 shadow-sm flex items-center gap-1">
            <span>🥚</span>
            <span>{recipe.eggs_count} {recipe.eggs_count === 1 ? 'egg' : 'eggs'}</span>
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => onLike(recipe.id, e)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-600 hover:text-red-500 hover:bg-white transition-all active:scale-90 shadow-sm"
          title="Save or like recipe"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Cook time badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/90 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{recipe.cook_time}</span>
          <span className="text-white/50">•</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          <p className="mt-2 text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 font-medium text-neutral-700">
            <ChefHat className="w-4 h-4 text-amber-500" />
            <span className="truncate max-w-[120px]">{recipe.author_name}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-neutral-400" />
              <span>{recipe.likes_count}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
              <span>{commentCount}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
