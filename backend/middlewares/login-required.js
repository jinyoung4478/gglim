import jwt from 'jsonwebtoken';

function loginRequired(req, _, next) {
   const userToken = req.headers['authorization']?.split(' ')[1];
   if (!userToken || userToken === 'null') {
      console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
      const error = new Error('로그인한 유저만 사용할 수 있는 서비스입니다.');
      error.status = 403;
      throw error;
   }
   try {
      const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
      const jwtDecoded = jwt.verify(userToken, secretKey);

      const userId = jwtDecoded.userId;
      const role = jwtDecoded.role;

      req.currentUserId = userId;
      req.currentRole = role;

      next();
   } catch (err) {
      if (err.name === 'TokenExpiredError') {
         // 유효기간 초과
         console.log('토큰 기간 만료');
         const error = new Error('토큰이 만료되었습니다.');
         error.status = 401;
         throw error;
         // front에서 해야할 처리
         // removeItem token
         // sessionStorage.removeItem('token');
      }
      const error = new Error('유효하지 않은 토큰입니다.');
      error.status = 401;
      throw error;
   }
}

export { loginRequired };
