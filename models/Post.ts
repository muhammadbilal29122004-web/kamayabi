import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
    lowercase: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const Post = models.Post || model("Post", PostSchema);

export default Post;
