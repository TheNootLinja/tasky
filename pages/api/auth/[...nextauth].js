import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import ClientPromise from '../../../lib/mongodb-auth';

export default NextAuth({
    adapter: MongoDBAdapter(ClientPromise),
    providers: [
      GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET
      }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
          session.userid = user.id;
          session.theme = user.preferedTheme;
          return session;
        },
      },
      session: {
        strategy: 'database',
      },
})
