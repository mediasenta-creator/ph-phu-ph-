
import React, { useState, useEffect } from 'react';
import { fetchNewsFeed } from './services/newsService';
import { NewsItem, NewsCategory } from './types';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import FactChecker from './components/FactChecker';
import { Search, Filter, RefreshCw, ChevronRight, Newspaper, Users, Globe, Smartphone, TrendingUp } from 'lucide-react';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchNewsFeed();
    setNews(data);
    setFilteredNews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    let result = news;
    if (selectedCategory !== "Tất cả") {
      result = result.filter(item => item.category === selectedCategory || item.source.includes(selectedCategory));
    }
    if (searchQuery) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredNews(result);
  }, [selectedCategory, searchQuery, news]);

  const categories = [
    { name: "Tất cả", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Xã hội", icon: <Users className="w-4 h-4" /> },
    { name: "Thế giới", icon: <Globe className="w-4 h-4" /> },
    { name: "Công nghệ", icon: <Smartphone className="w-4 h-4" /> },
    { name: "Mới nhất", icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-red-700 overflow-hidden flex items-center justify-center text-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000" 
            alt="News background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-lg">
            CÔNG DÂN <span className="text-yellow-400 uppercase">ONLINE</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8 text-red-50">
            Tin tức chính thống từ Dân Trí, Tuổi Trẻ, VnExpress. Cập nhật liên tục, kiểm chứng thông tin chính xác cho mọi công dân.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#news-feed" className="bg-white text-red-600 px-8 py-3 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all flex items-center gap-2">
              <Newspaper className="w-5 h-5" /> Đọc tin mới nhất
            </a>
            <a href="#fake-news-check" className="bg-yellow-400 text-red-900 px-8 py-3 rounded-full font-bold shadow-xl hover:bg-yellow-300 transition-all flex items-center gap-2">
              <ShieldAlertIcon className="w-5 h-5" /> Kiểm chứng tin giả
            </a>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        {/* News Section Header */}
        <div id="news-feed" className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name 
                    ? "bg-red-600 text-white shadow-lg shadow-red-100" 
                    : "bg-white text-gray-600 border border-gray-200 hover:border-red-400"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none min-w-[280px]"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button 
              onClick={loadNews}
              className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-red-600 transition-all"
              title="Làm mới"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Fact Checker Component */}
        <FactChecker />

        {/* News Grid */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Tin Tức Tổng Hợp</h2>
            <div className="h-1 flex-grow bg-gray-100 rounded-full">
              <div className="w-16 h-full bg-red-600 rounded-full"></div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl h-[400px] animate-pulse border border-gray-100">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
                    <div className="h-6 bg-gray-200 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} onClick={setSelectedNews} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Không tìm thấy bài viết nào phù hợp.</p>
              <button 
                onClick={() => {setSelectedCategory("Tất cả"); setSearchQuery("");}}
                className="mt-4 text-red-600 font-bold hover:underline"
              >
                Xem tất cả tin tức
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{selectedNews.source}</span>
                <span className="text-sm text-gray-500">{new Date(selectedNews.pubDate).toLocaleString('vi-VN')}</span>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-6 md:p-10 flex-grow">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight">{selectedNews.title}</h1>
              <img src={selectedNews.thumbnail} alt={selectedNews.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10">
                <p className="font-bold text-xl text-gray-900 mb-4">{selectedNews.description}</p>
                {/* Normally we'd render content here, but RSS feed summary is often partial */}
                <p>Nội dung chi tiết được tổng hợp từ nguồn chính thống {selectedNews.source}. Quý độc giả vui lòng nhấn vào nút bên dưới để đọc bài viết đầy đủ tại trang nguồn.</p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Xác nhận nguồn tin chính thống</h4>
                  <p className="text-sm text-red-700">Đây là bài báo từ đơn vị tin tức được Nhà nước cấp phép hoạt động.</p>
                </div>
                <a 
                  href={selectedNews.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-200 shrink-0"
                >
                  Đọc full bài tại {selectedNews.source}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal utility icons
function ShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/>
    </svg>
  );
}

const ExternalLink = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-2xl">C</div>
            <span className="text-2xl font-black tracking-tight">CÔNG DÂN <span className="text-red-500">ONLINE</span></span>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed mb-6">
            Dự án cộng đồng nhằm cung cấp nền tảng tin tức sạch, chính thống và công cụ AI hỗ trợ phát hiện tin giả cho công dân Việt Nam. Sứ mệnh của chúng tôi là nâng cao dân trí và bảo vệ môi trường internet lành mạnh.
          </p>
          <div className="flex gap-4">
             <a href="https://www.facebook.com/share/1Bmr7ykgzy/" target="_blank" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
             </a>
             <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-all">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
             </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Tin tức</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-red-500 transition-colors">VnExpress</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Tuổi Trẻ Online</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Báo Dân Trí</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Báo Thanh Niên</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Liên hệ</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="#" className="hover:text-red-500 transition-colors">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Báo lỗi tin giả</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-red-500 transition-colors">Hợp tác nội dung</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Công Dân Online. Phát triển bởi Đội ngũ Công Dân Số Việt Nam.</p>
      </div>
    </div>
  </footer>
);

export default App;
