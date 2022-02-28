import { getSession } from 'next-auth/client'
import {
  connnectToDatabase,
  findUserByEmail,
  updateUser,
} from '../../../lib/db'
import { hashPassword, verifyPassword } from '../../../lib/auth'

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }

  const userEmail = session.user.email
  const { oldPassword, newPassword } = req.body.passwordData

  const client = await connnectToDatabase()

  const user = await findUserByEmail(client, userEmail)

  if (!user) {
    res.status(404).json({ message: 'User Not Found.' })
    client.close()
    return
  }

  const currentPassword = user.password

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordAreEqual) {
    res.status(403).json({ message: 'Invalid password. Not authorized.' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await updateUser(client, userEmail, hashedPassword)

  client.close()

  res.status(200).json({ message: 'Password updated!' })
}

export default handler
