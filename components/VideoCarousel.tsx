
import React, { useState, useEffect, useRef } from 'react';

const backupVideos = [
    "https://cdn.coverr.co/videos/coverr-family-using-vr-glasses-at-home-5345/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-girl-working-on-laptop-at-home-5252/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-online-shopping-with-credit-card-5348/1080p.mp4",
    "https://cdn.coverr.co/videos/coverr-family-watching-movie-on-couch-5349/1080p.mp4"
];

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  const activeVideos = backupVideos;

  const handleVideoEnd = () => {
    setIsTransitioning(true);
    
    if (nextVideoRef.current) {
        nextVideoRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }

    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activeVideos.length);
        setNextIndex((prev) => (prev + 1) % activeVideos.length);
        setIsTransitioning(false);
    }, 1000); 
  };

  return (
    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-900 border border-white/20 group">
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none flex flex-col justify-between p-8">
         <div className="flex justify-between items-start">
            <div>
                <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">Live Experience</div>
                <h3 className="text-xl font-bold text-white">Internet Tanpa Jeda</h3>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connected
            </div>
         </div>
         
         <div className="space-y-2">
             <div className="flex items-center gap-3">
                 <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-pink-500 animate-shimmer" style={{width: '100%'}}></div>
                 </div>
                 <span className="text-xs text-white/80 font-mono">Streaming 4K...</span>
             </div>
             <p className="text-sm text-gray-300">
                 Nikmati momen berharga bersama keluarga dengan koneksi stabil yang dapat diandalkan.
             </p>
         </div>
      </div>

      <video
        ref={currentVideoRef}
        src={activeVideos[currentIndex]}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />

      <video
        ref={nextVideoRef}
        src={activeVideos[nextIndex]}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        muted
        playsInline
      />
      
    </div>
  );
};

export default VideoCarousel;
