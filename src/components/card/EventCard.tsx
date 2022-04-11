import styles from './EventCard.module.scss';
import { Event } from '../../db/event';
import dayjs from 'dayjs';

type CardProps = Event;
export const EventCard: React.FC<CardProps> = ({ title, subTitle, date, reservedUsers, imageUrl, emoji }) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h2>
          {title} {emoji}
        </h2>
        <p className={styles.description}>{subTitle}</p>
        <div className={styles.date}>{dayjs(date).format('YYYY.MM.DD')}</div>
        <div className={styles.users}>{reservedUsers.length}</div>
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="site image" loading="lazy" />
      </div>
    </div>
  );
};
