import { Router } from 'express';
import { userService } from '../services/user-service';
import is from '@sindresorhus/is';

const userRouter = Router();

// 이메일 인증코드 발송
userRouter.post('/email-auth', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         const error = new Error('headers의 Content-Type을 application/json으로 설정해주세요');
         error.status = 400;
         throw error;
      }
      const { email } = req.body;
      // 인증 코드 발송
      await userService.sendEmailAuthCode(email);

      res.status(200).json({ deadline: 3 });
   } catch (err) {
      next(err);
   }
});

// 이메일 인증코드 확인
userRouter.post('/code', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         const error = new Error('headers의 Content-Type을 application/json으로 설정해주세요');
         error.status = 400;
         throw error;
      }
      const { email, code } = req.body;
      await userService.checkEmailAuthCode({ email, code });
      res.status(200).json({ email });
   } catch (err) {
      next(err);
   }
});

// 회원가입
userRouter.post('/', async (req, res, next) => {
   try {
      console.log('Request :', req.body);
      // const newUser = await userService.addUser({
      //    email: 'test@test.com',
      //    name: 'test',
      //    password: 'password',
      // });
      res.status(200).json({ test: 'hi' });
   } catch (err) {
      next(err);
   }
});

export { userRouter };
