import styles from './EventCard.module.scss';

type CardProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  userCount: number;
  imageUrl: string;
};
export const EventCard: React.FC<CardProps> = ({ title, description, date, userCount, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.date}>{date}</div>
        <div className={styles.users}>{userCount}</div>
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="site image" />
      </div>
    </div>
  );
};
