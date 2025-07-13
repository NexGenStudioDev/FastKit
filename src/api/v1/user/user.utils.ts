import userModel from "./user.model";
import { IUser } from "./user.type";

class User_Utils {
  // Utility methods for user operations can be added here
   public async findUserByEmail(email: string): Promise<IUser | null> {
   
    return await userModel.findOne({email}).select("+password");;
    
  } 
}

export default new User_Utils();