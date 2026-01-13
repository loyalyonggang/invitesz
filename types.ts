export enum AgendaIconType {
  CHECK_IN = 'CHECK_IN',
  INTRO = 'INTRO',
  DINNER = 'DINNER',
  TALK = 'TALK',
  PHOTO = 'PHOTO'
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  icon: AgendaIconType;
}

export interface EventStats {
  label1: string;
  value1: string;
  labelMiddle: string;
  valueMiddle: string;
  label2: string;
  value2: string;
}

export interface Venue {
  name: string;
  room: string;
  address: string;
  distance: string;
  rating: string;
  tags: string[];
  imageUrls: string[];
  intro: string;
  features: string[];
}

export interface TransportTips {
  car: string;
  subway: string;
  taxi: string;
}

export interface EventDetails {
  title: string;
  subtitle: string;
  date: string;
  timeLabel: string;
  weather: string;
  introTitle: string;
  introText: string;
  stats: EventStats;
  agenda: AgendaItem[];
  venue: Venue;
  transport: TransportTips;
  musicUrl: string;
}