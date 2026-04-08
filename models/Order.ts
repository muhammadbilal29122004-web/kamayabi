import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postCategory: {
    type: String,
  },
  postPrice: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
