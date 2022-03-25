import { ComponentWithAuth } from 'next-auth';
import Head from 'next/head';
import styles from '@styles/Home.module.scss';
import { Header } from '@components';
import { useSession } from 'next-auth/react';
import { EventCard } from '../components/card/EventCard';
import faker from '@faker-js/faker';
import { useState } from 'react';
import { Feeds } from '../components/feed/Feed';

const events = [
  {
    id: faker.datatype.uuid(),
    title: 'NestJS meetup Online #2',
    description: 'この勉強会ではXXXを行っています。',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=1',
  },
  {
    id: faker.datatype.uuid(),
    title: 'ソフトウェアアーキテクチャの基礎 輪読会 #4',
    description: '23時の深夜に開催！みなさんも是非ご参加ください。',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=2',
  },
  {
    id: faker.datatype.uuid(),
    title: 'Serverless Meetup Japan Virtual #22',
    description: 'serverless! serverless! serverless!!',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=3',
  },
  {
    id: faker.datatype.uuid(),
    title: 'Serverless Meetup Japan Virtual #21',
    description: 'serverless! serverless! serverless!!',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=4',
  },
  {
    id: faker.datatype.uuid(),
    title: 'Serverless Meetup Japan Virtual #20',
    description: 'serverless! serverless! serverless!!',
    date: faker.date.recent().toISOString(),
    userCount: faker.datatype.number(100),
    imageUrl: 'https://picsum.photos/150/100?random=5',
  },
  ...[...new Array(10)].map((item) => {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      date: faker.date.recent().toISOString(),
      userCount: faker.datatype.number(100),
      imageUrl: 'https://picsum.photos/150/100?random=' + faker.datatype.number(100),
    };
  }),
];

const ReservedEvents = () => {
  const [hide, setHide] = useState(true);
  const handler = () => setHide(!hide);

  return (
    <div>
      <h2>次に参加予定のイベント ⚡️</h2>
      {(hide ? events.slice(0, 5) : events).map((event) => {
        return (
          <div key={event.id} style={{ paddingBottom: '0.5rem' }}>
            <EventCard {...event} />
          </div>
        );
      })}

      {hide && <button onClick={handler}>show more</button>}
    </div>
  );
};

const RecommendEvents = () => {
  const recommendEvents = [...new Array(10)].map((item) => {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      date: faker.date.recent().toISOString(),
      userCount: faker.datatype.number(100),
      imageUrl: 'https://picsum.photos/150/100?random=' + faker.datatype.number(100),
    };
  });
  return (
    <div>
      <h2>おすすめイベント ✋</h2>
      {recommendEvents.map((event) => {
        return (
          <div key={event.id} style={{ paddingBottom: '0.5rem' }}>
            <EventCard {...event} />
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Clus | Home</title>
        <meta name="description" content="clus | home" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🥕</text></svg>"
        ></link>
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
