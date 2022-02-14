import { MongoClient } from 'mongodb'

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.jkpu3.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

export const connnectToDatabase = async () =>
  await MongoClient.connect(connectionString)

export const insertUser = async (client, user) => {
  return await client.db().collection('users').insertOne({
    email: user.email,
    password: user.password,
  })
}

export const findUserByEmail = async (client, email) =>
  await client.db().collection('users').findOne({ email })

export const isExistingUserByEmail = async (client, email) => {
  const exists = await findUserByEmail(client, email)
  return exists ? true : false
}
