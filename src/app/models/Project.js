import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  description: String,
  techStack: [String],
  difficulty: { type: String, default: "beginner" },
  whatYouLearn: [String],
  duration: String,
  isCompleted: { type: Boolean, default: false },
  isBookmarked: { type: Boolean, default: false },
  userId: { type: String, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.models?.Project || mongoose.model("Project", projectSchema);