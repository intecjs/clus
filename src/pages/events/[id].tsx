import Layout from '@components/layout/Layout';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { APIClient } from 'src/lib/APIClient';
import { Event } from '../../db/event';
import { useEmojiFavicon } from '../../hooks/useFavicon';
import styles from './EventPage.module.scss';
import 'emoji-mart/css/emoji-mart.css';
import { Picker, BaseEmoji, Emoji, getEmojiDataFromNative } from 'emoji-mart';
import { useCallback, useState } from 'react';
import { useDisabledEventListener } from '@hooks';
import data from 'emoji-mart/data/all.json';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { UserIcon } from '@components/icon';
import Markdown from '@components/markdown/Markdown';
import Button from '@components/button/Button';

type Props = {
  event: Event;
};
export default function EventPage({ event }: Props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleClickEmoji = () => setShowEmojiPicker(true);
  const handleClickEmojiPicker = (e: BaseEmoji) => {
    setEmoji(e);
    setShowEmojiPicker(false);
  };

  const c = useCallback(() => setShowEmojiPicker(false), []);
  const wrapperRef = useDisabledEventListener(c);

  const emojiData = getEmojiDataFromNative(event.emoji, 'apple', data);

  const [emoji, setEmoji] = useState<BaseEmoji>(emojiData);

  useEmojiFavicon(emoji?.native ?? '🍎');

  return (
    <Layout>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.title} />
      </Head>

      <div className={styles.header}>
        <div className={styles.emojiContainer}>
          <div className={styles.eventPageThemeEmoji} onClick={handleClickEmoji}>
            <Emoji emoji={emoji} set="apple" size={75} />
          </div>
          <div className={styles.emojiPicker} ref={wrapperRef}>
            {showEmojiPicker && <Picker set="apple" onClick={handleClickEmojiPicker} />}
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1>{event.title}</h1>
          <p>{event.subTitle}</p>
          <span>
            <span className={styles.userEmoji}>
              <Emoji emoji={'bust_in_silhouette'} size={18} />
            </span>
            <span className={styles.reservedUsers}>{event.reservedUsers.length}</span>
            <span> / </span>
            <span className={styles.capacity}>{event.capacity}</span>
          </span>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.page}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.imageUrl} className={styles.eventImage} alt="event page abstract image" width={'100%'} />
          <h2 className={styles.description}>Description</h2>
          <Markdown>{event.description}</Markdown>
        </div>
        <div className={styles.aside}>
          <div className={styles.eventDate}>
            <h2>{dayjs(event.date).format('YYYY/MM/DD')}</h2>
            <span>
              {dayjs(event.date).format('HH:mm')} - {dayjs(event.end).format('HH:mm')}
            </span>

            <Button className={styles.button} color="primary">
              このイベントに申し込む
            </Button>
          </div>
          <div className={styles.users}>
            <h3>参加者</h3>
            {[...new Array(faker.datatype.number(20))].map((_, i) => (
              <UserIcon key={i} image={faker.image.avatar()} height={40} width={40} />
            ))}
          </div>
          <div className={styles.owner}>
            <h3>管理者</h3>
            <div className={styles.container}>
              <UserIcon image={faker.image.avatar()} height={60} width={60} />
              <div>
                <div className={styles.name}>
                  <span>{faker.name.firstName()}</span>
                  <span>{faker.name.lastName()}</span>
                </div>
                <Button color="secondary" className={styles.followButton}>
                  Follow
                </Button>
              </div>
            </div>
            <div>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function pickFirstUrlQuery(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id === undefined) {
    return {
      notFound: true,
    };
  }

  const id = pickFirstUrlQuery(params.id);
  const event = await new APIClient().getEvent(id);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const events = [
//     {
//       id: '1',
//     },
//     {
//       id: '2',
//     },
//     {
//       id: '3',
//     },
//     {
//       id: '4',
//     },
//   ];
//   // Get the paths we want to pre-render based on users
//   const paths = events.map((e) => ({
//     params: { id: e.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return {
//     paths,
//     fallback: false,
//   };
// };

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     //   const res = await fetch(`https://.../posts/${params.id}`);
//     //     const post = await res.json();
//     const item = {
//       id: params?.id,
//     };

//     // Pass post data to the page via props
//     return {
//       props: { item },
//       revalidate: 10, // in seconds
//     };
//   } catch (e: any) {
//     return {
//       props: { errors: e.message },
//     };
//   }
// };
