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
   { path: '/', view: Square, type: 'normal' },
   { path: '/login', view: Login, type: 'auth' },
   { path: '/register', view: Register, type: 'auth' },
   { path: '/street', view: Street, type: 'normal' },
   { path: '/store', view: Store, type: 'normal' },
   { path: '/chat', view: Chat, type: 'normal' },
   { path: '/settings', view: Settings, type: 'normal' },
];

const Router = () => {
   const match = routes.find(route => route.path === location.pathname);
   const page = match ? match.view : NotFound;

   // Load Header
   const header = Header.template(match.type);
   // Load Page
   const main = page.template();
   const contents = header + main;
   document.querySelector('#root').innerHTML = contents;

   // script
   Header.script(match.type);
   page.script();
};

export default Router;
