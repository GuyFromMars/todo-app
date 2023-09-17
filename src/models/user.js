import mongoose, { SchemaTypes } from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: true,
    },
    password: { type: String, required: true },
    todos: [
      {
        taskId: { type: SchemaTypes.ObjectId },
        task: String,
        completed: { type: Boolean, default: false },
      },
    ],
  },
  {
    // add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

export default mongoose.models.users || mongoose.model("users", schema);
