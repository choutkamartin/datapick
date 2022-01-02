import { SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "/lib/sesClient.js";

const sendEmail = async (email, verificationLink) => {
  const params = {
    Source: process.env.EMAIL_SENDER,
    Template: "SendVerificationLink",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: `{ "email": "${email}", "verificationLink": "${verificationLink}" }`,
  };

  try {
    const data = await sesClient.send(new SendTemplatedEmailCommand(params));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export { sendEmail };
