import { NextFunction, Request, Response } from 'express';
import JwtUtils from 'src/utils/Jwt.utils';
import roleUtils from '../role/role.utils';
import SendResponse from 'src/utils/SendResponse';

class AuthMiddleWare {
  async validateSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('Token is required');
      }

      let decodedToken = JwtUtils.verifyToken(token);
      let Role_Id = decodedToken.roleId;

      let isSuper_AdminRole = await roleUtils.FIND_ROLE_BY_ID(Role_Id);

      if (!isSuper_AdminRole || isSuper_AdminRole.name !== 'SuperAdmin') {
        throw new Error(
          'You are not authorized to perform this action because you are not a SuperAdmin.',
        );
      }

      next();
    } catch (error: any) {
      SendResponse.error(res, 403, error.message || 'Forbidden');
    }
  }
}

export default new AuthMiddleWare();
