import { signIn } from 'next-auth/react';
import Button from './Button';
import GoogleIcon from '../icon/GoogleIcon';
import styles from './SignOutButton/SignOutButton.module.scss';

export const GoogleLoginButton = () => {
  return (
    <Button color="secondary" onClick={() => signIn('google')}>
      <span className={styles.text}>
        <GoogleIcon /> Continue with Google
      </span>
    </Button>
  );
};
