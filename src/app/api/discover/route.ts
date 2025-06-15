import { searchSearxng, type SearxngSearchResult } from '@/lib/searxng';

const articleWebsites = [
  'yahoo.com',
  'www.exchangewire.com',
  'businessinsider.com',
  /* 'wired.com',
  'mashable.com',
  'theverge.com',
  'gizmodo.com',
  'cnet.com',
  'venturebeat.com', */
];

const topics = ['AI', 'tech']; /* TODO: Add UI to customize this */

export const GET = async (req: Request) => {
  try {
    const params = new URL(req.url).searchParams;
    const mode: 'normal' | 'preview' =
      (params.get('mode') as 'normal' | 'preview') || 'normal';

    let data: SearxngSearchResult[] = [];

    if (mode === 'normal') {
      const allResults = [];
      for (const site of articleWebsites) {
        for (const topic of topics) {
          try {
            const searchResults = await searchSearxng(`site:${site} ${topic}`, {
              engines: ['bing news'],
              pageno: 1,
            });
            allResults.push(...searchResults.results);
          } catch (err) {
            console.error(
              `Failed to fetch discover articles for site:${site}, topic:${topic}`,
              err,
            );
          }
        }
      }
      data = allResults.sort(() => Math.random() - 0.5);
    } else {
      let attempts = 0;
      while (attempts < 5 && data.length === 0) {
        const site =
          articleWebsites[Math.floor(Math.random() * articleWebsites.length)];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        try {
          const searchResults = await searchSearxng(`site:${site} ${topic}`, {
            engines: ['bing news'],
            pageno: 1,
          });
          const articlesWithThumbnails = searchResults.results.filter(
            (a) => a.thumbnail,
          );
          if (articlesWithThumbnails.length > 0) {
            data = articlesWithThumbnails;
          }
        } catch (err) {
          console.error(
            `Failed to fetch preview article for site:${site}, topic:${topic}`,
            err,
          );
        }
        attempts++;
      }
    }

    return Response.json(
      {
        blogs: data,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(`An error occurred in discover route: ${err}`);
    return Response.json(
      {
        message: 'An error has occurred',
      },
      {
        status: 500,
      },
    );
  }
};
