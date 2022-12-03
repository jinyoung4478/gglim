import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('home'));

function serveStatic(resource) {
   console.log('hi');
   const resourcePath = path.join(__dirname, `../views/${resource}`);
   const option = { index: `${resource}.html` };

   // express.static 은 express 가 기본으로 제공하는 함수임
   return express.static(resourcePath, option);
}

export { viewsRouter };
