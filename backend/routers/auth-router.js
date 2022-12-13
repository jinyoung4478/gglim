import { Router } from 'express';
import { authService, userService } from '../services/auth-service';
import { loginRequired } from '../middlewares';
import is from '@sindresorhus/is';

const authRouter = Router();

// 이메일 인증코드 발송
authRouter.post('/email', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         const error = new Error('headers의 Content-Type을 application/json으로 설정해주세요');
         error.status = 400;
         throw error;
      }
      const { email } = req.body;
      // 인증 코드 발송
      await authService.sendEmailAuthCode(email);

      res.status(200).json({ deadline: 3 });
   } catch (err) {
      next(err);
   }
});

// 이메일 인증코드 확인
authRouter.post('/code', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         const error = new Error('headers의 Content-Type을 application/json으로 설정해주세요');
         error.status = 400;
         throw error;
      }
      const { email, code } = req.body;
      await authService.checkEmailAuthCode({ email, code });
      res.status(200).json({ email });
   } catch (err) {
      next(err);
   }
});

// 로그인
authRouter.post('/login', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
      }

      const { email, password } = req.body;

      //const userToken = await authService.loginUser({ email, password });
      const user = await authService.loginUser({ email, password });

      res.status(200).json(user);
   } catch (err) {
      next(err);
   }
});

// Token 유효성 판별
authRouter.get('/', loginRequired, async (req, res, next) => {
   try {
      console.log('uerid =', req.currentUserId);
      const userId = req.currentUserId;
      res.state(200).json({ userId });
   } catch (err) {}
});

export { authRouter };
