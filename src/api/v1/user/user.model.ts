import mongoose, { Schema, Document, Types } from 'mongoose';
import argon2 from 'argon2';
import { IUser } from './user.type';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Hide password by default
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  },
  { timestamps: true },
);

// Hash password before saving using
UserSchema.pre<IUser>('save', async function (next) {
  try {
    this.password = await argon2.hash(this.password);
  } catch (error: any) {
    return next(error);
  }

  next();
});

export default mongoose.model<IUser>('User', UserSchema);
