import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n';

interface Article {
  title: string;
  content: string;
  url: string;
  thumbnail: string;
}

const NewsArticleWidget = () => {
  const { t } = useTranslation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/discover?mode=preview')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        const articles = (data.blogs || []).filter((a: Article) => a.thumbnail);
        if (articles.length === 0) {
          throw new Error('No articles with thumbnails found');
        }
        setArticle(articles[Math.floor(Math.random() * articles.length)]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load news article:', err);
        toast.error(t('Could not load news.'));
        setError(true);
        setLoading(false);
      });
  }, [t]);

  return (
    <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl border border-light-200 dark:border-dark-200 shadow-sm flex flex-row items-center w-full h-24 min-h-[96px] max-h-[96px] px-3 py-2 gap-3 overflow-hidden">
      {loading ? (
        <>
          <div className="animate-pulse flex flex-row items-center w-full h-full">
            <div className="rounded-lg w-16 min-w-16 max-w-16 h-16 min-h-16 max-h-16 bg-light-200 dark:bg-dark-200 mr-3" />
            <div className="flex flex-col justify-center flex-1 h-full w-0 gap-2">
              <div className="h-4 w-3/4 rounded bg-light-200 dark:bg-dark-200" />
              <div className="h-3 w-1/2 rounded bg-light-200 dark:bg-dark-200" />
            </div>
          </div>
        </>
      ) : error ? (
        <div className="w-full text-xs text-red-500 dark:text-red-400">
          {t('Could not load news.')}
        </div>
      ) : article ? (
        <a
          href={`/?q=Summary: ${article.url}`}
          className="flex flex-row items-center w-full h-full group"
        >
          <img
            className="object-cover rounded-lg w-16 min-w-16 max-w-16 h-16 min-h-16 max-h-16 border border-light-200 dark:border-dark-200 bg-light-200 dark:bg-dark-200 group-hover:opacity-90 transition"
            src={
              new URL(article.thumbnail).origin +
              new URL(article.thumbnail).pathname +
              `?id=${new URL(article.thumbnail).searchParams.get('id')}`
            }
            alt={article.title}
          />
          <div className="flex flex-col justify-center flex-1 h-full pl-3 w-0">
            <div className="font-bold text-xs text-black dark:text-white leading-tight truncate overflow-hidden whitespace-nowrap">
              {article.title}
            </div>
            <p className="text-black/70 dark:text-white/70 text-xs leading-snug truncate overflow-hidden whitespace-nowrap">
              {article.content}
            </p>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default NewsArticleWidget;
