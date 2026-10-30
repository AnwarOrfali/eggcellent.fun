import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://eggcellent.fun',
      lastModified: new Date('2026-10-30'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
