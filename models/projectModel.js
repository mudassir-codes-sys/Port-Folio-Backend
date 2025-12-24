import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: { type: [String] },
    video: { type: String },
    tech: { type: [String], required: true },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String },
    status: { type: String, default: "completed" },
    category: { type: String, default: "Full Stack" },
  },
  { timestamps: true }
);

const projectModel = mongoose.model("project", projectSchema);

export default projectModel;
