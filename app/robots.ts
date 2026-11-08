import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Everyone is welcome to read this site, search engines and AI
 * assistants alike. The AI crawlers are listed explicitly so the
 * intent is unambiguous, and llms.txt gives them a plain summary.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'cohere-ai',
  'meta-externalagent',
  'Bytespider',
  'DuckAssistBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: 'https://ymeleka.com/sitemap.xml',
    host: 'https://ymeleka.com',
  };
}
