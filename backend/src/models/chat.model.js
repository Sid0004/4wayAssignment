import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    companion: { type: Schema.Types.ObjectId, ref: "Companion", required: true },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
