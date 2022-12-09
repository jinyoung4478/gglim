import { Router } from 'express';
import { userService } from '../services/user-service';

const userRouter = Router();

userRouter.post('/email-auth', async (req, res, next) => {
   try {
      console.log(req.body);
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
