import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_PROVIDER_ID ?? '',
      clientSecret: process.env.GOOGLE_AUTH_PROVIDER_SECRET ?? '',
    }),
  ],
  secret: process.env.SECRET ?? '',
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ signIn: { user, account, profile, email, credentials } });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log({ redirect: { url, baseUrl } });
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log({ jwt: { token, user, account, profile, isNewUser } });
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log({ session: { session, user, token } });

      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user = {
        sub: token.sub,
        ...session.user,
      };

      return session;
    },
  },
});
