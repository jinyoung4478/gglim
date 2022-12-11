//import Router from '/frontend/Router.js';
import navigate from '/utils/navigate.js';

// 현재 활성화된 히스토리 엔트리 변동 시 렌더링
window.addEventListener('popstate', () => {
   navigate();
});

// SPA 동작
document.body.addEventListener('click', e => {
   // 타겟 요소에 data-link 속성이 없을 경우
   if (!e.target.matches('[data-link]')) return;

   e.preventDefault();

   let path = e.target.href;
   if (path === undefined) {
      // 부모 요소가 anchor 태그가 아닐 경우
      if (e.target.parentElement.tagName !== 'A') return;
      // 부모 요소인 anchor 태그의 href를 path로 지정
      path = e.target.parentElement.href;
   }

   if (e.metaKey) {
      window.open(path, '_blank').focus();
      return;
   }

   if (location.href == path) {
      navigate();
   } else {
      navigate(path);
   }
});

navigate();
