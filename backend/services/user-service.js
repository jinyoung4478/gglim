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

   async sendEmailAuthCode(email) {
      console.log('Email = ', email);
      // 가입된 email인지 판별
      const user = await this.userModel.findByEmail(email);
      if (user) {
         const error = new Error('이미 등록된 이메일입니다.');
         error.status = 409;
         throw error;
      }
   }
}

const userService = new UserService(userModel);

export { userService };
