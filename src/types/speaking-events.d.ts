/**
 * Speaking event data structure matching the content collection schema
 */
export interface SpeakingEventData {
  id: string;
  title: string;
  event: string;
  date: Date;
  format: 'in-person' | 'virtual' | 'hybrid';
  location: string;
  type: 'keynote' | 'talk' | 'workshop' | 'panel' | 'podcast';
  status: 'upcoming' | 'completed' | 'cancelled';
  link?: string;
  linkType?: 'recording' | 'info' | 'registration' | 'podcast';
  topics: string[];
  cost?: string;
  startTime?: string;
  endTime?: string;
  featured: boolean;
  metrics?: {
    attendees?: number;
    rating?: number;
    views?: number;
    shares?: number;
    downloads?: number;
  };
  description?: string;
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
}

/**
 * Complete speaking event with Astro collection metadata
 */
export interface SpeakingEvent {
  id: string;
  data: SpeakingEventData;
}

/**
 * Events filtered by status for display components
 */
export interface FilteredEvents {
  upcoming: SpeakingEvent[];
  past: SpeakingEvent[];
  featured: SpeakingEvent[];
}

/**
 * Calculated metrics for speaking portfolio display
 */
export interface SpeakingMetrics {
  totalEvents: number;
  totalUpcoming: number;
  totalCompleted: number;
  totalAttendees: number;
  totalViews: number;
}
