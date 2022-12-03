import Home from './pages/Home.js';
import Posts from './pages/Posts.js';
import Settings from './pages/Settings.js';
import NotFound from './pages/NotFound.js';
import Square from './pages/Square.js';

const Router = () => {
   const routes = [
      { path: '/', view: Home },
      { path: '/posts', view: Posts },
      { path: '/settings', view: Settings },
      { path: '/square', view: Square },
   ];

   const match = routes.find(route => route.path === location.pathname);
   const page = match ? match.view : NotFound;

   document.querySelector('#root').innerHTML = page();
};

export default Router;
