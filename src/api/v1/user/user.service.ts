import UserModel from './user.model';
import RoleModel from '../role/role.model';
import { envConstant } from '../../../constant/env.constant';
import JwtUtils from '../../../utils/Jwt.utils';
import { IUser } from './user.type';
// import httpStatus from "http-status";

class UserService {
  // Create Admin
  public async createAdmin(name: string, email: string, password: string): Promise<IUser> {
    // Check if Admin role exists
    const adminRole = await RoleModel.findOne({ name: 'Admin' });
    if (!adminRole) {
      throw new Error('Admin role not found');
    }

    // Create Admin
    const admin = await UserModel.create({
      name,
      email,
      password,
      role: adminRole._id,
    });

    return admin.set('password', undefined); // Remove password from response
  }

  public async createSuperAdmin() {
    try {
      const superAdminRole = await RoleModel.findOne({ name: 'SuperAdmin' });
      if (!superAdminRole) {
        throw new Error('SuperAdmin role not found');
      }

      const existingSuperAdmin = await UserModel.findOne({
        role: superAdminRole._id,
      });

      if (existingSuperAdmin) {
        throw new Error('A SuperAdmin already exists');
      }

      // Create SuperAdmin
      const superAdmin = await UserModel.create({
        name: envConstant.SuperAdmin_Name,
        email: envConstant.SuperAdmin_Email,
        password: envConstant.SuperAdmin_Password,
        role: superAdminRole._id,
      });

      return superAdmin;
    } catch (error: any) {
      throw new Error(`Error creating SuperAdmin: ${error.message}`);
    }
  }

  public async createUser(
    name: string,
    email: string,
    password: string,
    roleName: string,
  ): Promise<IUser> {
    // Check if the role exists
    const role = await RoleModel.findOne({ name: roleName });
    if (!role) {
      throw new Error(`Role ${roleName} does not exist`);
    }

    // Create User
    const user = await UserModel.create({
      name,
      email,
      password,
      role: role._id,
    });

    return user;
  }
}

export default new UserService();
