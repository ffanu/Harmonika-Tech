import React from 'react';
import { Zap, Headphones, Infinity, Wallet } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const WhyChooseUs: React.FC = () => {
  const { content } = useContent();

  const getIcon = (index: number) => {
    const icons = [
        <Zap className="w-6 h-6 text-white" />,
        <Infinity className="w-6 h-6 text-white" />,
        <Headphones className="w-6 h-6 text-white" />,
        <Wallet className="w-6 h-6 text-white" />
    ];
    return icons[index % icons.length];
  };

  const getStyle = (index: number) => {
     const styles = [
         { bgClass: "bg-gradient-to-br from-yellow-400 to-orange-500", shadowClass: "shadow-orange-200" },
         { bgClass: "bg-gradient-to-br from-blue-400 to-cyan-500", shadowClass: "shadow-cyan-200" },
         { bgClass: "bg-gradient-to-br from-pink-500 to-rose-500", shadowClass: "shadow-pink-200" },
         { bgClass: "bg-gradient-to-br from-purple-500 to-indigo-500", shadowClass: "shadow-purple-200" }
     ];
     return styles[index % styles.length];
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-2 block">Kenapa Harmonika Tech?</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
             {content.homeFeatures.title}
          </h2>
          <p className="text-gray-600 text-lg">
             {content.homeFeatures.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.homeFeatures.items.map((feature, idx) => {
            const style = getStyle(idx);
            return (
                <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${style.bgClass} ${style.shadowClass}`}>
                    {getIcon(idx)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                </p>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;