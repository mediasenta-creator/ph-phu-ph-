
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Newspaper, Info, PhoneCall } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Tin tức", href: "#news-feed", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Kiểm chứng tin giả", href: "#fake-news-check", icon: <Shield className="w-4 h-4" /> },
    { name: "Giới thiệu", href: "#", icon: <Info className="w-4 h-4" /> },
    { name: "Liên hệ", href: "#", icon: <PhoneCall className="w-4 h-4" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-2xl text-white shadow-lg group-hover:rotate-6 transition-transform">
            C
          </div>
          <span className={`text-xl font-black tracking-tighter ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            CÔNG DÂN <span className="text-red-600">ONLINE</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${isScrolled ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              {link.icon}
              {link.name}
            </a>
          ))}
          <div className="ml-4 h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
          <a 
            href="https://www.facebook.com/share/1Bmr7ykgzy/" 
            target="_blank"
            className="hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
            Fanpage
          </a>
        </nav>

        {/* Mobile toggle */}
        <button 
          className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 text-gray-700 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-red-600">{link.icon}</span>
                {link.name}
              </a>
            ))}
            <a 
              href="https://www.facebook.com/share/1Bmr7ykgzy/" 
              target="_blank"
              className="mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold"
            >
              Tham gia cộng đồng Fanpage
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
