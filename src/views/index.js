import Home from './pages/Home.js';
import Posts from './pages/Posts.js';
import Settings from './pages/Settings.js';
import NotFound from './pages/NotFound.js';
import Square from './pages/Square.js';

const router = () => {
   const routes = [
      { path: '/', view: Home },
      { path: '/posts', view: Posts },
      { path: '/settings', view: Settings },
      { path: '/square', view: Square },
   ];

   const match = routes.find(route => route.path === location.pathname);
   const page = match ? match.view : NotFound;
   //const page = match.view;

   document.querySelector('#root').innerHTML = page();
};

// 뒤로 가기 시 렌더링
window.addEventListener('popstate', () => {
   router();
});

document.addEventListener('DOMContentLoaded', () => {
   document.body.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
         e.preventDefault();
         history.pushState(null, null, e.target.href);
         router();
      }
   });
   router();
});
