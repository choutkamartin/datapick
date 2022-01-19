import { randomBytes } from "crypto";
import User from "models/User";
import dbConnect from "lib/dbConnect";
import { sendRecoveryEmail } from "utils/email";
import path from "utils/path";

export default async function handler(req, res) {
  await dbConnect();
  const { email } = req.body;
  const url = process.env.NEXTAUTH_URL;
  const { setNewPassword } = path.auth;
  const recoveryToken = randomBytes(8).toString("hex");
  const user = await User.findOne({ email: email });
  var currentDate = new Date();
  user.recoveryToken = {
    value: recoveryToken,
    expiresAt: new Date(currentDate.getTime() + 20 * 60 * 1000),
  };
  user.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      const recoveryLink = `${url}${setNewPassword}?token=${recoveryToken}`;
      sendRecoveryEmail(email, recoveryLink).then((response) => {
        res.json(response);
      });
    }
  });
}
