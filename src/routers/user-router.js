import { Router } from 'express';

const userRouter = Router();

userRouter.post('/login', async (req, res, next) => {
   try {
      res.status(200).json({ test: 'hi' });
   } catch (err) {
      next(err);
   }
});

export { userRouter };
