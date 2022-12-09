import { userModel } from '../db/models/user-model';

class UserService {
   constructor(userModel) {
      this.userModel = userModel;
   }

   async addUser(userInfo) {
      const { email, name, password } = userInfo;

      const newUserInfo = {
         name,
         email,
         password,
      };

      const createdNewUser = await this.userModel.create(newUserInfo);

      return createdNewUser;
   }
}

const userService = new UserService(userModel);

export { userService };
