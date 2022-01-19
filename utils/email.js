import { SendTemplatedEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "/lib/sesClient.js";

/**
 * Sends an email with a verification link to the recipient
 * @param {*} email An email address of the user/recipient of the email
 * @param {*} verificationLink A verification link of the user
 * @returns Response from the SES client
 */
const sendVerificationEmail = async (email, verificationLink) => {
  const params = {
    Source: process.env.EMAIL_SENDER,
    Template: "SendVerificationEmail",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: `{ "email": "${email}", "verificationLink": "${verificationLink}" }`,
  };

  const command = new SendTemplatedEmailCommand(params);

  try {
    await sesClient.send(command);
    return { statusCode: 200 };
  } catch (err) {
    return {
      message: "An error occured when sending e-mail.",
      statusCode: 500,
    };
  }
};

/**
 * Sends an email with a recovery link to the recipient
 * @param {string} email An email address of the user/recipient of the email
 * @param {string} recoveryLink A recovery link of the user
 * @returns Response from the SES client
 */
const sendRecoveryEmail = async (email, recoveryLink) => {
  const params = {
    Source: process.env.EMAIL_SENDER,
    Template: "SendRecoveryEmail",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: `{ "email": "${email}", "recoveryLink": "${recoveryLink}" }`,
  };

  const command = new SendTemplatedEmailCommand(params);

  try {
    await sesClient.send(command);
    return { statusCode: 200 };
  } catch (err) {
    return { error: "An error occured when sending e-mail.", statusCode: 500 };
  }
};

export { sendVerificationEmail, sendRecoveryEmail };
