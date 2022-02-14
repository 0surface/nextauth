import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth'
import { connnectToDatabase, findUserByEmail } from '../../../lib/db'

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connnectToDatabase()

        const user = await findUserByEmail(client, { email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.verifyPassword,
          user.password,
        )

        if (!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }

        client.close()

        return { email: user.email }
      },
    }),
  ],
})
