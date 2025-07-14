import { config } from 'dotenv';
import { EnvTypes } from 'src/type/env.types';

config();

export let envConstant: EnvTypes = {
  PORT: Number(process.env.PORT),
  SuperAdmin_Name: process.env.SuperAdmin_Name || 'SuperAdmin',
  SuperAdmin_Email: process.env.SuperAdmin_Email || '',
  SuperAdmin_Password: process.env.SuperAdmin_Password || '',
  MONGO_URI: process.env.MONGO_URI || '',
  DB_NAME: process.env.DB_NAME || '',
  publicKey: process.env.publicKey || '',
  privateKey: process.env.privateKey || '',
};
