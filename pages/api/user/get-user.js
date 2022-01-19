import { getSession } from "next-auth/react";
import User from "models/User";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  return new Promise(async (resolve) => {
    await dbConnect();
    const session = await getSession({ req });
    User.findById(session.user.id, { password: 0 }, function (err, user) {
      if (err) {
        console.log(err);
        return resolve();
      } else {
        res.json(user);
        return resolve();
      }
    });
  });
}
