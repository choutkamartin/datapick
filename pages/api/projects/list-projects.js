import { getSession } from "next-auth/react";
import Project from "models/Project";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });
  const projects = await Project.find({ author: session.user.id });
  res.json(projects);
}
