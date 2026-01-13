import React from 'react';
import { Clock, Utensils, Award, Star, Users } from 'lucide-react';
import { AgendaIconType } from '../types';

export const getAgendaIcon = (type: AgendaIconType) => {
  const commonClass = "w-4 h-4 text-silk-gold";
  switch (type) {
    case AgendaIconType.CHECK_IN:
      return <Clock className={commonClass} />;
    case AgendaIconType.INTRO:
      return <Users className={commonClass} />;
    case AgendaIconType.DINNER:
      return <Utensils className={commonClass} />;
    case AgendaIconType.TALK:
      return <Award className={commonClass} />;
    case AgendaIconType.PHOTO:
      return <Star className={commonClass} />;
    default:
      return <Clock className={commonClass} />;
  }
};
