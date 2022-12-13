import { userModel } from '../db/models/user-model';
import bcrypt from 'bcrypt';

class UserService {
   constructor(userModel) {
      this.userModel = userModel;
   }
   async addUser(userInfo) {
      const { email, name, password } = userInfo;

      // 이메일 중복 확인
      const user = await this.userModel.findByEmail(email);
      if (user) {
         const error = new Error('이미 등록된 이메일입니다.');
         error.status = 409;
         throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserInfo = {
         name,
         email,
         password: hashedPassword,
      };

      await this.userModel.create(newUserInfo);
      return;
   }
   async getUser(userId) {}
}

const userService = new UserService(userModel);

export { userService };
