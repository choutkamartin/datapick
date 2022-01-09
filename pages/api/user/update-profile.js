import { getSession } from "next-auth/react";
import User from "models/User";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  return new Promise(async (resolve) => {
    await dbConnect();
    const session = await getSession({ req });
    const data = req.body;
    User.findByIdAndUpdate(
      session.user._id,
      { name: data.name },
      function (err, user) {
        if (err) {
          res.status(500).json({ message: "Error occured." });
          return resolve();
        }
        if (user) {
          res.json({ message: "Success, user has been updated." });
          return resolve();
        } else {
          res.status(404).json({ message: "User not found." });
          return resolve();
        }
      }
    );
  });
}
