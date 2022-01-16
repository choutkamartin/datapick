import Project from "models/Project";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const project = await Project.findById(id);
  res.json(project);
}
