import { EventCard } from '@components/card/EventCard';
import Layout from '@components/layout/Layout';
import { GetServerSideProps } from 'next';

import Head from 'next/head';
import { APIClient } from 'src/lib/APIClient';
import { Event } from '../../db/event';
import { useEmojiFavicon } from '../../hooks/useFavicon';

type Props = {
  event: Event;
};
export default function EventPage({ event }: Props) {
  useEmojiFavicon(event.emoji);

  return (
    <Layout>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.title} />
      </Head>

      <EventCard {...event} />
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
