import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthComponentConfig } from '../types/next-auth';

type Props = {
  children?: any;
} & AuthComponentConfig;

const Authorizer: React.FC<Props> = ({ children, auth }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (!auth) {
    return children;
  }

  const isUser = !!session?.user;
  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ auth: any }>) {
  return (
    <SessionProvider session={session}>
      <Authorizer auth={Component.auth}>
        <Component {...pageProps} />
      </Authorizer>
    </SessionProvider>
  );
}

export default App;
