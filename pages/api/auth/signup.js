import { connnectToDatabase } from '../../../lib/db'
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

    const db = client.db()

    const existingUser = await db.collection('users').findOne({
      email: email,
    })

    if (existingUser) {
      res.status(409).json({ mesage: 'Email already exists' })
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
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
