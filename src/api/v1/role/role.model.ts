import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "./role.type";



const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRole>("Role", RoleSchema);
