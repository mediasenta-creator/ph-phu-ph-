
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  source: string;
  category: string;
  isFactChecked?: boolean;
  factCheckScore?: number; // 0-100
  factCheckSummary?: string;
}

export interface FactCheckResult {
  isAuthentic: boolean;
  reliabilityScore: number;
  analysis: string;
  sources: { title: string; url: string }[];
}

export enum NewsCategory {
  LATEST = "Mới nhất",
  SOCIAL = "Xã hội",
  WORLD = "Thế giới",
  TECH = "Công nghệ",
  ECONOMY = "Kinh tế",
  SPORTS = "Thể thao"
}

export const RSS_SOURCES = [
  { name: "VnExpress", url: "https://vnexpress.net/rss/tin-moi-nhat.rss", category: "Mới nhất" },
  { name: "Tuổi Trẻ", url: "https://tuoitre.vn/rss/tin-moi-nhat.rss", category: "Mới nhất" },
  { name: "Dân Trí", url: "https://dantri.com.vn/rss/home.rss", category: "Mới nhất" },
  { name: "Thanh Niên", url: "https://thanhnien.vn/rss/home.rss", category: "Mới nhất" }
];
