import { signOut } from 'next-auth/react';
import { SignOutButtonPresenter } from './SignOutButtonPresenter';

export const SignOutButton = () => <SignOutButtonPresenter onClick={() => signOut()} />;
