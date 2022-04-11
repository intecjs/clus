import styles from './EventCard.module.scss';
import { Event } from '../../db/event';
import dayjs from 'dayjs';
import Image from 'next/image';

const cutOff = (str: string, num: number) => (str.length > num ? str.substring(0, num) + '...' : str);
const cutter = (str: string) => cutOff(str, 50);

type CardProps = Event;
export const EventCard: React.FC<CardProps> = ({ title, subTitle, date, reservedUsers, imageUrl, emoji }) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <h2>
          {title} {emoji}
        </h2>
        <p className={styles.description}>{cutter(subTitle)}</p>
        <div className={styles.date}>{dayjs(date).format('YYYY.MM.DD')}</div>
        <div className={styles.users}>{reservedUsers.length}</div>
      </div>
      <div
        style={{
          position: 'relative', // css module の場合 next/image の layout="fill" が動作しない
        }}
      >
        <Image src={imageUrl} alt="site image" loading="lazy" layout="fill" objectFit="cover" className={styles.img} />
      </div>
    </div>
  );
};
