import React from 'react';
import { AgendaItem } from '../types';
import { getAgendaIcon } from './IconMap';

interface AgendaTimelineProps {
  items: AgendaItem[];
}

export const AgendaTimeline: React.FC<AgendaTimelineProps> = ({ items }) => {
  return (
    <div className="mt-8 px-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center">
          流程安排
        </h3>
      </div>

      <div className="relative pl-3 space-y-8">
        {/* Vertical Dashed Line */}
        <div className="absolute left-[26px] top-4 bottom-4 w-[1px] border-l border-dashed border-slate-300"></div>

        {items.map((item, index) => (
          <div key={index} className="relative flex items-start group">
            {/* Icon Bubble */}
            <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mr-5">
              {getAgendaIcon(item.icon)}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="text-silk-gold font-bold text-sm mb-0.5 font-serif">{item.time}</div>
              <div className="font-bold text-slate-800 text-lg mb-1">{item.title}</div>
              <p className="text-slate-400 text-sm font-light">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
