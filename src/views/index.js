import Router from './Router.js';

// 현재 활성화된 히스토리 엔트리 변동 시 렌더링
window.addEventListener('popstate', () => {
   Router();
});

// SPA 동작
document.body.addEventListener('click', e => {
   e.preventDefault();
   if (e.target.matches('[data-link]')) {
      e.preventDefault();

      let path = e.target.href;
      if (path === undefined) {
         if (e.target.parentElement.tagName === 'A') {
            path = e.target.parentElement.href;
         } else {
            return;
         }
      }

      if (location.href !== path) {
         // 새로운 url일 경우
         history.pushState(null, null, path);
      }

      // if (location.href === path) {
      //    // 같은 url일 경우 (같은 history 중복 방지)
      //    //history.replaceState(null, null, e.target.href);
      // } else {
      //    // 새로운 url일 경우
      //    history.pushState(null, null, path);
      // }
      // 렌더링
      Router();
   }
});

Router();
