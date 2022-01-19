import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { s3Client } from "/lib/s3Client.js";

export default async function handler(req, res) {
  const data = req.body;
  const arr = await Promise.all(
    data.map(({ key }) =>
      createPresignedPost(s3Client, {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      })
    )
  );
  res.json(arr);
}
