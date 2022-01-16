import { randomBytes } from "crypto";
import User from "models/User";
import dbConnect from "lib/dbConnect";
import path from "utils/path";
import { sendVerificationEmail } from "utils/email";

export default async function handler(req, res) {
  return new Promise(async (resolve) => {
    await dbConnect();
    const url = process.env.NEXTAUTH_URL;
    const { newUser } = path.auth;
    const { email } = req.body;
    const verificationToken = randomBytes(8).toString("hex");
    const currentDate = new Date();
    const user = new User({ email: email });
    user.verificationToken = {
      value: verificationToken,
      expiresAt: new Date(currentDate.getTime() + 20 * 60 * 1000),
    };
    user.save(function (err) {
      if (err) {
        res.status(409).json({ error: "User already exists." });
        return resolve();
      }
      const verificationLink = `${url}/${newUser}?token=${verificationToken}`;
      sendVerificationEmail(email, verificationLink).then((response) => {
        if (response.statusCode === 500) {
          res.status(500).json({ error: response.message });
          return resolve();
        }
        res.status(200).send();
        return resolve();
      });
    });
  });
}
