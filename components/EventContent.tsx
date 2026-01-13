import React, { useState, useEffect } from 'react';
import { MapPin, Car, Train, Info, CheckCircle, Sparkles, Send, Star, UtensilsCrossed, ThumbsUp, MapPinned } from 'lucide-react';
import { EventDetails } from '../types';
import { AgendaTimeline } from './AgendaTimeline';

interface EventContentProps {
  details: EventDetails;
  onRefine: () => void;
  isRefining: boolean;
  onNavigate: () => void;
}

export const EventContent: React.FC<EventContentProps> = ({ details, onRefine, isRefining, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'car' | 'subway' | 'taxi'>('car');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (!details.venue.imageUrls || details.venue.imageUrls.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % details.venue.imageUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [details.venue.imageUrls]);

  return (
    // Reduced horizontal padding from px-6 to px-4 for wider display
    <div className="relative -mt-16 bg-white rounded-t-[2rem] px-4 pt-10 pb-32 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] min-h-screen">
      
      {/* Decorative center pill */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full"></div>

      {/* Intro Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-1 h-6 bg-silk-gold"></div>
          <h2 className="text-2xl font-sans font-bold text-slate-900">{details.introTitle}</h2>
          
           {/* AI Refine Button */}
           <button 
            onClick={onRefine}
            disabled={isRefining}
            className="ml-auto flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-silk-blue text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            <Sparkles className={`w-3 h-3 ${isRefining ? 'animate-spin' : ''}`} />
            <span>{isRefining ? 'AI Writing' : 'AI Refine'}</span>
          </button>
        </div>

        <div className="space-y-4 mb-6">
            {details.introText.split('\n\n').map((paragraph, index) => {
              // Highlight the first line if it looks like a salutation
              if (index === 0 && paragraph.includes('：')) {
                 return (
                   <p key={index} className="text-slate-800 font-bold text-[15px] font-sans">
                     {paragraph}
                   </p>
                 );
              }
              return (
                <p key={index} className="text-slate-600 leading-7 text-justify text-[15px] font-sans">
                  {paragraph}
                </p>
              );
            })}
        </div>

        {/* Stats Grid */}
        <div className="bg-slate-50 rounded-xl py-6 flex items-center justify-between divide-x divide-slate-200">
          <div className="flex-1 text-center px-1">
            <div className="text-silk-gold font-bold text-2xl mb-2 font-serif tracking-tight">{details.stats.value1}</div>
            <div className="text-slate-400 text-[10px] font-medium tracking-wide">{details.stats.label1}</div>
          </div>
          
          <div className="flex-1 text-center px-1">
            <div className="text-silk-gold font-bold text-2xl mb-2 font-serif tracking-tight">{details.stats.valueMiddle}</div>
            <div className="text-slate-400 text-[10px] font-medium tracking-wide">{details.stats.labelMiddle}</div>
          </div>

          <div className="flex-1 text-center px-1">
            <div className="text-silk-gold font-bold text-2xl mb-2 font-serif tracking-tight">{details.stats.value2}</div>
            <div className="text-slate-400 text-xs font-medium tracking-wide">{details.stats.label2}</div>
          </div>
        </div>
      </div>

      <hr className="border-slate-100 my-8" />

      {/* Agenda */}
      <AgendaTimeline items={details.agenda} />

      <hr className="border-slate-100 my-8" />

      {/* Location / Transport Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-6 text-slate-900">
            <MapPin className="w-5 h-5 text-silk-gold" />
            <h3 className="text-xl font-bold">交通指引</h3>
        </div>

        {/* High-End Venue Card - Carousel */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden mb-6">
          {/* Image Header with Carousel - Increased height to h-60 */}
          <div className="relative h-60 bg-slate-200 group">
             {details.venue.imageUrls.map((url, index) => (
               <div 
                 key={index}
                 className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
               >
                 <img src={url} alt={`Venue ${index + 1}`} className="w-full h-full object-cover" />
               </div>
             ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-white/95 text-xs font-medium tracking-wide z-10">
              <Star className="w-3.5 h-3.5 fill-silk-gold text-silk-gold" />
              <span>{details.venue.rating}</span>
            </div>

            {/* Carousel Indicators */}
            {details.venue.imageUrls.length > 1 && (
              <div className="absolute bottom-3 right-4 flex space-x-1.5 z-10">
                {details.venue.imageUrls.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentImageIndex ? 'w-4 bg-silk-gold' : 'w-1.5 bg-white/70 hover:bg-white'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="px-4 pt-4 flex flex-wrap gap-2">
            {details.venue.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] rounded border border-slate-100 font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Location Details */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <div className="flex items-center space-x-2 mb-1">
                 <div className="bg-silk-gold/10 p-1 rounded-full">
                    <MapPin className="w-3 h-3 text-silk-gold" />
                 </div>
                 <div className="text-xs text-slate-400 font-medium">聚会地点 Location</div>
              </div>
              
              <div className="text-slate-900 font-bold text-[17px] truncate mb-1 leading-snug">{details.venue.room}</div>
              <div className="text-slate-600 text-sm truncate mb-1">{details.venue.name}</div>
              <div className="text-slate-400 text-[11px] truncate">{details.venue.distance}</div>
            </div>
            
            <button 
              onClick={onNavigate}
              className="flex flex-col items-center justify-center pl-5 border-l border-slate-100 text-silk-blue hover:opacity-80 transition-opacity"
            >
              <div className="bg-blue-50 p-2.5 rounded-full mb-1">
                  <Send className="w-5 h-5 -rotate-45 translate-x-0.5 -translate-y-0.5" />
              </div>
              <span className="text-[10px] font-bold">导航</span>
            </button>
          </div>
        </div>

        {/* Restaurant Gourmet Selection */}
        <div className="mb-6 bg-slate-50 rounded-xl p-5 border border-slate-100">
          <div className="flex items-center space-x-2 mb-3">
             <UtensilsCrossed className="w-4 h-4 text-silk-gold" />
             <h4 className="font-bold text-slate-900">甄选 · 美味</h4>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed mb-4 text-justify">
            {details.venue.intro}
          </p>

          <div className="space-y-2">
             {details.venue.features.map((feature, i) => (
               <div key={i} className="flex items-start space-x-2">
                  <div className="bg-white p-0.5 rounded-full border border-slate-200 mt-0.5">
                    <ThumbsUp className="w-2.5 h-2.5 text-silk-blue" />
                  </div>
                  <span className="text-xs text-slate-700 flex-1">{feature}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Transport Tips Panel */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 min-h-[180px]">
            {/* Transport Tabs */}
            <div className="flex space-x-6 border-b border-slate-200 pb-4 mb-4">
                <button 
                  onClick={() => setActiveTab('car')}
                  className={`flex items-center space-x-1.5 text-sm transition-colors relative ${activeTab === 'car' ? 'text-silk-blue font-bold' : 'text-slate-400 font-medium'}`}
                >
                    <Car className="w-4 h-4" />
                    <span>自驾/停车</span>
                    {activeTab === 'car' && <span className="absolute -bottom-[17px] left-0 w-full h-0.5 bg-silk-blue rounded-t-full"></span>}
                </button>
                <button 
                  onClick={() => setActiveTab('subway')}
                  className={`flex items-center space-x-1.5 text-sm transition-colors relative ${activeTab === 'subway' ? 'text-silk-blue font-bold' : 'text-slate-400 font-medium'}`}
                >
                    <Train className="w-4 h-4" />
                    <span>地铁出行</span>
                    {activeTab === 'subway' && <span className="absolute -bottom-[17px] left-0 w-full h-0.5 bg-silk-blue rounded-t-full"></span>}
                </button>
                <button 
                  onClick={() => setActiveTab('taxi')}
                  className={`flex items-center space-x-1.5 text-sm transition-colors relative ${activeTab === 'taxi' ? 'text-silk-blue font-bold' : 'text-slate-400 font-medium'}`}
                >
                    <MapPinned className="w-4 h-4" />
                    <span>打车</span>
                    {activeTab === 'taxi' && <span className="absolute -bottom-[17px] left-0 w-full h-0.5 bg-silk-blue rounded-t-full"></span>}
                </button>
            </div>

            {/* Bottom: Tips Dynamic Content */}
            <div className="space-y-3 animate-fadeIn">
                <div className="flex items-start space-x-2.5">
                    {activeTab === 'car' && (
                       <>
                         <CheckCircle className="w-4 h-4 text-silk-gold mt-0.5 flex-shrink-0" />
                         <span className="text-xs text-slate-600 leading-relaxed">{details.transport.car}</span>
                       </>
                    )}
                    {activeTab === 'subway' && (
                       <>
                         <Info className="w-4 h-4 text-silk-gold mt-0.5 flex-shrink-0" />
                         <span className="text-xs text-slate-600 leading-relaxed">{details.transport.subway}</span>
                       </>
                    )}
                    {activeTab === 'taxi' && (
                       <>
                         <MapPin className="w-4 h-4 text-silk-gold mt-0.5 flex-shrink-0" />
                         <span className="text-xs text-slate-600 leading-relaxed">{details.transport.taxi}</span>
                       </>
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="h-12"></div>
    </div>
  );
};