// models/History.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

 
},
 { timestamps: true }
);

export default mongoose.models.History || mongoose.model("History", historySchema);
