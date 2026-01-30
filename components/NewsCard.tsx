
import React from 'react';
import { NewsItem } from '../types';
import { ExternalLink, ShieldCheck, Clock } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  onClick: (item: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onClick }) => {
  const dateStr = new Date(item.pubDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(item.pubDate).toLocaleDateString('vi-VN');

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
           <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {item.source}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Clock className="w-3 h-3" />
          <span>{dateStr}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-green-600 font-medium text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Nguồn chính thống</span>
          </div>
          <button className="text-gray-400 group-hover:text-red-600 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
