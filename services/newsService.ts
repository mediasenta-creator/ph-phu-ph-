
import { NewsItem, RSS_SOURCES } from "../types";

export const fetchNewsFeed = async (): Promise<NewsItem[]> => {
  try {
    // We use rss2json API to avoid CORS issues for a client-side demo
    const allNews: NewsItem[] = [];
    
    const fetchPromises = RSS_SOURCES.map(async (source) => {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        return data.items.map((item: any) => ({
          id: item.guid || item.link,
          title: item.title,
          description: item.description.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
          content: item.content,
          link: item.link,
          pubDate: item.pubDate,
          thumbnail: item.thumbnail || item.enclosure?.link || `https://picsum.photos/seed/${Math.random()}/600/400`,
          source: source.name,
          category: source.category
        }));
      }
      return [];
    });

    const results = await Promise.all(fetchPromises);
    results.forEach(items => allNews.push(...items));
    
    // Sort by date newest first
    return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
