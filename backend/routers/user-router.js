import { Router } from 'express';
import { userService } from '../services/user-service';
import is from '@sindresorhus/is';

const userRouter = Router();

userRouter.post('/email-auth', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
      }
      const { email } = req.body;

      // 인증 코드 발송
      await userService.sendEmailAuthCode(email);

      res.status(200).json({ deadline: 3 });
   } catch (err) {
      next(err);
   }
});

userRouter.post('/', async (req, res, next) => {
   try {
      console.log('Request :', req.body);
      const newUser = await userService.addUser({
         name: 'test',
         email: 'test@test.com',
         password: 'password',
      });
      res.status(200).json({ test: 'hi' });
   } catch (err) {
      next(err);
   }
});

export { userRouter };
