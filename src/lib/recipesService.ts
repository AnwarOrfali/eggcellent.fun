import { Recipe, Comment } from '@/types/recipe';
import { supabase, isSupabaseConfigured } from './supabase';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'North African Shakshuka with Feta & Herbs',
    description: 'Poached eggs nestled in a spiced, simmering bell pepper and tomato sauce, topped with creamy feta and fresh cilantro.',
    category: 'Brunch',
    prep_time: '10 mins',
    cook_time: '20 mins',
    difficulty: 'Easy',
    eggs_count: 4,
    author_name: 'Chef Layla',
    image_url: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '4 large pasture-raised eggs',
      '1 can (14 oz) crushed San Marzano tomatoes',
      '1 red bell pepper, thinly diced',
      '1 yellow onion, finely chopped',
      '3 garlic cloves, minced',
      '1 tsp ground cumin',
      '1 tsp smoked paprika',
      '1/2 tsp crushed chili flakes',
      '1/3 cup crumbled feta cheese',
      'Fresh cilantro or parsley for garnish',
      'Warm crusty sourdough bread for dipping'
    ],
    instructions: [
      'Heat 2 tbsp olive oil in a heavy cast-iron skillet over medium heat. Sauté the diced onions and bell peppers for 6-8 minutes until soft and caramelized.',
      'Add minced garlic, cumin, smoked paprika, and chili flakes. Toast spices for 60 seconds until fragrant.',
      'Pour in crushed tomatoes and simmer on low-medium for 10 minutes until sauce thickens. Season generously with salt and black pepper.',
      'Use the back of a spoon to create 4 shallow wells in the sauce. Crack an egg directly into each well.',
      'Cover the pan with a lid and cook on low heat for 5-8 minutes until egg whites are set but yolks remain gloriously runny.',
      'Garnish with crumbled feta cheese and fresh herbs. Serve piping hot with crusty sourdough.'
    ],
    likes_count: 142,
    created_at: '2026-10-15T12:00:00Z',
    comments: [
      {
        id: 'c1',
        recipe_id: '1',
        author_name: 'Gordon R.',
        content: 'The secret is not rushing the sauce reduction. Incredible flavor balance!',
        rating: 5,
        created_at: '2026-10-18T14:30:00Z'
      },
      {
        id: 'c2',
        recipe_id: '1',
        author_name: 'Maya S.',
        content: 'Added a pinch of sumac on top of the feta. My family loved this brunch!',
        rating: 5,
        created_at: '2026-10-22T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Silky French-Style Soft Scrambled Eggs',
    description: 'Velvety, custard-like eggs cooked low and slow with cold butter and fresh chives. The benchmark of egg craftsmanship.',
    category: 'Breakfast',
    prep_time: '5 mins',
    cook_time: '8 mins',
    difficulty: 'Medium',
    eggs_count: 3,
    author_name: 'Antoine Delacroix',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '3 large fresh eggs',
      '2 tbsp unsalted European-style butter, chilled and diced',
      '1 tbsp crème fraîche or heavy cream',
      'Flaky Maldon sea salt & freshly cracked white pepper',
      '1 tbsp finely minced fresh chives',
      'Thick slice of toasted brioche'
    ],
    instructions: [
      'Crack eggs directly into a cold non-stick saucepan. Add half of the cold butter cubes without whisking yet.',
      'Place pan over medium-low heat. Stir continuously in small circles with a heatproof silicone spatula.',
      'As curds start forming, pull pan off the heat for 20 seconds while continuing to stir vigorously, then return to heat. Repeat this dance 3-4 times.',
      'When curds are small, glossy, and custardy (about 7-8 minutes), remove completely from heat.',
      'Stir in the remaining butter, crème fraîche, and snipped chives to halt the cooking.',
      'Spoon over warm toasted brioche and finish with flaky Maldon salt.'
    ],
    likes_count: 219,
    created_at: '2026-10-12T08:00:00Z',
    comments: [
      {
        id: 'c3',
        recipe_id: '2',
        author_name: 'Clara W.',
        content: 'This completely changed how I make eggs. Patience is truly the ingredient here.',
        rating: 5,
        created_at: '2026-10-20T10:00:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Japanese Sweet Rolled Omelette (Tamagoyaki)',
    description: 'A beautiful layered rolled omelette subtly sweetened with mirin, dashi, and soy sauce. Perfect for bentos or breakfast.',
    category: 'Global Favorites',
    prep_time: '8 mins',
    cook_time: '10 mins',
    difficulty: 'Medium',
    eggs_count: 4,
    author_name: 'Kenji Takahashi',
    image_url: 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '4 large eggs',
      '3 tbsp dashi stock (or water + dashi powder)',
      '1 tbsp mirin',
      '1 tsp sugar',
      '1/2 tsp light soy sauce',
      'Neutral oil for wiping pan',
      'Grated daikon radish for serving'
    ],
    instructions: [
      'In a bowl, gently whisk eggs with dashi, mirin, sugar, and soy sauce using chopsticks (avoid creating excessive bubbles).',
      'Lightly coat a rectangular tamagoyaki pan (or small round skillet) with oil using a paper towel over medium heat.',
      'Pour a thin layer of egg mixture to coat the pan. Pop large air bubbles with chopsticks.',
      'When the egg is half set, roll it from the far side toward you using chopsticks or a spatula.',
      'Push the roll back to the far side, wipe the pan with oiled paper towel, and pour another thin layer, lifting the first roll so egg flows underneath.',
      'Repeat rolling and layering until all batter is used. Remove, let rest in a sushi bamboo mat for 3 minutes to shape, then slice.'
    ],
    likes_count: 178,
    created_at: '2026-10-10T14:00:00Z',
    comments: [
      {
        id: 'c4',
        recipe_id: '3',
        author_name: 'Hana K.',
        content: 'The dashi ratio is spot on! Tender and juicy layers.',
        rating: 5,
        created_at: '2026-10-24T11:45:00Z'
      }
    ]
  },
  {
    id: '4',
    title: 'Jammy Korean Marinated "Mayak" Eggs',
    description: 'Soft-boiled eggs with a golden custard yolk steeped in an addictive soy, garlic, sesame, and chili marinade.',
    category: 'Quick & Easy',
    prep_time: '15 mins',
    cook_time: '6 mins',
    difficulty: 'Easy',
    eggs_count: 6,
    author_name: 'Min-Jun Park',
    image_url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    ingredients: [
      '6 large cold eggs',
      '1/2 cup low-sodium soy sauce',
      '1/2 cup water',
      '1/3 cup honey or corn syrup',
      '3 cloves garlic, finely minced',
      '2 scallions, thinly sliced',
      '1 red chili pepper & 1 green chili, diced',
      '1 tbsp toasted sesame seeds',
      '1 tbsp sesame oil'
    ],
    instructions: [
      'Bring a pot of water to a rolling boil with 1 tbsp vinegar and 1 tsp salt. Gently lower cold eggs in.',
      'Boil for exactly 6 minutes for ultra-jammy yolks (or 6.5 minutes for slightly firmer).',
      'Immediately plunge into an ice water bath for 10 minutes, then peel carefully under water.',
      'In a container, whisk soy sauce, water, honey, minced garlic, scallions, chilies, sesame seeds, and sesame oil.',
      'Submerge the peeled eggs in the marinade, cover, and chill in refrigerator for at least 6 hours (or overnight).',
      'Serve cold over a steaming bowl of warm white jasmine rice, drizzled with spoonfuls of marinade.'
    ],
    likes_count: 310,
    created_at: '2026-10-05T18:00:00Z',
    comments: []
  }
];

