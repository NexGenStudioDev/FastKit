import { Request, Response } from 'express';
import userService from '../user/user.service';
import { UserValidator } from '../user/user.validator';
import SendResponse from '../../../utils/SendResponse';
import SuperAdminConstant from './SuperAdmin.constant';
import { ZodError } from 'zod';

import userUtils from '../user/user.utils';
import StatusCode_Constant from 'src/constant/StatusCode.constant';

class SuperAdminController {
  createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, name, password } = UserValidator.parse(req.body);

      const findUser = await userUtils.findUserByEmail(email);
      if (findUser) {
        throw new Error('User with this email already exists');
      }

      const createdAdmin = await userService.createAdmin(name, email, password);

      SendResponse.success(res, 201, SuperAdminConstant.ADMIN_CREATED_SUCCESSFULLY, createdAdmin);
    } catch (error: any) {
    
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const zodMessage = error.errors.map((err) => err.message).join(', ');
        SendResponse.error(res, StatusCode_Constant.BAD_REQUEST, zodMessage);
      }

      SendResponse.error(res, error.statusCode || 500, error.message || 'Internal server error');
    }
  };
}

export default new SuperAdminController();
