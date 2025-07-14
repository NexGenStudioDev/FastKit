import { Types } from 'mongoose';

export interface IAdmin  {
  name: string;
  email: string;
  password: string;
  role: string;
  superAdmin: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
