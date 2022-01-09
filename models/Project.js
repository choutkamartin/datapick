import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  data: [
    {
      name: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
      },
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  taxonomy: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["box", "polygon", "line", "point"],
      },
      minWidth: {
        type: Number,
      },
      minHeight: {
        type: Number,
      },
    },
  ],
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
