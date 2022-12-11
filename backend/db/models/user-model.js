import { model } from 'mongoose';
import { UserSchema, EmailAuthSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);
const EmailAuth = model('email-auth', EmailAuthSchema);

class UserModel {
   async findEmailAuthByEmail(email) {
      const emailAuth = await EmailAuth.findOne({ email }).sort({ createdAt: -1 });
      return emailAuth;
   }

   async createEmailAuth(email, code) {
      const emailAuth = await EmailAuth.create({ email, code });
      return emailAuth;
   }

   async findByEmail(email) {
      const user = await User.findOne({ email });
      return user;
   }

   async create(userInfo) {
      const createdNewUser = await User.create(userInfo);
      return createdNewUser;
   }
}

const userModel = new UserModel();

export { userModel };
