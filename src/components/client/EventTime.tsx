import { useEffect, useState } from 'react';

interface Props {
  startTime: string;
  endTime?: string;
}

/**
 * Formats event times with intelligent AM/PM display and timezone
 * - Same period: "2:00 - 3:00 PM CDT"
 * - Cross period: "11:00 AM - 1:00 PM CDT"
 * - Single time: "2:00 PM CDT"
 */
export default function EventTime({ startTime, endTime }: Props) {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    try {
      const start = new Date(startTime);

      if (endTime) {
        const end = new Date(endTime);

        const startFormatter = new Intl.DateTimeFormat([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        const endFormatter = new Intl.DateTimeFormat([], {
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short',
        });

        const startParts = startFormatter.formatToParts(start);
        const endParts = endFormatter.formatToParts(end);

        const getPart = (parts: Intl.DateTimeFormatPart[], type: string) =>
          parts.find(part => part.type === type)?.value || '';

        const startHour = getPart(startParts, 'hour');
        const startMinute = getPart(startParts, 'minute');
        const startPeriod = getPart(startParts, 'dayPeriod');

        const endHour = getPart(endParts, 'hour');
        const endMinute = getPart(endParts, 'minute');
        const endPeriod = getPart(endParts, 'dayPeriod');
        const timezone = getPart(endParts, 'timeZoneName');

        const timeRange =
          startPeriod !== endPeriod
            ? `${startHour}:${startMinute} ${startPeriod} - ${endHour}:${endMinute} ${endPeriod} ${timezone}`
            : `${startHour}:${startMinute} - ${endHour}:${endMinute} ${endPeriod} ${timezone}`;

        setLocalTime(timeRange);
      } else {
        setLocalTime(
          start.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
          })
        );
      }
    } catch {
      setLocalTime('Time unavailable');
    }
  }, [startTime, endTime]);

  return <span>{localTime || 'Loading...'}</span>;
}
