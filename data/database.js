import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_ADDRESS}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
  if (db) return db;

  try {
    console.log('Trying to connect to db');
    await client.connect();
    console.log('Connected successfully to database');
    db = client.db(process.env.MONGODB_DB_NAME);
    return db;
  } catch (error) {
    console.error('Connection failed:', error);
    await client.close();
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first!');
  }
  return db;
}