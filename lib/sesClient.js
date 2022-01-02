import { SESClient } from "@aws-sdk/client-ses";

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};
const sesClient = new SESClient(credentials);
export { sesClient };
