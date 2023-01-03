import Router from '/frontend/Router.js';

const navigate = path => {
   // console.clear();
   // 새로운 url일 경우
   if (path) history.pushState(null, null, path);

   // 렌더링
   Router();
};

export default navigate;
