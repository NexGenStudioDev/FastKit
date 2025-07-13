import mongoose, { Document, Schema, Types } from "mongoose";
import { IAdmin } from "./Admin.type";

const AdminSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    superAdmin: {
      type: Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);
