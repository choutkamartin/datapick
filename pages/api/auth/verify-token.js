import User from "models/User";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { token } = req.query;
  const user = await User.findOneAndUpdate(
    { "verificationToken.value": token },
    {
      emailVerified: true,
      "verificationToken.used": true,
    }
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({
      message: "Incorrect token.",
    });
  }
}
