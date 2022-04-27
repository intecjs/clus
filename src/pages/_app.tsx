import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AuthComponentConfig } from '../../types/next-auth';
import KBarProvider from '../components/kbar/KBarProvider';
import { PressCtrlKeyToStart } from '../components/kbar/PressCtrlKeyToStart';
import { Loading } from '../components/loading/Loading';

type Props = {
  children?: any;
} & AuthComponentConfig;

const Authorizer: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const isUser = !!session?.user;
  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loading />;
};

function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ auth: any }>) {
  return (
    <KBarProvider>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Authorizer auth={Component.auth}>
            <Component {...pageProps} />
          </Authorizer>
        ) : (
          <Component {...pageProps} />
        )}
        <PressCtrlKeyToStart />
      </SessionProvider>
    </KBarProvider>
  );
}

export default App;
