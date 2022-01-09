import Project from "models/Project";
import dbConnect from "lib/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const data = req.body;
  await Project.findByIdAndUpdate(id, { taxonomy: data });
  res.json({ message: "Success" });
}
