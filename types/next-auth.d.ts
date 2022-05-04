import NextAuth, { DefaultUser, DefaultProfile } from 'next-auth';
import { JWT } from 'next-auth/jwt';

/**
 * Authentication configuration
 */
export interface AuthComponentConfig {
  auth: boolean;
}

declare module 'next-auth' {
  interface Session {
    user: User | JWT;
  }

  interface User extends DefaultProfile {}
  type ComponentWithAuth<PropsType = any> = React.FC<PropsType> & AuthComponentConfig;
}
