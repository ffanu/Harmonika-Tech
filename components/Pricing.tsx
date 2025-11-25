import React from 'react';
import { Check, Wifi, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Pricing: React.FC = () => {
  const { content } = useContent();

  const getWhatsappLink = (pkgName: string, pkgSpeed: string, pkgPrice: string) => {
    // Strip non-numeric characters from the phone number for the API
    const phoneNumber = content.contact.whatsapp.replace(/\D/g, '');
    
    // Create a professional pre-filled message
    const message = `Halo Harmonika Tech, saya tertarik berlangganan paket internet *${pkgName}* (${pkgSpeed}) dengan harga ${pkgPrice}. Mohon informasi ketersediaan jaringan di lokasi saya.`;
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="paket" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-2 block">Pilihan Paket</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Koneksi Cepat Tanpa Batas</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Pilih paket internet fiber optic yang sesuai dengan kebutuhan rumah atau bisnis Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {content.packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                pkg.highlight 
                  ? 'border-pink-500 bg-white shadow-lg shadow-pink-100 ring-1 ring-pink-500' 
                  : 'border-gray-200 bg-white hover:border-pink-200'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 mb-3">
                  <Wifi size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                <div className="text-2xl font-extrabold text-gray-900 mt-2 tracking-tight">
                  {pkg.speed}
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{pkg.devices}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{pkg.feature1}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{pkg.feature2}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-auto">
                 <div className="text-sm text-gray-400 mb-1">Mulai dari</div>
                 <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                   {pkg.price}
                 </div>
                 <a 
                   href={getWhatsappLink(pkg.name, pkg.speed, pkg.price)}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`w-full mt-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                   pkg.highlight
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg hover:shadow-pink-500/25'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                 }`}>
                   Pilih Paket
                   <ArrowRight size={14} />
                 </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;