import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import { Shield, Zap, Server, Headphones, Globe, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const FeaturesPage: React.FC = () => {
  const { content } = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Map icons based on index since icons can't be stored in JSON easily
  const getIcon = (index: number) => {
    const icons = [
      <Zap size={24} className="text-yellow-500" />,
      <Shield size={24} className="text-green-500" />,
      <Globe size={24} className="text-blue-500" />,
      <Headphones size={24} className="text-pink-500" />,
      <Server size={24} className="text-purple-500" />,
      <Activity size={24} className="text-red-500" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pink-100 selection:text-pink-900">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-32 pb-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-100/40 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm mb-6">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Infrastruktur Premium</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {content.featuresPage.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.featuresPage.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Main Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.featuresPage.items.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-md transition-all border border-gray-100">
                {getIcon(idx)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Section: Network Topology / Image */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Network Operations Center (NOC)</h2>
                <div className="h-1 w-20 bg-pink-500 rounded-full"></div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Kami memonitor jaringan Anda secara proaktif 24 jam sehari, 7 hari seminggu. Tim engineer bersertifikasi kami mendeteksi dan menyelesaikan potensi gangguan bahkan sebelum Anda menyadarinya.
              </p>
              
              <ul className="space-y-4 mt-6">
                {[
                  "Monitoring Traffic Real-time",
                  "Notifikasi Gangguan Proaktif via WhatsApp",
                  "Laporan Performansi Bulanan (MRTG)",
                  "Konsultasi Topologi Jaringan Gratis"
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                    <span className="font-medium text-gray-200">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                 <Link to="/kontak" className="inline-flex items-center px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-colors">
                   Hubungi Tim Teknis
                   <ArrowRight size={16} className="ml-2" />
                 </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-30 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="Data Center Monitoring" 
                className="relative rounded-2xl shadow-2xl border border-gray-700 w-full"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-gray-800/90 backdrop-blur-md p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Average Response Time</span>
                  <span className="text-green-400 font-bold">&lt; 3 Menit</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Siap untuk Upgrade Koneksi Anda?</h2>
          <p className="text-lg text-gray-600 mb-10">
            Bergabunglah dengan ratusan perusahaan yang telah mempercayakan infrastruktur digital mereka kepada Harmonika Tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/paket" className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
               Lihat Paket Internet
             </Link>
             <Link to="/kontak" className="px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition-all">
               Konsultasi Gratis
             </Link>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default FeaturesPage;