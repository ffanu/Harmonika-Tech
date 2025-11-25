import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Testimonials: React.FC = () => {
  const { content } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);

  // Use testimonials from global content
  const testimonials = content.testimonialsPage.items;

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <section id="testimoni" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-2 block">Suara Pelanggan</span>
            <h2 className="text-3xl font-bold text-gray-900">Testimoni singkat</h2>
          </div>
          <Link to="/testimoni" className="hidden sm:flex items-center text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
            Lihat semua <ArrowRight size={16} className="ml-1"/>
          </Link>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Track */}
          <div className="overflow-hidden px-1 py-4 -mx-1">
            <div 
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {testimonials.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-gray-900 truncate">{item.name}</div>
                        <div className="text-xs text-gray-500 truncate">{item.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic flex-grow">"{item.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots & Controls */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-gray-400 hover:text-pink-600 transition-colors mr-2"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx 
                    ? 'w-6 h-2 bg-pink-500' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-pink-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        <div className="mt-8 flex sm:hidden justify-center">
             <Link to="/testimoni" className="flex items-center text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
            Lihat semua <ArrowRight size={16} className="ml-1"/>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;