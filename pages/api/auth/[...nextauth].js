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
        // Providers.Email({
        //     server: {
        //         host: '',
        //         port: '',
        //         auth: {
        //             user: '',
        //             pass: ''
        //         }
        //     },
        //     from: '',
        // })
    ],
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.uid;
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
})
