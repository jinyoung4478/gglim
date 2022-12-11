import { userModel } from '../db/models/user-model';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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
      // 가입된 email인지 판별
      const user = await this.userModel.findByEmail(email);
      if (user) {
         const error = new Error('이미 등록된 이메일입니다.');
         error.status = 409;
         throw error;
      }

      // 인증 코드 생성
      const code = String(Math.random()).substring(2, 8);
      console.log('code =', code);
      // 인증 코드 해쉬화
      const hashedCode = await bcrypt.hash(code, 10);
      // 이메일, 해쉬화된 인증 코드 저장
      await this.userModel.createEmailAuth(email, hashedCode);
      setTimeout(async () => {
         const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
               user: process.env.MAILER_USER,
               pass: process.env.MAILER_PASSWORD,
            },
         });

         let message = {
            from: `"GGLIM" ${process.env.MAILER_USER}`,
            to: email,
            subject: '[끌림] 웹사이트 가입 안내',
            html: `
               <h3>인증 번호 : ${code}</h3>
             `,
         };

         await transporter.sendMail(message);
         console.log('인증코드 발송:', email);
      }, 0);
   }

   async checkEmailAuthCode(emailAuth) {
      const { email, code } = emailAuth;
      const auth = await this.userModel.findEmailAuthByEmail(email);
      const correctCode = auth.code;
      const isPasswordCorrect = await bcrypt.compare(code, correctCode);

      if (!isPasswordCorrect) {
         const error = new Error('인증번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.');
         error.status = 400;
         throw error;
      }
      return;
   }
}

const userService = new UserService(userModel);

export { userService };
