import { signOut } from 'next-auth/react';
import Button from './Button';
import styles from './SignOutButton.module.scss';

export const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()}>
      <span className={styles.text}>Sign out</span>
    </Button>
  );
};
