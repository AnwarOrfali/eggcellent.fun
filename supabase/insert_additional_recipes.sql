-- INSERT THE 2 ADDITIONAL STARTER RECIPES
-- (Japanese Tamagoyaki & Jammy Korean Mayak Eggs)
-- Run this in your Supabase SQL Editor if you already ran the base schema.

insert into public.recipes (
  title, description, category, prep_time, cook_time, difficulty, eggs_count, author_name, image_url, ingredients, instructions
) values 
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
    '3 tbsp dashi stock (or water + dashi powder)',
    '1 tbsp mirin',
    '1 tsp sugar',
    '1/2 tsp light soy sauce',
    'Neutral oil for wiping pan'
  ],
  array[
    'In a bowl, gently whisk eggs with dashi, mirin, sugar, and soy sauce.',
    'Lightly coat a small skillet or tamagoyaki pan with oil over medium heat.',
    'Pour a thin layer of egg mixture to coat the pan.',
    'When the egg is half set, roll it from the far side toward you.',
    'Push the roll back, wipe pan with oiled towel, and pour another thin layer underneath.',
    'Repeat rolling and layering until batter is finished. Slice and serve warm.'
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
    '6 large cold eggs',
    '1/2 cup low-sodium soy sauce',
    '1/2 cup water',
    '1/3 cup honey or corn syrup',
    '3 cloves garlic, finely minced',
    '2 scallions, thinly sliced',
    '1 red chili & 1 green chili, diced',
    '1 tbsp toasted sesame seeds',
    '1 tbsp sesame oil'
  ],
  array[
    'Boil cold eggs in boiling water for exactly 6 minutes for jammy yolks.',
    'Plunge immediately into an ice bath for 10 minutes, then peel carefully.',
    'In a container, whisk soy sauce, water, honey, minced garlic, scallions, chilies, sesame seeds, and sesame oil.',
    'Submerge peeled eggs in the marinade, cover, and chill for at least 6 hours.',
    'Serve cold over a bowl of hot steamed rice with spoonfuls of marinade sauce.'
  ]
);
