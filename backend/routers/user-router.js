import { Router } from 'express';
import { userService } from '../services/user-service';
import is from '@sindresorhus/is';

const userRouter = Router();

// 회원가입 - Add user
userRouter.post('/', async (req, res, next) => {
   try {
      if (is.emptyObject(req.body)) {
         const error = new Error('headers의 Content-Type을 application/json으로 설정해주세요');
         error.status = 400;
         throw error;
      }

      await userService.addUser(req.body);

      res.status(200).json({ status: 200 });
   } catch (err) {
      next(err);
   }
});

export { userRouter };
