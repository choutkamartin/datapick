import { SESClient } from "@aws-sdk/client-ses";

const credentials = {
  accessKeyId: process.env.AWS_SDK_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY,
  region: process.env.AWS_SDK_REGION,
};
console.log(credentials);

const sesClient = new SESClient(credentials);
export { sesClient };
