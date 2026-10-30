'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDetailModal } from '@/components/RecipeDetailModal';
import { SubmitRecipeModal } from '@/components/SubmitRecipeModal';
import { Recipe, Comment } from '@/types/recipe';
import { getRecipes, addRecipe, addComment, toggleLike, INITIAL_RECIPES } from '@/lib/recipesService';
import { Search, Sparkles, Filter, Egg, ChefHat, Heart, Utensils } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Breakfast',
  'Brunch',
  'Quick & Easy',
  'Gourmet',
  'Global Favorites'
];

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [eggFilter, setEggFilter] = useState<string>('all');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (e) {
        console.warn('Failed to load remote recipes', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleLike = async (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikes = await toggleLike(recipeId);
    setRecipes(prev =>
      prev.map(r => (r.id === recipeId ? { ...r, likes_count: newLikes || r.likes_count + 1 } : r))
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe(prev => prev ? { ...prev, likes_count: newLikes || prev.likes_count + 1 } : null);
    }
  };

  const handleAddComment = async (recipeId: string, author: string, content: string, rating: number): Promise<Comment | null> => {
    const comment = await addComment(recipeId, author, content, rating);
    if (comment) {
      setRecipes(prev =>
        prev.map(r => {
          if (r.id === recipeId) {
            return {
              ...r,
              comments: [...(r.comments || []), comment]
            };
          }
          return r;
        })
      );
      if (selectedRecipe && selectedRecipe.id === recipeId) {
        setSelectedRecipe(prev => prev ? {
          ...prev,
          comments: [...(prev.comments || []), comment]
        } : null);
      }
    }
    return comment;
  };

  const handleCreateRecipe = async (newRecipeData: Omit<Recipe, 'id' | 'likes_count' | 'created_at' | 'comments'>) => {
    const created = await addRecipe(newRecipeData);
    setRecipes(prev => [created, ...prev]);
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Category filter
      if (selectedCategory !== 'All' && recipe.category !== selectedCategory) {
        return false;
      }

      // Egg count filter
      if (eggFilter === '1-2' && (recipe.eggs_count < 1 || recipe.eggs_count > 2)) return false;
      if (eggFilter === '3-4' && (recipe.eggs_count < 3 || recipe.eggs_count > 4)) return false;
      if (eggFilter === '5+' && recipe.eggs_count < 5) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesDesc = recipe.description.toLowerCase().includes(query);
        const matchesAuthor = recipe.author_name.toLowerCase().includes(query);
        const matchesIng = recipe.ingredients.some(i => i.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesAuthor || matchesIng;
      }

      return true;
    });
  }, [recipes, selectedCategory, eggFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-amber-50/25 text-neutral-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar onOpenSubmit={() => setIsSubmitOpen(true)} />

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-amber-200/50 bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight max-w-3xl mx-auto">
            The World&apos;s Tastiest{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 underline decoration-amber-400 decoration-wavy decoration-from-font">
              Egg Recipes
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            From silky 8-minute French scrambles to bubbling spicy shakshukas. Discover, share, review, and master the humble egg.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by dish, ingredient (e.g. feta, chives), or chef..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-lg shadow-amber-200/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-neutral-400 hover:text-neutral-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Recipe Explorer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Category & Egg Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-neutral-200/70">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                    : 'bg-white hover:bg-amber-100/60 text-neutral-600 border border-neutral-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Egg Count Filter */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-medium text-neutral-600">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Egg count:</span>
            <select
              value={eggFilter}
              onChange={(e) => setEggFilter(e.target.value)}
              className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Any amount</option>
              <option value="1-2">1 - 2 eggs</option>
              <option value="3-4">3 - 4 eggs</option>
              <option value="5+">5+ eggs</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <div className="my-6 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>Browse community favorites or share your own signature recipe</span>
          </div>

          <span className="font-semibold text-neutral-700">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} available
          </span>
        </div>

        {/* Recipe Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-3xl h-80 border border-neutral-200" />
            ))}
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={handleSelectRecipe}
                onLike={handleLike}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-amber-300 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3 text-amber-700">
              <Egg className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800">No recipes matched your search</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try adjusting your filters or be the first to submit this egg dish!
            </p>
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Submit This Recipe
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200/60 bg-white/70 py-10 text-xs text-neutral-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-neutral-800 text-sm">
            <ChefHat className="w-5 h-5 text-amber-500" />
            <span>Eggcellent.fun</span>
            <span className="font-normal text-neutral-400">| The Community Recipe Platform</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-neutral-600">
            <button onClick={() => setSelectedCategory('All')} className="hover:text-amber-700 transition-colors">
              All Recipes
            </button>
            <button onClick={() => setIsSubmitOpen(true)} className="hover:text-amber-700 transition-colors font-semibold text-amber-600">
              + Submit Recipe
            </button>
            <span>&copy; 2026 Eggcellent.fun</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddComment={handleAddComment}
        onLike={handleLike}
      />

      <SubmitRecipeModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleCreateRecipe}
      />
    </div>
  );
}
