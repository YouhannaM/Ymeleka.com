import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: 'https://ymeleka.com/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://ymeleka.com/me.jpg', 'https://ymeleka.com/og.jpg'],
    },
    {
      url: 'https://ymeleka.com/places',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
