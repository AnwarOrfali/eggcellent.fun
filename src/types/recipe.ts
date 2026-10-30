export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: 'Breakfast' | 'Brunch' | 'Quick & Easy' | 'Gourmet' | 'Baking' | 'Global Favorites';
  prep_time: string;
  cook_time: string;
  difficulty: 'Easy' | 'Medium' | 'Master';
  eggs_count: number;
  author_name: string;
  image_url: string;
  ingredients: string[];
  instructions: string[];
  likes_count: number;
  created_at: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  recipe_id: string;
  author_name: string;
  content: string;
  rating: number; // 1 to 5 eggs
  created_at: string;
}
