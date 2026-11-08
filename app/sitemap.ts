import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ymeleka.com/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: ['https://ymeleka.com/me.jpg', 'https://ymeleka.com/og.jpg'],
    },
  ];
}
