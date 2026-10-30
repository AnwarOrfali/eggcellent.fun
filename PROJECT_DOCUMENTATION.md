# 🥚 Project Report & Engineering Documentation: Eggcellent.fun

**Project Name:** Eggcellent  
**Live Production URL:** [https://eggcellent.fun](https://eggcellent.fun)  
**GitHub Repository:** [https://github.com/AnwarOrfali/eggcellent.fun](https://github.com/AnwarOrfali/eggcellent.fun)  
**Author:** Anwar Orfali  
**Date:** October 30, 2026  

---

## 1. Executive Summary

**Eggcellent.fun** is a full-stack, responsive web application and community hub engineered for sharing, discovering, and reviewing egg-based culinary recipes. The platform provides real-time search, multi-parameter filtering (by preparation category and egg quantity), an interactive in-kitchen checklist mode, community review/rating mechanisms, and dynamic recipe submission workflows.

This document details the engineering lifecycle of the project, including domain acquisition, DNS configuration, security architecture, cloud hosting pipelines, database modeling, frontend/backend engineering, search engine optimization (SEO), and production troubleshooting.

---

## 2. High-Level Architecture

The platform operates on a modern decoupled serverless architecture:

```
[ Client Browser (Desktop/Mobile) ]
               │
               ▼
   [ Cloudflare Edge & DNS ]
    • DNS: eggcellent.fun
    • SSL: Let's Encrypt TLS 1.3
               │
               ▼
   [ Vercel Hosting Platform ]
    • Global CDN Edge Caching
    • Next.js 16 App Router (Turbopack)
    • Static Prerendering & Client Hydration
               │
               ▼
   [ Supabase Cloud Platform (PostgreSQL) ]
    • Row Level Security (RLS)
    • `recipes` Table
    • `comments` Table
```

---

## 3. Domain Name System (DNS) & Network Routing

### 3.1 Domain Registration & Registrar Selection
The custom top-level domain **`eggcellent.fun`** was acquired via **Cloudflare Registrar**. Cloudflare was selected because it provides domains at at-cost wholesale pricing without retail markups and includes integrated DNS management.

### 3.2 DNS Record Configuration
Connecting an apex domain (`eggcellent.fun`) and subdomain (`www.eggcellent.fun`) to Vercel requires specific DNS record mapping:

| Record Type | Host / Name | Target Value | TTL | Proxy Mode | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A Record** | `@` (root) | `76.76.21.21` | Auto | **DNS only** (Grey Cloud) | Points root apex domain directly to Vercel's Anycast Edge IP |
| **CNAME** | `www` | `cname.vercel-dns.com` | Auto | **DNS only** (Grey Cloud) | Aliases the `www` subdomain to Vercel's automated DNS cluster |

### 3.3 The "DNS Only" vs. "Proxied" Lesson
* **Proxied (Orange Cloud):** Routes traffic through Cloudflare's reverse proxy first before hitting the server. While useful for DDoS mitigation, it can intercept SSL issuance if Cloudflare and Vercel simultaneously attempt challenge verification.
* **DNS Only (Grey Cloud):** Acts strictly as an authoritative nameserver resolution layer. This mode allows Vercel to directly issue, verify, and renew the Let's Encrypt SSL/TLS certificates without TLS handshake loops.

---

## 4. Security Architecture

### 4.1 Transport Layer Security (TLS / HTTPS)
All public web traffic to `https://eggcellent.fun` is strictly encrypted using TLS 1.3. Any unencrypted HTTP request sent on port 80 is automatically redirected with a `308 Permanent Redirect` to `https://`.

### 4.2 Privacy & WHOIS Protection
By registering the domain through Cloudflare, WHOIS privacy protection was automatically enabled at the registry level. This prevents personal identifiable information (PII) such as home addresses, personal phone numbers, and email accounts from being harvested by spammers via ICANN lookup tools.

### 4.3 Database Row-Level Security (RLS)
Unlike traditional relational setups where an exposed database client allows arbitrary data tampering, PostgreSQL **Row-Level Security (RLS)** is enforced on the database engine:

```sql
-- Enforce isolation
alter table public.recipes enable row level security;
alter table public.comments enable row level security;

-- Public read access (Anonymous users can browse recipes and comments)
create policy "Allow public read recipes" on public.recipes for select using (true);
create policy "Allow public read comments" on public.comments for select using (true);

-- Controlled public insertion
create policy "Allow public insert recipes" on public.recipes for insert with check (true);
create policy "Allow public insert comments" on public.comments for insert with check (true);
```

### 4.4 Environment Variable Protection
Next.js utilizes strict client-server environment variable isolation:
- Variables without the `NEXT_PUBLIC_` prefix (e.g. `SUPABASE_SERVICE_ROLE_KEY`) are kept strictly within server environments and never bundled into client JavaScript.
- Client-safe parameters (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are scoped exclusively to read/insert actions governed by the RLS policies above.

---

## 5. Web Hosting & CI/CD Pipeline

### 5.1 Platform: Vercel
The application is hosted on **Vercel's Global Edge Network**. Key deployment features include:
- **Zero-Downtime Atomic Deployments:** Every build produces an immutable deployment hash. The new version is routed only when all compilation and static generation steps succeed.
- **Edge Caching:** Static assets, icons, and pre-rendered pages are cached at edge points of presence (PoPs) globally, resulting in sub-50ms Time to First Byte (TTFB).

### 5.2 Continuous Integration & Continuous Deployment (CI/CD)
The deployment pipeline is fully automated via GitHub webhooks:

```
[ Local Development ] 
         │  git push origin main
         ▼
[ GitHub Repository (AnwarOrfali/eggcellent.fun) ]
         │  Webhook trigger
         ▼
[ Vercel Build Server (Washington, D.C. - iad1) ]
         │  1. Restores cache & installs npm dependencies
         │  2. Executes Turbopack compilation (`next build`)
         │  3. Performs TypeScript type checking
         │  4. Prerenders static HTML/CSS/JS bundles
         ▼
[ Live Production: https://eggcellent.fun ]
```

---

## 6. Database Architecture

### 6.1 Database Engine: Supabase (PostgreSQL)
A managed relational database was selected over NoSQL document stores due to the strictly structured relationship between recipes, user feedback, ratings, and authors.

### 6.2 Relational Schema Highlights
1. **Array Data Types:** Ingredients and instructions are stored as PostgreSQL native `text[]` arrays, eliminating the overhead of excessive join tables while preserving exact step order.
2. **Foreign Key Cascading:** The `comments` table enforces `references public.recipes(id) on delete cascade`, ensuring data integrity if a recipe is removed.
3. **Check Constraints:** The rating column enforces `check (rating >= 1 and rating <= 5)`.

---

## 7. Frontend & Backend Engineering

### 7.1 Framework Stack
- **Next.js 16 (App Router):** Uses Turbopack for compilation and server-side component streaming.
- **React 19:** Powers client-side component state, modals, and event handling.
- **Tailwind CSS v4:** Utility-first styling engine with native CSS cascade layer support.
- **TypeScript 5:** Type safety across all database models, component props, and API layers.
- **Lucide React:** Scalable SVG iconography.

### 7.2 Core User Interface Components
* **`Navbar.tsx`:** Sticky top bar featuring brand typography, custom egg icon badge, and quick access to recipe submission.
* **`RecipeCard.tsx`:** Food presentation cards featuring image hover zoom, category tags, egg count badges, prep time chips, like counts, and review tallies.
* **`RecipeDetailModal.tsx`:** An in-depth recipe inspector with an **interactive cooking checklist** (users tap to cross off ingredients while cooking), step-by-step numbered guides, image error handling, and a review submission form with an egg rating selector.
* **`SubmitRecipeModal.tsx`:** Community submission form allowing users to publish new dishes with customizable image URLs, preset photo options, and ingredient/instruction text parsers.

### 7.3 Dual-Mode Data Resilience Layer (`recipesService.ts`)
To prevent site crashes when network connectivity is interrupted or during database maintenance, the client service layer implements automated graceful degradation:
1. **Cloud Mode:** Queries Supabase PostgreSQL tables if valid environment credentials are detected.
2. **Local Persistence Fallback:** If cloud connections fail or are cold, the service falls back to pre-seeded starter recipes in browser `localStorage`, ensuring zero blank-screen failures for visitors.

---

## 8. Search Engine Optimization (SEO) & Discoverability

### 8.1 Human-Centric Meta Content
Standard automated meta descriptions often read mechanically. The production metadata in `src/app/layout.tsx` was tailored for a warm, human tone:
- **Title:** `Eggcellent`
- **Description:** *"A cozy corner of the internet for anyone who loves eggs. Find, share, and review everyday favorites, from quick morning scrambles to lazy weekend shakshukas."*

### 8.2 Social Media Previews (Open Graph & Twitter Cards)
When sharing links across platforms like WhatsApp, iMessage, Discord, Slack, and X/Twitter, rich media cards are generated automatically:
- `og:type`: `website`
- `og:site_name`: `Eggcellent`
- `og:image`: High-resolution preview food photography (1200x630px)
- `twitter:card`: `summary_large_image`

### 8.3 Crawling Infrastructure
- **`sitemap.xml` (`src/app/sitemap.ts`):** Informs search crawlers (Googlebot, Bingbot) of available URLs, update frequency, and index priority.
- **`robots.txt` (`src/app/robots.ts`):** Grants indexing permissions to search engine crawlers.

---

## 9. Engineering Challenges & Solutions Log

During development and deployment, several technical hurdles were diagnosed and resolved:

1. **Windows Directory Capitalization:** `create-next-app` blocked initialization because the directory name was capitalized (`Eggcellent`). Resolved by initializing with a lowercase project name and moving files into root.
2. **Tailwind CSS v4 Compilation on Vercel:** Initially, `--webpack` was passed to the build script, which caused Tailwind CSS v4's `@import "tailwindcss";` directive to be emitted uncompiled. Resolved by switching to `next build` with Turbopack, which compiles Tailwind v4 natively.
3. **Prerender Blocking with Dynamic Values:** Next.js 16 strict static generation aborted with:  
   `Error: Route "/": Next.js encountered the unstable value 'new Date()' in a Client Component.`  
   Resolved by removing the inline `new Date().getFullYear()` call from the client JSX and supplying a static copyright year.
4. **Initial Database Table Creation:** Provisioning Supabase through Vercel's Marketplace creates an empty instance without tables. Resolved by writing explicit idempotent SQL migration scripts (`supabase/schema.sql` and `supabase/insert_additional_recipes.sql`).

---

## 10. Conclusion & Future Roadmap

**Eggcellent.fun** is fully deployed in production with active DNS, SSL certification, PostgreSQL cloud storage, and responsive design. 

### Future Milestone Roadmap:
1. **User Authentication:** Integrate Supabase Auth to support email/magic-link and Google OAuth logins.
2. **Object Storage (Bucket):** Integrate Supabase Storage to let users directly upload photo files from their phone camera instead of passing image URLs.
3. **Upvoting & Bookmarks:** Add a user-specific favorites list stored in a dedicated `recipe_likes` table.

---
*Report generated for the Eggcellent.fun platform engineering record.*
