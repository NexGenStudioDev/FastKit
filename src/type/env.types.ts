export interface EnvTypes {
  PORT: number | undefined;
  SuperAdmin_Name: string;
  SuperAdmin_Email: string;
  SuperAdmin_Password: string;
  MONGO_URI: string;
  DB_NAME: string;
  publicKey?: string;
  privateKey?: string;
}
