// import Component
import Header from '/components/Header.js';
// imrt Pages
import Login from '/pages/Login.js';
import Register from '/pages/Register.js';
import Square from '/pages/Square.js';
import Street from '/pages/Street.js';
import Chat from '/pages/Chat.js';
import Store from '/pages/Store.js';
import Settings from '/pages/Settings.js';
import NotFound from '/pages/NotFound.js';

const routes = [
   { path: '/', view: Square },
   { path: '/login', view: Login },
   { path: '/register', view: Register },
   { path: '/street', view: Street },
   { path: '/store', view: Store },
   { path: '/chat', view: Chat },
   { path: '/settings', view: Settings },
];

const Router = () => {
   const match = routes.find(route => route.path === location.pathname);
   const page = match ? match.view : NotFound;

   // Load Header
   const header = Header.template();
   // Load Page
   const main = page.template();
   const contents = header + main;
   document.querySelector('#root').innerHTML = contents;

   // script
   Header.script();
   page.script();
};

export default Router;
