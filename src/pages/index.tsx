import { ComponentWithAuth } from 'next-auth';
import Head from 'next/head';
import styles from '@styles/Home.module.scss';
import { Header } from '@components';
import { useSession } from 'next-auth/react';
import { EventCard } from '../components/card/EventCard';
import faker from '@faker-js/faker';
import { useState } from 'react';
import { Feeds } from '../components/feed/Feed';
import { events, Event } from '../db/event';
import Link from 'next/link';
import { useEmojiFavicon } from 'src/hooks/useFavicon';

const EventCardWithLink: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link href={'/events/' + event.id} passHref>
      <a>
        <EventCard {...event} />
      </a>
    </Link>
  );
};

const ReservedEvents = () => {
  const reservedEvents = events.slice(0, 10);
  const [hide, setHide] = useState(true);
  const handler = () => setHide(!hide);

  return (
    <div>
      <h2>次に参加予定のイベント ⚡️</h2>
      {(hide ? reservedEvents.slice(0, 5) : reservedEvents).map((event) => {
        return (
          <div key={event.id} style={{ paddingBottom: '0.5rem' }}>
            <EventCardWithLink event={event} />
          </div>
        );
      })}

      {hide && <button onClick={handler}>show more</button>}
    </div>
  );
};

const RecommendEvents = () => {
  const recommendEvents = events.slice(20, 30);
  return (
    <div>
      <h2>おすすめイベント ✋</h2>
      {recommendEvents.map((event) => {
        return (
          <div key={event.id} style={{ paddingBottom: '0.5rem' }}>
            <EventCardWithLink event={event} />
          </div>
        );
      })}
    </div>
  );
};

const Calendar = () => {
  return <div style={{ height: '200px', backgroundColor: 'rgb(99.5%, 67.2%, 78%)', color: 'white' }}>calendar</div>;
};

const feeds = [
  {
    id: faker.datatype.uuid(),
    votedUserAvatarUrl: faker.image.avatar(),
    votedUser: faker.name.firstName(),
    eventName: faker.lorem.sentence(),
  },
  ...[...new Array(10)].map((item) => {
    return {
      id: faker.datatype.uuid(),
      votedUserAvatarUrl: faker.image.avatar(),
      votedUser: faker.name.firstName(),
      eventName: faker.lorem.sentence(),
    };
  }),
];

const WelcomeMessage: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name} さん ようこそ👋</h1>;
};

const Home: ComponentWithAuth = () => {
  const { data } = useSession();

  useEmojiFavicon('🥕');

  return (
    <div className={styles.container}>
      <Head>
        <title>Clus | Home</title>
        <meta name="description" content="clus | home" />
      </Head>

      <Header></Header>
      <main>
        {data?.user.name && <WelcomeMessage name={data.user.name} />}
        <div className={styles.main}>
          <div className={styles.contents}>
            <ReservedEvents />
            <RecommendEvents />
          </div>
          <div className={styles.sideArea}>
            <Calendar />
            <Feeds feeds={feeds} />
          </div>
        </div>
      </main>
    </div>
  );
};

Home.auth = true;

export default Home;
