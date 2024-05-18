import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("todos", todoSchema);
