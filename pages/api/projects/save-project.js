import dbConnect from "lib/dbConnect";
import Project from "models/Project";

export default async function handler(req, res) {
  await dbConnect();
  const data = req.body;
  const { id } = req.query;
  const project = await Project.findByIdAndUpdate(id, data);
  res.json(project);
}
