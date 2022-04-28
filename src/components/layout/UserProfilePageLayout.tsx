import Link from 'next/link';
import styles from './UserProfilePageLayout.module.scss';

type UserProfilePageLayoutProps = {
  userId: string;
};

const UserProfilePageLayout: React.FC<UserProfilePageLayoutProps> = ({ children, userId }) => {
  return (
    <div className={styles.main}>
      <h1>Profile</h1>
      <div>user name</div>

      <nav>
        <ul className={styles.list}>
          <li>
            <Link href={`/users/${userId}/events/scheduled`}>
              <a>参加予定のイベント</a>
            </Link>
          </li>
          <li>
            <Link href={`/users/${userId}/events/archives`}>
              <a>過去参加したイベント</a>
            </Link>
          </li>
        </ul>
      </nav>

      {children}
    </div>
  );
};

export default UserProfilePageLayout;
