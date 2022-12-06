import Navigation from '/views/components/Navigation.js';

const Header = {
   funtion: () => {
      const toggleBtn = document.querySelector('.gnb__toggle-button');
      const closeBtn = document.querySelector('.gnb__close-button');
      const nav = document.querySelector('.gnb__nav');
      toggleBtn.addEventListener('click', () => {
         nav.classList.add('active');
         toggleBtn.style.display = 'none';
         closeBtn.style.display = 'block';
      });
      closeBtn.addEventListener('click', () => {
         nav.classList.remove('active');
         toggleBtn.style.display = 'block';
         closeBtn.style.display = 'none';
      });
      Navigation.function();
   },
   render: () => {
      return `
         <header>
             <div class="header">
                 <div class="header__logo">
                     <a href="/">
                         <img src="/views/public/img/gglim-logo.png" alt="끌림" />
                     </a>
                 </div>
                 <div class="header__auth">
                     <ul>
                         <li><a href="#">이용방법</a></li>
                         <li><a href="#">로그인</a></li>
                         <li><a href="#">회원가입</a></li>
                     </ul>
                     <div id="gnb__buttons">
                        <button class="gnb__toggle-button"><i class="fa-solid fa-bars"></i></button>
                        <button class="gnb__close-button"><i class="fa-solid fa-xmark"></i></button>
                     </div>
                 </div>
             </div>
             <div class="gnb">
                 ${Navigation.render()}
             </div>
         </header>
         `;
   },
};

export default Header;
