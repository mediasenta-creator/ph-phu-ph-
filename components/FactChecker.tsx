
import React, { useState } from 'react';
import { verifyNews } from '../services/geminiService';
import { FactCheckResult } from '../types';
import { ShieldAlert, CheckCircle, Loader2, AlertTriangle, ExternalLink, Info } from 'lucide-react';

const FactChecker: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const checkResult = await verifyNews(input);
      setResult(checkResult);
    } catch (e) {
      setError("Không thể kiểm chứng lúc này. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="fake-news-check" className="py-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 my-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-4 bg-red-100 rounded-full mb-4">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Trung tâm Kiểm chứng Tin giả</h2>
          <p className="text-gray-600 max-w-lg">
            Sử dụng trí tuệ nhân tạo để phân tích và kiểm chứng thông tin từ các nguồn tin trên mạng xã hội. 
            Công Dân Online giúp bạn trở thành người đọc thông thái.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <textarea
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-600 outline-none transition-all min-h-[150px] text-gray-700"
            placeholder="Dán nội dung tin tức hoặc URL bài báo bạn nghi ngờ tại đây..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleCheck}
            disabled={loading || !input.trim()}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-red-200"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldAlert className="w-6 h-6" />}
            {loading ? "Đang phân tích dữ liệu..." : "Bắt đầu kiểm chứng"}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg flex items-center gap-3 border border-yellow-100">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {result && (
          <div className={`mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl p-6 md:p-8 ${result.isAuthentic ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start gap-4 mb-6">
              {result.isAuthentic ? (
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              )}
              <div>
                <h3 className={`text-xl font-bold ${result.isAuthentic ? 'text-green-900' : 'text-red-900'}`}>
                  {result.isAuthentic ? "Thông tin có độ tin cậy cao" : "Cảnh báo: Thông tin thiếu kiểm chứng"}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${result.reliabilityScore > 70 ? 'bg-green-500' : result.reliabilityScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${result.reliabilityScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Độ tin cậy: {result.reliabilityScore}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 font-bold text-gray-800 mb-2">
                <Info className="w-4 h-4" />
                Phân tích chi tiết:
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {result.analysis}
              </p>
            </div>

            {result.sources && result.sources.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  Nguồn đối chiếu đề xuất:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {result.sources.map((source, idx) => (
                    <a 
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors"
                    >
                      {source.title}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FactChecker;
