import { UserIconWithMenu } from '@components/icon/UserIconWithMenu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { ServiceName } from './ServiceName';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <a>
          <ServiceName />
        </a>
      </Link>
      <div className={styles.rightContainer}>
        <UserIconWithMenu
          name={session?.user.name ?? ''}
          image={(session?.user.image as string) ?? ''}
          email={session?.user.email ?? ''}
          height={70}
          width={70}
        />
      </div>
    </div>
  );
};
