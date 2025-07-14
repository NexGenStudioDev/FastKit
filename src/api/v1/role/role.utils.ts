import roleConstant from './role.constant';
import roleModel from './role.model';
import { IRole } from './role.type';

class Role_Utils {
  FIND_ROLE_BY_ID = async (roleId: string): Promise<IRole> => {
    try {
      const role = await roleModel.findById(roleId);
      if (!role) {
        throw new Error(roleConstant.ROLE_NOT_FOUND);
      }

      return role;
    } catch (error: any) {
      throw new Error(`Error finding role: ${error.message}`);
    }
  };
}

export default new Role_Utils();
