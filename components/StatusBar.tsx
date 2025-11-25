import React from 'react';
import { ArrowRight } from 'lucide-react';

const StatusBar: React.FC = () => {
  return (
    <section id="keunggulan" className="border-t border-gray-100 bg-white/50 backdrop-blur-sm scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 w-full md:w-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100">
             <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide">Status</span>
             <div className="flex-1 text-sm text-gray-700 font-medium">
                Network stable · SLA dashboard publik
             </div>
             <a href="#" className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 whitespace-nowrap">
               Lihat status <ArrowRight size={10} />
             </a>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2 whitespace-nowrap">Kepercayaan & Peering</span>
            {['OpenIXP', 'IIX', 'BGP Ready', 'ISO 27001', 'Tier-3 DC', 'Peering SG'].map((badge) => (
              <span key={badge} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 bg-white whitespace-nowrap">
                {badge}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatusBar;