import { MongoClient } from 'mongodb'

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.jkpu3.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

export const connnectToDatabase = async () =>
  await MongoClient.connect(connectionString)
