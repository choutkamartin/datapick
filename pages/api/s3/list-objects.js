import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "lib/s3Client";

export default async function handler(req, res) {
  const { prefix } = req.query;
  var params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Marker: "",
    MaxKeys: 20,
    Prefix: `${prefix}`,
  };

  const command = new ListObjectsCommand(params);
  const response = await s3Client.send(command);
  res.json(response);
}
