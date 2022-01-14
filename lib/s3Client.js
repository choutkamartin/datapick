import { S3Client } from "@aws-sdk/client-s3";

const credentials = {
  accessKeyId: process.env.AWS_SDK_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client({
  region: process.env.AWS_SDK_REGION,
  credentials: credentials,
});

export { s3Client };
