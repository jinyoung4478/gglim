import Header from '/views/components/Header.js';
import Square from '/views/pages/Square.js';
import Home from '/views/pages/Home.js';
import Chat from '/views/pages/Chat.js';
import Settings from '/views/pages/Settings.js';
import NotFound from '/views/pages/NotFound.js';

const routes = [
   { path: '/', view: Home },
   { path: '/square', view: Square },
   { path: '/settings', view: Settings },
   { path: '/chat', view: Chat },
];

const Router = async () => {
   const match = routes.find(route => route.path === location.pathname);
   const page = match ? match.view : NotFound;

   // render
   const header = await Header.render();
   const main = await page.render();
   const contents = header + main;
   document.querySelector('#root').innerHTML = contents;

   // script
   Header.funtion();
   page.function();
};

export default Router;
