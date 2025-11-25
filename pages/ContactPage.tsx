import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Globe, Building2 } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const adminNumber = content.contact.whatsapp.replace(/\D/g, '');
    const text = `Halo Harmonika Tech,\n\nPerkenalkan saya *${formData.name}* ${formData.company ? `dari *${formData.company}*` : ''}.\n\nSaya ingin menanyakan: \n"${formData.message}"\n\nMohon informasinya. Terima kasih.`;
    
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-pink-100 selection:text-pink-900">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-purple-50 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-tr from-pink-50 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-2 block">Hubungi Kami</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Diskusikan Kebutuhan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Infrastruktur Anda</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim konsultan jaringan kami siap membantu merancang solusi internet dedicated yang paling efisien untuk bisnis Anda.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Info & Cards */}
          <div className="space-y-6">
            {/* Sales Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 mb-4">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Layanan Penjualan</h3>
              <p className="text-sm text-gray-500 mb-4">Konsultasi paket, coverage area, dan penawaran harga korporat.</p>
              <div className="space-y-2">
                <a href={`https://wa.me/${content.contact.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors">
                  <Phone size={16} className="text-gray-400" />
                  {content.contact.whatsapp} (WhatsApp)
                </a>
                <a href={`mailto:${content.contact.email}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors">
                  <Mail size={16} className="text-gray-400" />
                  {content.contact.email}
                </a>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Dukungan Teknis (NOC)</h3>
              <p className="text-sm text-gray-500 mb-4">Bantuan teknis 24/7 untuk pelanggan existing.</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Tim NOC Standby 24 Jam
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Kantor Operasional</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {content.contact.address}
              </p>
              <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                 <Building2 size={16} className="text-gray-400 mt-0.5" />
                 <div>
                   <div className="text-xs font-bold text-gray-500 uppercase">Jam Kantor</div>
                   <div className="text-sm text-gray-700">Senin - Jumat: 08:00 - 17:00 WIB</div>
                   <div className="text-sm text-gray-700">Sabtu - Minggu: Libur (Support Online)</div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-white">
                <h3 className="text-xl font-bold">Kirim Pesan</h3>
                <p className="text-gray-400 text-sm mt-1">Isi formulir di bawah ini untuk terhubung langsung dengan WhatsApp Admin kami.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Budi Santoso"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Perusahaan (Opsional)</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="PT Teknologi Maju"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp / Telepon</label>
                   <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan atau Kebutuhan</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Halo, saya tertarik dengan paket Platinum 150Mbps untuk kantor cabang kami di Cianjur..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 focus:bg-white h-40 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Kirim Pesan via WhatsApp
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center md:text-left">
                    *Dengan mengklik tombol di atas, Anda akan diarahkan ke aplikasi WhatsApp.
                  </p>
                </div>
              </form>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-8 rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-64 bg-gray-200 relative group">
               <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
                 <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                   <MapPin size={18} className="text-pink-600" />
                   <span className="text-sm font-bold text-gray-800">Lokasi Kantor Kami</span>
                 </div>
                 <a 
                   href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact.address)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="mt-4 px-4 py-2 bg-pink-600 text-white text-xs font-bold rounded-lg hover:bg-pink-700 transition-colors"
                 >
                   Buka di Google Maps
                 </a>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Reuse */}
      <Contact />
    </div>
  );
};

export default ContactPage;