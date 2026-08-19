import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "portfolio";

let clientPromise: Promise<MongoClient> | null = null;

export function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getPortfolioDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}
