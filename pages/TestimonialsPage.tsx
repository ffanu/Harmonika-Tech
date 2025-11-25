import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import { Star, Quote, Users, Trophy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const TestimonialsPage: React.FC = () => {
  const { content } = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: <Users size={20} />, value: "500+", label: "Klien Korporat" },
    { icon: <Trophy size={20} />, value: "99%", label: "Client Retention" },
    { icon: <Star size={20} />, value: "4.9/5", label: "Rata-rata Rating" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-100 selection:text-pink-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={14} className="fill-pink-600" />
            Suara Pelanggan
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
             {content.testimonialsPage.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
             {content.testimonialsPage.heroSubtitle}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Case Study */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase">
                  Featured Case Study
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Bagaimana <span className="text-pink-500">Harmonika Tech</span> Meningkatkan Produktivitas Tim Dev hingga 40%
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  "Sebelumnya kami berjuang dengan jitter yang tinggi saat melakukan remote deployment. Harmonika Tech memberikan jalur dedicated dengan latensi sub-5ms ke AWS Singapore, mengubah workflow kami sepenuhnya."
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg">
                    BS
                  </div>
                  <div>
                    <div className="text-white font-bold">Budi Santoso</div>
                    <div className="text-gray-400 text-sm">CTO, Harmonika Tech</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <ArrowUpRight className="text-green-400" /> Impact Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400">Upload Speed</span>
                    <span className="text-green-400 font-bold font-mono">1 Gbps Symmetric</span>
                  </div>
                   <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400">Latency to SG</span>
                    <span className="text-green-400 font-bold font-mono">4.2 ms</span>
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-gray-400">Downtime (YTD)</span>
                    <span className="text-green-400 font-bold font-mono">0 Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Kata Mereka Tentang Harmonika</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.testimonialsPage.items.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative group">
                <Quote size={40} className="absolute top-6 right-6 text-pink-100 group-hover:text-pink-200 transition-colors" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                    />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 flex-grow italic">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-gray-50 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.role}, {review.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingin merasakan pengalaman yang sama?</h3>
            <Link to="/kontak" className="inline-flex items-center px-8 py-3 rounded-full bg-white border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all">
              Hubungi Sales Kami
              <ArrowUpRight size={18} className="ml-2" />
            </Link>
          </div>

        </div>
      </section>

      <Contact />
    </div>
  );
};

export default TestimonialsPage;