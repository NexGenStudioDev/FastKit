import { Types } from "mongoose";

export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    superAdmin: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }