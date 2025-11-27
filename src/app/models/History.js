// models/History.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type:String, ref: "User", required: true },
  projectId: { type: String, ref: "Project", required: true },

},
 { timestamps: true }
);

export default mongoose.models?.History|| mongoose.model("History", historySchema);







