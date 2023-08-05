import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    todos: { type: Array },
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

export default mongoose.models.users || mongoose.model("users", schema);
