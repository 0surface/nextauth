import {
  connnectToDatabase,
  insertUser,
  isExistingUserByEmail,
} from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  const data = req.body
  const { email, password } = data

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input - password should also be at least 7 characters',
    })
  }
  try {
    const client = await connnectToDatabase()

    const existingUser = await isExistingUserByEmail(client, email)

    if (existingUser) {
      res.status(409).json({ message: 'Email already exists' })
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    const result = await insertUser(client, {
      email: email,
      password: hashedPassword,
    })

    res.status(201).json({ message: 'Created user!' })

    client.close()
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message + 'Failed to Connect to database' })
  }
}

export default handler
