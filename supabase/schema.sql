-- EGGCELLENT DATABASE SCHEMA
-- Copy and paste this directly into your Supabase SQL Editor and click "Run".

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create recipes table
create table if not exists public.recipes (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  category text not null,
  prep_time text not null default '10 mins',
  cook_time text not null default '15 mins',
  difficulty text not null default 'Easy',
  eggs_count integer not null default 2,
  author_name text not null default 'Anonymous Chef',
  image_url text not null,
  ingredients text[] not null default '{}',
  instructions text[] not null default '{}',
  likes_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create comments table
create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  recipe_id uuid references public.recipes(id) on delete cascade not null,
  author_name text not null,
  content text not null,
  rating integer default 5 check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.recipes enable row level security;
alter table public.comments enable row level security;

-- 5. Public read and write policies (Allows everyone to browse, submit recipes, and leave comments)
create policy "Allow public read recipes" on public.recipes
  for select using (true);

create policy "Allow public insert recipes" on public.recipes
  for insert with check (true);

create policy "Allow public read comments" on public.comments
  for select using (true);

create policy "Allow public insert comments" on public.comments
  for insert with check (true);

-- 6. Insert Starter Egg Recipes
insert into public.recipes (
  title, description, category, prep_time, cook_time, difficulty, eggs_count, author_name, image_url, ingredients, instructions
) values 
(
  'North African Shakshuka with Feta & Herbs',
  'Poached eggs nestled in a spiced, simmering bell pepper and tomato sauce, topped with creamy feta and fresh cilantro.',
  'Brunch',
  '10 mins',
  '20 mins',
  'Easy',
  4,
  'Chef Layla',
  'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=80',
  array[
    '4 large pasture-raised eggs',
    '1 can (14 oz) crushed tomatoes',
    '1 red bell pepper, thinly diced',
    '1 yellow onion, finely chopped',
    '3 garlic cloves, minced',
    '1 tsp ground cumin',
    '1 tsp smoked paprika',
    '1/3 cup crumbled feta cheese',
    'Fresh cilantro for garnish'
  ],
  array[
    'Sauté onions and bell peppers in olive oil for 8 mins.',
    'Add minced garlic, cumin, and smoked paprika; cook for 1 min.',
    'Pour in crushed tomatoes and simmer for 10 mins until thickened.',
    'Make 4 wells with a spoon and gently crack eggs into the wells.',
    'Cover and cook on low heat for 5-8 mins until whites are set and yolks are runny.',
    'Garnish with feta and cilantro, and serve hot!'
  ]
),
(
  'Silky French-Style Soft Scrambled Eggs',
  'Velvety, custard-like eggs cooked low and slow with cold butter and fresh chives. The benchmark of egg craftsmanship.',
  'Breakfast',
  '5 mins',
  '8 mins',
  'Medium',
  3,
  'Antoine Delacroix',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
  array[
    '3 large fresh eggs',
    '2 tbsp chilled unsalted butter, cubed',
    '1 tbsp crème fraîche or heavy cream',
    'Flaky sea salt & white pepper',
    '1 tbsp finely chopped chives',
    'Toasted brioche slices'
  ],
  array[
    'Crack eggs directly into a cold saucepan with half the butter.',
    'Stir continuously over medium-low heat with a silicone spatula.',
    'Alternate 20 seconds on heat and 10 seconds off heat while stirring.',
    'When curds are glossy and custardy, remove completely from heat.',
    'Stir in remaining butter and crème fraîche to stop the cooking.',
    'Season with flaky salt and chives over toasted brioche.'
  ]
),
(
  'Japanese Sweet Rolled Omelette (Tamagoyaki)',
  'A beautiful layered rolled omelette subtly sweetened with mirin, dashi, and soy sauce. Perfect for bentos or breakfast.',
  'Global Favorites',
  '8 mins',
  '10 mins',
  'Medium',
  4,
  'Kenji Takahashi',
  'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=1200&q=80',
  array[
    '4 large eggs',
    '3 tbsp dashi stock',
    '1 tbsp mirin',
    '1 tsp sugar',
    '1/2 tsp light soy sauce',
    'Neutral oil for wiping pan'
  ],
  array[
    'Gently whisk eggs with dashi, mirin, sugar, and soy sauce.',
    'Lightly oil pan over medium heat and pour a thin layer of egg.',
    'Roll egg from far side toward you when half set.',
    'Push roll back, pour another layer, and repeat rolling layers.',
    'Shape roll, slice into pieces, and serve warm.'
  ]
),
(
  'Jammy Korean Marinated "Mayak" Eggs',
  'Soft-boiled eggs with a golden custard yolk steeped in an addictive soy, garlic, sesame, and chili marinade.',
  'Quick & Easy',
  '15 mins',
  '6 mins',
  'Easy',
  6,
  'Min-Jun Park',
  'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
  array[
    '6 large eggs',
    '1/2 cup soy sauce',
    '1/2 cup water',
    '1/3 cup honey',
    '3 cloves garlic, minced',
    '2 scallions, sliced',
    '1 tbsp toasted sesame seeds',
    '1 tbsp sesame oil'
  ],
  array[
    'Boil eggs for exactly 6 minutes for ultra-jammy yolks.',
    'Plunge immediately into an ice bath for 10 mins, then peel.',
    'Whisk soy sauce, water, honey, garlic, scallions, sesame seeds and oil.',
    'Submerge peeled eggs in marinade for at least 6 hours.',
    'Serve over hot jasmine rice with spoonfuls of marinade sauce.'
  ]
);
