
import React from 'react';
import { ArrowRight, Activity, Zap } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import VideoCarousel from './VideoCarousel';

const Hero: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-purple-100/50 to-transparent -z-10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-pink-100/50 to-transparent -z-10 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-gray-600">{content.hero.tagline}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              {content.hero.headlineStart} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                {content.hero.headlineHighlight}
              </span> <br/>
              <span className="text-purple-100/90 drop-shadow-sm sm:drop-shadow-none sm:text-purple-200 lg:text-gray-900/50 block sm:inline">
                 {content.hero.headlineEnd}
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              {content.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontak" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-xl hover:shadow-pink-500/20 transition-all transform hover:-translate-y-1 group">
                {content.hero.buttonPrimary}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/keunggulan" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all">
                {content.hero.buttonSecondary}
              </Link>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Uptime SLA</div>
                <div className="text-2xl font-bold text-gray-900">{content.stats.uptime}</div>
                <div className="text-[10px] text-gray-400 mt-1">Monitoring 24/7</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Latency Lokal</div>
                <div className="text-2xl font-bold text-gray-900">{content.stats.latency}</div>
                <div className="text-[10px] text-gray-400 mt-1">Peering Premium</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-500 mb-1">Respon NOC</div>
                <div className="text-2xl font-bold text-gray-900">{content.stats.nocResponse}</div>
                <div className="text-[10px] text-gray-400 mt-1">Siap dihubungi</div>
              </div>
            </div>
          </div>

          {/* Right Visual (Replaced with VideoCarousel) */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none h-[500px] lg:h-[600px]">
            
            {/* Decorative Elements behind card */}
            <div className="absolute top-10 -right-4 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl"></div>

            <VideoCarousel />
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
