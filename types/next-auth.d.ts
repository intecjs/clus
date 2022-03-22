import NextAuth, { DefaultUser } from 'next-auth';
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

  interface User extends DefaultUser {
    id?: string | null;
  }
  type ComponentWithAuth<PropsType = any> = React.FC<PropsType> & AuthComponentConfig;
}
