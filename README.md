# 🍳 Eggcellent

> A cozy community platform for egg lovers. Discover, share, and review everyday egg recipes — from quick morning scrambles to weekend shakshukas.

**Live Website:** [https://eggcellent.fun](https://eggcellent.fun)

---

## Features

- **Recipe Explorer:** Filter recipes by meal category (*Breakfast, Brunch, Quick & Easy, Gourmet, Global Favorites*) or by egg count (1–2, 3–4, 5+ eggs).
- **Interactive Cooking Mode:** Tap on any recipe to open step-by-step instructions and check off ingredients as you cook.
- **Community Reviews:** Leave feedback, cooking tips, and rate dishes with a 1–5 egg rating.
- **Recipe Submissions:** Anyone can share their own signature egg recipe with cook times, ingredients, and photos.
- **Zero-Lag Search:** Instant live filtering by title, ingredients, chef handle, or style.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** [Vercel](https://vercel.com/)
- **DNS & Domain:** [Cloudflare](https://www.cloudflare.com/)

---

## Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/AnwarOrfali/eggcellent.fun.git
cd eggcellent.fun
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
*(Note: If no Supabase credentials are provided, the app runs in preview mode with local persistence).*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Database Setup

The database schema and initial starter recipes are located in the `supabase/` folder:

1. **`supabase/schema.sql`**: Run this in your Supabase SQL Editor to create the `recipes` and `comments` tables with public read/insert policies and starter recipes.
2. **`supabase/insert_additional_recipes.sql`**: Optional starter dishes (*Tamagoyaki & Korean Mayak Eggs*).

---

## Project Structure

```
├── public/                 # Static assets (favicons, icons)
├── src/
│   ├── app/                # Next.js App Router (pages, layout, robots, sitemap)
│   ├── components/         # Reusable UI components (Navbar, RecipeCard, Modals)
│   ├── lib/                # Supabase client and recipe service layer
│   └── types/              # TypeScript interfaces for recipes and comments
└── supabase/               # SQL database schema and seeds
```

---

## License

MIT &copy; 2026 [Eggcellent.fun](https://eggcellent.fun)
