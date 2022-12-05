import Router from './Router.js';

// 뒤로 가기 시 렌더링
window.addEventListener('popstate', () => {
   Router();
});

// SPA 동작
document.addEventListener('DOMContentLoaded', () => {
   document.body.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
         e.preventDefault();
         history.pushState(null, null, e.target.href);
         Router();
      }
   });
   Router();
});
