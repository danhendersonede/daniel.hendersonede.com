import type {
  SpeakingEvent,
  FilteredEvents,
  SpeakingMetrics,
} from '../types/speaking-events';

/**
 * Filters speaking events by their status based on current date
 */
export function filterEventsByStatus(events: SpeakingEvent[]): FilteredEvents {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcoming = events.filter(event => {
    const eventDate = new Date(event.data.date);
    const eventDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );
    return eventDay >= today && event.data.status !== 'cancelled';
  });

  const past = events.filter(event => {
    const eventDate = new Date(event.data.date);
    const eventDay = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );
    return eventDay < today || event.data.status === 'completed';
  });

  const featured = events.filter(
    event =>
      event.data.featured &&
      (event.data.status === 'completed' || new Date(event.data.date) < today)
  );

  return { upcoming, past, featured };
}

/**
 * Gets upcoming events sorted by date, optionally limited
 */
export function getUpcomingEvents(
  events: SpeakingEvent[],
  limit?: number
): SpeakingEvent[] {
  const { upcoming } = filterEventsByStatus(events);
  const sorted = upcoming.sort(
    (a: SpeakingEvent, b: SpeakingEvent) =>
      new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Gets featured past events sorted by date (most recent first)
 */
export function getFeaturedPastEvents(
  events: SpeakingEvent[]
): SpeakingEvent[] {
  const { featured } = filterEventsByStatus(events);
  return featured.sort(
    (a: SpeakingEvent, b: SpeakingEvent) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/**
 * Gets all past events sorted by date (most recent first)
 */
export function getPastEvents(events: SpeakingEvent[]): SpeakingEvent[] {
  const { past } = filterEventsByStatus(events);
  return past.sort(
    (a: SpeakingEvent, b: SpeakingEvent) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/**
 * Formats event date consistently
 */
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Gets the primary link for an event with appropriate text based on linkType
 */
export function getPrimaryEventLink(
  event: SpeakingEvent
): { url: string; text: string; isEmbeddable: boolean } | null {
  if (!event.data.link) return null;

  const linkType = event.data.linkType;
  let text: string;
  let isEmbeddable = false;

  switch (linkType) {
    case 'recording':
      isEmbeddable = isYouTubeLink(event.data.link);
      if (isEmbeddable) {
        text = 'Watch Recording on YouTube';
      } else {
        text = 'Watch Recording';
      }
      break;
    case 'info':
      text = 'Event Details';
      break;
    case 'registration':
      text = 'Register';
      break;
    case 'podcast':
      text = 'Listen to Podcast';
      break;
    default:
      // Fallback for events without linkType
      text = event.data.status === 'completed' ? 'View Recording' : 'More Info';
      isEmbeddable = isYouTubeLink(event.data.link);
      break;
  }

  return { url: event.data.link, text, isEmbeddable };
}

/**
 * Determines if a link is a YouTube video
 */
export function isYouTubeLink(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Determines if an event is virtual based on location and format
 */
export function isVirtualEvent(event: SpeakingEvent): boolean {
  return (
    event.data.format === 'virtual' ||
    event.data.location.toLowerCase().includes('online') ||
    event.data.location.toLowerCase().includes('virtual')
  );
}

/**
 * Gets days until event (negative if past)
 */
export function getDaysUntilEvent(event: SpeakingEvent): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDate = new Date(event.data.date);
  const eventDay = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  const diffTime = eventDay.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calculates comprehensive speaking metrics from event data
 */
export function calculateSpeakingMetrics(
  events: SpeakingEvent[]
): SpeakingMetrics {
  const completed = events.filter(e => e.data.status === 'completed');
  const upcoming = events.filter(e => e.data.status === 'upcoming');

  // Aggregate attendance and digital metrics
  const totalAttendees = completed.reduce(
    (sum, event) => sum + (event.data.metrics?.attendees || 0),
    0
  );
  const totalViews = completed.reduce(
    (sum, event) => sum + (event.data.metrics?.views || 0),
    0
  );

  // Topic expertise analysis
  const topicCounts: Record<string, number> = {};
  events.forEach(event => {
    event.data.topics.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  // Type distribution
  const typeCounts: Record<string, number> = {};
  events.forEach(event => {
    typeCounts[event.data.type] = (typeCounts[event.data.type] || 0) + 1;
  });

  return {
    totalEvents: completed.length,
    totalUpcoming: upcoming.length,
    totalCompleted: completed.length,
    totalAttendees,
    totalViews,
  };
}

/**
 * Integration helper for Astro pages to get metrics
 */
export async function getSpeakingMetrics() {
  const { getCollection } = await import('astro:content');
  const events = await getCollection('speakingEvents');
  return calculateSpeakingMetrics(events);
}
