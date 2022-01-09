import dbConnect from "lib/dbConnect";
import Project from "models/Project";

export default async function handler(req, res) {
  await dbConnect();
  const { projectId } = req.query;
  const data = req.body;
  const project = await Project.findByIdAndUpdate(projectId, { data: data });
  console.log(project);
  res.json(req.body);
}