const LOCAL_STORAGE_KEY = 'eggcellent_recipes_data';

export async function getRecipes(): Promise<Recipe[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          comments (*)
        `)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Recipe[];
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local data', e);
    }
  }

  // Fallback to localStorage on client, or initial recipes
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // invalid json fallback
      }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_RECIPES));
  }

  return INITIAL_RECIPES;
}

export async function addRecipe(newRecipe: Omit<Recipe, 'id' | 'likes_count' | 'created_at' | 'comments'>): Promise<Recipe> {
  const recipeData: Recipe = {
    ...newRecipe,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    likes_count: 0,
    created_at: new Date().toISOString(),
    comments: []
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .insert([{
          title: recipeData.title,
          description: recipeData.description,
          category: recipeData.category,
          prep_time: recipeData.prep_time,
          cook_time: recipeData.cook_time,
          difficulty: recipeData.difficulty,
          eggs_count: recipeData.eggs_count,
          author_name: recipeData.author_name,
          image_url: recipeData.image_url,
          ingredients: recipeData.ingredients,
          instructions: recipeData.instructions
        }])
        .select()
        .single();

      if (!error && data) {
        return { ...data, comments: [] };
      }
    } catch (e) {
      console.warn('Supabase insert failed, falling back to local', e);
    }
  }

  // Update local storage
  if (typeof window !== 'undefined') {
    const current = await getRecipes();
    const updated = [recipeData, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return recipeData;
}

export async function addComment(recipeId: string, author: string, content: string, rating: number): Promise<Comment> {
  const comment: Comment = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    recipe_id: recipeId,
    author_name: author,
    content,
    rating,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          recipe_id: recipeId,
          author_name: author,
          content,
          rating
        }])
        .select()
        .single();

      if (!error && data) {
        return data as Comment;
      }
    } catch (e) {
      console.warn('Supabase comment insert failed, falling back to local', e);
    }
  }

  if (typeof window !== 'undefined') {
    const current = await getRecipes();
    const recipeIndex = current.findIndex(r => r.id === recipeId);
    if (recipeIndex !== -1) {
      const recipe = current[recipeIndex];
      recipe.comments = [...(recipe.comments || []), comment];
      current[recipeIndex] = recipe;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    }
  }

  return comment;
}

export async function toggleLike(recipeId: string): Promise<number> {
  let count = 0;
  if (typeof window !== 'undefined') {
    const current = await getRecipes();
    const recipeIndex = current.findIndex(r => r.id === recipeId);
    if (recipeIndex !== -1) {
      current[recipeIndex].likes_count += 1;
      count = current[recipeIndex].likes_count;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    }
  }
  return count;
}
