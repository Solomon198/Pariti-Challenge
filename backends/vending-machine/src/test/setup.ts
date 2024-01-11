import mongoose from 'mongoose'
import path from 'path'
import { MongoMemoryServer } from 'mongodb-memory-server'
import dotEnv from 'dotenv'

dotEnv.config({ path: path.resolve(__dirname, '../..', '.env.example') })

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri)
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  /* eslint-disable */
  for (const collection of collections) {
    await collection.deleteMany({});
  }
  /* eslint-enable */
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})
