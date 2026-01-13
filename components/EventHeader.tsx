import React, { useState, useRef, useEffect } from 'react';
import { Music, Calendar, Clock, CloudSun, Volume2, VolumeX } from 'lucide-react';

interface EventHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  timeLabel: string;
  weather: string;
  musicUrl: string;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ title, subtitle, date, timeLabel, weather, musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(musicUrl);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.error("Audio playback failed:", e);
        // Sometimes auto-play policies block this, but since it's a click handler it should work.
      });
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#3b52a3] to-silk-blue text-white pb-36 pt-12 px-6 overflow-hidden">
      
      {/* Music Toggle - Top Right */}
      <button 
        onClick={togglePlay}
        className={`absolute top-6 right-6 p-2.5 rounded-full backdrop-blur-md transition-all border z-20 flex items-center justify-center
          ${isPlaying 
            ? 'bg-silk-gold/20 border-silk-gold text-silk-gold shadow-[0_0_15px_rgba(200,160,100,0.3)]' 
            : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
          }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <div className="relative">
             <Volume2 className="w-4 h-4 animate-pulse" />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></span>
          </div>
        ) : (
          <Music className="w-4 h-4" />
        )}
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Gold Badge Pill */}
        <div className="inline-block px-4 py-1.5 border border-silk-gold rounded-full bg-silk-gold/10 backdrop-blur-sm mb-6">
          <span className="text-[10px] tracking-[0.2em] text-silk-gold font-bold uppercase">Silk Road Member Event</span>
        </div>

        {/* Title */}
        <div className="space-y-4 mb-8">
          <h1 className="text-5xl font-serif font-bold tracking-wide text-white drop-shadow-lg">
            {title}
          </h1>
          {/* Gold Underline */}
          <div className="w-12 h-1 bg-silk-gold mx-auto rounded-full"></div>
          
          <div className="pt-2">
            <p className="text-blue-100 font-light tracking-widest text-sm">
              <span className="opacity-80">丝绸之路·AI出海会员线下私享会</span>
              <span className="mx-2 text-silk-gold">·</span>
              <span className="text-silk-gold">苏 州 站</span>
            </p>
          </div>
        </div>

        {/* Info Pills Container */}
        <div className="flex flex-col items-center space-y-3 w-full max-w-xs">
          {/* Date & Time */}
          <div className="flex items-center justify-center space-x-4 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 w-full">
            <div className="flex items-center space-x-2 text-sm text-blue-50">
              <Calendar className="w-4 h-4 opacity-80" />
              <span>{date}</span>
            </div>
            <div className="w-[1px] h-3 bg-white/20"></div>
            <div className="flex items-center space-x-2 text-sm text-blue-50">
              <Clock className="w-4 h-4 opacity-80" />
              <span>{timeLabel}</span>
            </div>
          </div>

          {/* Weather */}
          <div className="flex items-center justify-center space-x-2 text-xs text-blue-200">
            <CloudSun className="w-4 h-4 text-silk-gold" />
            <span>{weather}</span>
          </div>
        </div>

      </div>
    </div>
  );
};