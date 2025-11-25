import React from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Contact: React.FC = () => {
  const { content } = useContent();

  return (
    <footer id="kontak" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4">
             <div className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Harmonika Tech</span>
                <span className="text-sm font-semibold text-white leading-tight">Internet yang selalu selaras</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Provider internet terpercaya dengan infrastruktur fiber optic premium untuk kebutuhan bisnis dan residensial Anda.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Kontak Kami</h4>
            <div className="space-y-4">
              <a href={`mailto:${content.contact.email}`} className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <Mail size={18} className="mt-1 text-pink-500 group-hover:scale-110 transition-transform"/>
                <span className="text-sm">{content.contact.email}</span>
              </a>
               <a href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, '')}`} className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <MessageSquare size={18} className="mt-1 text-pink-500 group-hover:scale-110 transition-transform"/>
                <span className="text-sm">WhatsApp: {content.contact.whatsapp}</span>
              </a>
               <a href={`tel:${content.contact.phone.replace(/[^0-9]/g, '')}`} className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                <Phone size={18} className="mt-1 text-pink-500 group-hover:scale-110 transition-transform"/>
                <span className="text-sm">Call: {content.contact.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6">Alamat Kantor</h4>
            <div className="flex items-start gap-3 text-gray-400 group">
              <MapPin size={20} className="mt-1 text-pink-500 shrink-0 group-hover:scale-110 transition-transform"/>
              <span className="text-sm leading-relaxed max-w-md">
                {content.contact.address}
              </span>
            </div>
            {/* Simple Map Placeholder */}
            <div className="mt-6 w-full h-40 bg-gray-800 rounded-xl overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs uppercase tracking-wider font-bold">
                 Google Maps Placeholder
               </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
           &copy; {new Date().getFullYear()} Harmonika Tech. All rights reserved. PT Harmonika Empat Saudara.
        </div>
      </div>
    </footer>
  );
};

export default Contact;