export interface Speaker {
  name: string;
  specialty: string;
  image: string;
  verified?: boolean;
}

export interface Webinar {
  id: number;
  title: string;
  category: string;
  type: 'LIVE' | 'UPCOMING' | 'RECORDED';
  thumbnail: string;
  speaker: Speaker;
  date: string;
  duration: string;
  attendees: number;
  cmeCourses: number;
  likes?: number;
  comments?: number;
  shares?: number;
  tags?: string[];
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export enum WebinarTypes {
  filter = 'FILTER',
  search = 'SEARCH',
}

export interface AppEvent {
  type: WebinarTypes;
  payload?: any;
}
