import { signIn } from 'next-auth/react';
import Button from './Button';
import GoogleIcon from '../icon/Google';
import styles from './SignOutButton.module.scss';

export const GoogleLoginButton = () => {
  return (
    <Button color="secondary" onClick={() => signIn('google')}>
      <span className={styles.text}>
        <GoogleIcon /> Continue with Google
      </span>
    </Button>
  );
};
