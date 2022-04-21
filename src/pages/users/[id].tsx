import Layout from '@components/layout/Layout';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { APIClient } from 'src/lib/APIClient';
import styles from './UserPage.module.scss';
import { Event } from 'src/db/event';
import { EventCardsWithLink } from '@components/card/EventCardWithLink';

type UserPageProps = {
  events: Event[];
  errors?: any;
};

const UserPage = ({ events, errors }: UserPageProps) => {
  if (errors?.length) {
    // TODO: define error types
    return <div>{errors}</div>;
  }

  return (
    <Layout>
      <Head>
        <title>user profile</title>
        <meta name="description" content="user profile" />
      </Head>

      <div className={styles.main}>
        <h1>Profile</h1>
        <div>user name</div>

        {/* 以下、タブで切り替えたい！！ */}
        <h2>参加予定のイベント</h2>
        <div className={styles.mainGrid}>
          <EventCardsWithLink events={events} />
        </div>
        <h2>今後の公開予定</h2>
        <div className={styles.mainGrid}>
          <EventCardsWithLink events={events} />
        </div>

        <h2>過去参加したイベント</h2>
        <div className={styles.mainGrid}>
          <EventCardsWithLink events={events} />
        </div>
      </div>
    </Layout>
  );
};
function pickFirstUrlQuery(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

/**
 * Server Side Rendering -- generate HTML(Static contents) every per request.
 * @param param0
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params?.id === undefined) {
      return {
        notFound: true,
      };
    }

    const id = pickFirstUrlQuery(params.id);
    const events = await new APIClient().getEvents();

    if (!events.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: { events },
    };
  } catch (e: any) {
    return {
      props: { errors: e.message },
    };
  }
};

// ISR -- use Caching and revalidate every xxx seconds.
// export const getStaticPaths: GetStaticPaths = async () => {
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return {
//     paths: [],
//     fallback: 'blocking', // キャッシュがまだ作られていないときはSSRを行う
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     if (params?.id === undefined) {
//       return {
//         notFound: true,
//       };
//     }

//     const id = pickFirstUrlQuery(params.id);
//     const events = await new APIClient().getEvents();

//     if (!events.length) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: { events },
//       revalidate: 10, // in seconds
//     };
//   } catch (e: any) {
//     return {
//       props: { errors: e.message },
//     };
//   }
// };

export default UserPage;
