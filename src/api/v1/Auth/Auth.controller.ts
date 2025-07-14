import { Request, Response } from 'express';
import JwtUtils from '../../../utils/Jwt.utils';
import userUtils from '../user/user.utils';
import { LoginValidator } from './Auth.validator';
import AuthConstant from './Auth.constant';
import SendResponse from '../../../utils/SendResponse';
import AuthUtils from './Auth.utils';
import { ZodError } from 'zod';
import roleUtils from '../role/role.utils';
import roleConstant from '../role/role.constant';
import StatusCode_Constant from '../../../constant/StatusCode.constant';

class AuthController {
  private static GenToken(userId: string, roleId: string): string {
    return JwtUtils.generateToken(
      {
        userId,
        roleId,
      },
      '1d', // Token expiration time
    );
  }

  private static setTokenCookie(res: Response, token: string): void {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.header('Authorization', `Bearer ${token}`);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const { email, password } = LoginValidator.parse(req.body);

      // Find user by email
      const findUser = await userUtils.findUserByEmail(String(email));
      if (!findUser) {
       throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      // Find role by ID
      const findRole = await roleUtils.FIND_ROLE_BY_ID(String(findUser.role));
      if (!findRole) {
       throw new Error(roleConstant.ROLE_NOT_FOUND);
      }

      // Validate password
      const isPasswordValid = await AuthUtils.comparePasswords({
        hashedPassword: findUser.password || '',
        plainPassword: String(password) || '', // Ensure password is a string
      });
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate token
      const token = AuthController.GenToken(String(findUser._id), String(findRole._id));

      // Set token in cookies and headers
      AuthController.setTokenCookie(res, token);

      // Send success response
      SendResponse.success(res, StatusCode_Constant.OK, AuthConstant.LOGIN_SUCCESS, {
        user: {
          _id: findUser._id,
          name: findUser.name,
          email: findUser.email,
          role: findRole.name,
        },
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const zodMessage = error.errors.map((err) => err.message).join(', ');
        SendResponse.error(res, StatusCode_Constant.BAD_REQUEST, zodMessage);
      }

      // Handle other errors
      SendResponse.error(
        res,
        StatusCode_Constant.INTERNAL_SERVER_ERROR,
        error.message || AuthConstant.LOGIN_ERROR,
      );
    }
  }
}

export default new AuthController();
