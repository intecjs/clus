import { useSession } from 'next-auth/react';
import styles from '../styles/Login.module.css';
import { UserIcon } from '../src/components/icon/UserIcon';
import { SignOutButton } from '../src/components/button/SignOutButton';
import { GoogleLoginButton } from '../src/components/button/GoogleLoginButton';

const NoAccountCreateRecommendation = () => {
  return (
    <div>
      <span style={{ color: 'gray', paddingRight: '0.5rem' }}> No account?</span>
      <a className={styles.link} href="https://google.com">
        Create one
      </a>
    </div>
  );
};

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className={styles.main}>
        <UserIcon image={session.user.image as string} />
        <iframe className={styles.apiFrame} src="/api/example/session"></iframe>
        <SignOutButton />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <GoogleLoginButton />
      <NoAccountCreateRecommendation />
    </main>
  );
}
