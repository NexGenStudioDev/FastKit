import { Request, Response } from "express";
import JwtUtils from "../../../utils/Jwt.utils";
import userUtils from "../user/user.utils";
import { LoginValidator } from "./Auth.validator";
import AuthConstant from "./Auth.constant";
import StatusCode_Constant from "../../../constant/StatusCode.constant";
import SendResponse from "../../../utils/SendResponse";
import AuthUtils from "./Auth.utils";
import { ZodError } from "zod";
import roleUtils from "../role/role.utils";
import roleConstant from "../role/role.constant";

class AuthController {


  private static GenToken(userId: string, roleId: string): string {
    return JwtUtils.generateToken({
      userId: userId,
      roleId: roleId,
    }, "1d");

  }


  private static setTokenCookie(res: Response , token: string): void {
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      secure: true,          // Sends the cookie only over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.header("Authorization", `Bearer ${token}`);
  }

  // private static verifyToken(token: string): Promise<any> {
  //   return JwtUtils.verifyToken(token);
  // }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = LoginValidator.parse(req.body);

      const findUser = await userUtils.findUserByEmail(email);

      if (!findUser) {
        throw new Error(AuthConstant.USER_NOT_FOUND);
      }

      const findRole = await roleUtils.FIND_ROLE_BY_ID(String(findUser.role));

      if (!findRole) {
        throw new Error(roleConstant.ROLE_NOT_FOUND);
      }

      const isPasswordValid = await AuthUtils.comparePasswords({
        hashedPassword: findUser.password || "",
        plainPassword: password,
      });

      if (!isPasswordValid) {
        throw new Error(AuthConstant.INVALID_CREDENTIALS);
      }

      let  token = AuthController.GenToken(String(findUser._id), String(findRole._id));
      
      AuthController.setTokenCookie(res,token);

    

     

      SendResponse.success(
        res,
        StatusCode_Constant.OK,
        AuthConstant.LOGIN_SUCCESS,
        {
          user: {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findRole.name,
          },
        }
      );
    } catch (error: any) {
     

      if (error instanceof ZodError) {
        const zodMessage = error._zod.def[0].message
        SendResponse.error(res, StatusCode_Constant.BAD_REQUEST, zodMessage);
      }

      SendResponse.error(
        res,
        StatusCode_Constant.BAD_REQUEST,
        error.message || AuthConstant.LOGIN_ERROR
      );
    }
  }
}

export default new AuthController();
