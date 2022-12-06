// import Component
import Header from '/views/components/Header.js';
// imrt Pages
import Login from '/views/pages/Login.js';
import Square from '/views/pages/Square.js';
import Street from '/views/pages/Street.js';
import Chat from '/views/pages/Chat.js';
import Store from '/views/pages/Store.js';
import Settings from '/views/pages/Settings.js';
import NotFound from '/views/pages/NotFound.js';

const routes = [
   { path: '/', view: Square, type: 'normal' },
   { path: '/login', view: Login, type: 'auth' },
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
