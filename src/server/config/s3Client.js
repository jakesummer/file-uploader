import { S3Client } from "@aws-sdk/client-s3";
import process from "node:process";

const client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_STORAGE_REGION,
  endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_STORAGE_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_STORAGE_SECRET_ACCESS_KEY,
  },
});

export default client;
