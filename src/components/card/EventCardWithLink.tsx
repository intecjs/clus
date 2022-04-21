import { EventCard } from './EventCard';
import { Event } from '../../db/event';
import Link from 'next/link';

const EventCardWithLink: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link href={'/events/' + event.id} passHref>
      <a>
        <EventCard {...event} />
      </a>
    </Link>
  );
};
export const EventCardsWithLink: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <>
      {events.map((event) => {
        return (
          <div key={event.id} style={{ paddingBottom: '0.5rem' }}>
            <EventCardWithLink event={event} />
          </div>
        );
      })}
    </>
  );
};
