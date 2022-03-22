import { useSession } from 'next-auth/react';
import { SignOutButton } from '../button/SignOutButton';
import { UserIcon } from '../icon/UserIcon';
import styles from './Header.module.scss';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.title}>CLUS</div>
      <div className={styles.rightContainer}>
        <SignOutButton />
        <UserIcon image={(session?.user.image as string) ?? ''} height={70} width={70} />
      </div>
    </div>
  );
};
