import { connnectToDatabase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

async function handler(req, res) {
  const data = req.body
  const { email, password } = data

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: 'Invalid input - password should also be at leat 7 characters',
    })
  }

  const client = await connnectToDatabase()

  const db = client.db()

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  })

  res.status(201).json({ message: 'Created user!' })
}

export default handler
