import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  whatYouLearn: [String],
  duration: String,
  isCompleted: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);