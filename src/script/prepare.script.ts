import mongoose from "mongoose";
import { config } from "dotenv";
import RoleModel from "../api/v1/role/role.model";
import UserService from "../api/v1/user/user.service";

config();

const Preparation = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    // Create roles
    const roles = [
      { name: "SuperAdmin", description: "Has full access to the system" },
      { name: "Admin", description: "Can manage users and settings" },
      { name: "User", description: "Can access user features" },

    ];

    for (const role of roles) {
      const existingRole = await RoleModel.findOne({ name: role.name });
      if (!existingRole) {
        await RoleModel.create(role);
        console.log(`Role ${role.name} created`);
      }
    }

 
    const superAdmin = await UserService.createSuperAdmin();
   

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

Preparation();
