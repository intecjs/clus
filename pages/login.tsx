import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '../src/components/button/Button';
import GoogleIcon from '../src/components/icon/Google';
import styles from '../styles/Login.module.css';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className={styles.main}>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
