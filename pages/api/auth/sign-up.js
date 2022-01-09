import { randomBytes } from "crypto";
import User from "models/User";
import dbConnect from "lib/dbConnect";
import { sendEmail } from "utils/email";
import path from "utils/path";

export default async function handler(req, res) {
  return new Promise(async (resolve) => {
    await dbConnect();
    const { newUser } = path.auth;
    const { email } = req.body;
    const url = process.env.NEXTAUTH_URL;
    const verificationToken = randomBytes(8).toString("hex");
    var currentDate = new Date();
    const user = new User({ email: email });
    user.verificationToken = {
      value: verificationToken,
      expiresAt: new Date(currentDate.getTime() + 20 * 60 * 1000),
    };
    user.save(function (err, user) {
      if (err) {
        res.status(409).json({ error: "User already exists." });
        return resolve();
      }
      const verificationLink = `${url}${newUser}?token=${verificationToken}`;
      const response = sendEmail(email, verificationLink);
      res.json(response);
    });
  });
}
