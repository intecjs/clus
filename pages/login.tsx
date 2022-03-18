import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Button from '../src/components/button/Button';
import GoogleIcon from '../src/components/icon/Google';
import styles from '../styles/Login.module.css';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className={styles.main}>
        <div className={styles.image_border}>
          <Image
            className={styles.avatar}
            src={(session.user?.image as string) ?? ''}
            alt="user icon image"
            height={100}
            width={100}
          ></Image>
        </div>
        <iframe className={styles.apiFrame} src="/api/example/session"></iframe>
        <Button onClick={() => signOut()}>
          <span className={styles.buttonText}>Sign out</span>
        </Button>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Button color="secondary" onClick={() => signIn('google')}>
        <span className={styles.buttonText}>
          <GoogleIcon /> Continue with Google
        </span>
      </Button>
      <div>
        <span style={{ color: 'gray', paddingRight: '0.5rem' }}> No account?</span>
        <a className={styles.link} href="https://google.com">
          Create one
        </a>
      </div>
    </main>
  );
}
