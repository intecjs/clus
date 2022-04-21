import Link from 'next/link';
import styles from './Feed.module.scss';

type Feed = {
  id: string;
  votedUserAvatarUrl: string;
  votedUser: string;
  eventName: string;
};
type FeedsProps = {
  feeds: Feed[];
};
export const Feeds: React.FC<FeedsProps> = ({ feeds }) => {
  return (
    <div>
      {feeds.map((feed) => (
        <Feed key={feed.id} {...feed} />
      ))}
    </div>
  );
};

const Feed: React.FC<Feed> = (feed) => {
  return (
    <div className={styles.feed}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width={50} height={50} src={feed.votedUserAvatarUrl} alt="avator image" />
      <p>
        <Link href={`/users/${feed.votedUser}`}>
          <a>{feed.votedUser}</a>
        </Link>{' '}
        さんが <Link href={`/events/${feed.eventName}`}>{feed.eventName}</Link> を公開しました。
      </p>
    </div>
  );
};
