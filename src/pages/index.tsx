import { ComponentWithAuth } from 'next-auth';
import Head from 'next/head';
import styles from '@styles/Home.module.scss';
import { useSession } from 'next-auth/react';
import { EventCard } from '../components/card/EventCard';
import { useState } from 'react';
import { Feeds } from '../components/feed/Feed';
import { Event, events } from '../db/event';
import Link from 'next/link';
import { useEmojiFavicon } from '@hooks';
import { GetStaticProps } from 'next';
import Layout from '@components/layout/Layout';
import { feeds } from 'src/db/feeds';

const EventCardWithLink: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link href={'/events/' + event.id} passHref>
      <a>
        <EventCard {...event} />
      </a>
    </Link>
  );
};

const ReservedEvents: React.FC<{ events: Event[] }> = ({ events }) => {
  const [hide, setHide] = useState(true);
  const handler = () => setHide(!hide);

  return (
    <div>
      <h2>次に参加予定のイベント</h2>
      {(hide ? events.slice(0, 5) : events).map((event) => {
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

const RecommendEvents: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div>
      <h2>おすすめイベント</h2>
      {events.map((event) => {
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
  return (
    <div
      style={{
        height: '200px',
        backgroundColor: 'rgb(100%, 95.6%, 93.7%)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray',
      }}
    >
      calendar
    </div>
  );
};

const WelcomeMessage: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1>
      {name} さん ようこそ<span className={styles.hand}>👋</span>
    </h1>
  );
};

const Home: ComponentWithAuth = ({ events }) => {
  const { data } = useSession();

  useEmojiFavicon('🥕');

  return (
    <Layout>
      <Head>
        <title>Clus | Home</title>
        <meta name="description" content="clus | home" />
      </Head>

      {data?.user.name && <WelcomeMessage name={data.user.name} />}
      <div className={styles.main}>
        <section className={styles.contents}>
          <ReservedEvents events={events.slice(0, 10)} />
          <RecommendEvents events={events.slice(11, 30)} />
        </section>
        <section className={styles.sideArea}>
          <Calendar />
          <Feeds feeds={feeds} />
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async () => {
  // https://stackoverflow.com/questions/61452675/econnrefused-during-next-build-works-fine-with-next-dev
  // SSG をする場合、/pages/api/xxx をコールできない。

  return {
    props: { events },
    revalidate: 10, // in seconds
  };
};

Home.auth = true;
export default Home;
