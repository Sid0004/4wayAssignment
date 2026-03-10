import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companion: {

      type: Schema.Types.ObjectId,
      ref: "Companion",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent a user from liking the same companion twice
likeSchema.index({ likedBy: 1, companion: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
