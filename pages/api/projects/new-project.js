import { getSession } from "next-auth/react";
import dbConnect from "lib/dbConnect";
import Project from "models/Project";

export default async function handler(req, res) {
  return new Promise(async (resolve) => {
    await dbConnect();
    const session = await getSession({ req });
    const { projectName, projectDescription, projectType } = req.body;
    const project = new Project({
      name: projectName,
      description: projectDescription,
      type: projectType,
      author: session.user._id,
    });
    project.save(function (err, project) {
      if (err) {
        res.status(500).json({ error: "Error occured" });
        return resolve();
      }
      res.json(project);
      return resolve();
    });
  });
}
