import { searchSearxng, type SearxngSearchResult } from '@/lib/searxng';

const articleWebsites = [
  /* 'yahoo.com',
  'www.exchangewire.com',
  'businessinsider.com', */
  'wired.com',
  'mashable.com',
  'theverge.com',
  'gizmodo.com',
  'cnet.com',
  'venturebeat.com',
];

const topics = ['AI', 'tech']; /* TODO: Add UI to customize this */

export const GET = async (req: Request) => {
  // Temporarily disabled due to persistent 403 errors from news sources.
  return Response.json(
    {
      blogs: [],
    },
    {
      status: 200,
    },
  );
};
