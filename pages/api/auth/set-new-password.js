import { scryptSync } from "crypto";
import User from "models/User";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { email, name, password, passwordRepeat } = req.body;
  const salt = process.env.PASSWORD_SALT;
  if (password === passwordRepeat) {
    const hashedPassword = scryptSync(password, salt, 32).toString("hex");
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
    res.status(200).send();
  } else {
    res.status(401).json({
      message: "Passwords don't match.",
    });
  }
}
