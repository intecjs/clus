import { ComponentWithAuth } from 'next-auth';
import Head from 'next/head';
import styles from '@styles/Home.module.scss';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Feeds } from '../components/feed/Feed';
import { Event, events } from '../db/event';
import { useEmojiFavicon } from '@hooks';
import { GetStaticProps } from 'next';
import Layout from '@components/layout/Layout';
import { feeds } from 'src/db/feeds';
import { EventCardsWithLink } from '../components/card/EventCardWithLink';

const ShowMoreButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className={styles.showMoreButton} {...props}>
      もっとみる
    </button>
  );
};

const useHide = () => {
  const [hide, setHide] = useState(true);
  const handler = () => setHide(!hide);

  return {
    hide,
    handler,
  };
};

const ReservedEvents: React.FC<{ events: Event[] }> = ({ events }) => {
  const { hide, handler } = useHide();

  return (
    <div>
      <h2>次に参加予定のイベント</h2>
      <EventCardsWithLink events={hide ? events.slice(0, 5) : events} />
      {hide && <ShowMoreButton onClick={handler} />}
    </div>
  );
};

const RecommendEvents: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div>
      <h2>おすすめイベント</h2>
      <EventCardsWithLink events={events} />
    </div>
  );
};

const Calendar = () => {
  return (
    <div
      style={{
        height: '200px',
        backgroundColor: 'white',
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

export const getStaticProps: GetStaticProps<{ events: Omit<Event, 'description'>[] }> = async () => {
  // https://stackoverflow.com/questions/61452675/econnrefused-during-next-build-works-fine-with-next-dev
  // SSG をする場合、/pages/api/xxx をコールできない。

  return {
    props: {
      events: events.map((e) => {
        const { description, ...rest } = e;
        return rest;
      }),
    },
    revalidate: 10, // in seconds
  };
};

Home.auth = true;
export default Home;
