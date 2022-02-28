import { MongoClient } from 'mongodb'

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.jkpu3.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

export const connnectToDatabase = async () =>
  await MongoClient.connect(connectionString)

export const insertUser = async (client, user) =>
  await client.db().collection('users').insertOne({
    email: user.email,
    password: user.password,
  })

export const updateUser = async (client, email, newPassword) =>
  await client
    .db()
    .collection('users')
    .updateOne(
      {
        email: email,
      },
      {
        $set: { password: newPassword },
      },
    )

export const findUserByEmail = async (client, email) =>
  await client.db().collection('users').findOne({ email })

export const isExistingUserByEmail = async (client, email) =>
  (await findUserByEmail(client, email)) ? true : false
