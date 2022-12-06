import Navigation from '/views/components/Navigation.js';

const Header = {
   script: type => {
      if (type !== 'auth') {
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
      }

      Navigation.script();
   },
   template: type => {
      return `
         <header>
             <div class="header">
                 <h1 class="header__logo">
                     <a href="/" data-link>
                         <label>끌림</label>
                         <img src="/views/public/img/gglim-logo.png" alt="끌림" data-link/>
                     </a>
                 </h1>
                 <div class="header__auth">
                     <ul>
                         <li><a href="#" data-link>이용방법</a></li>
                         <li><a href="/login" data-link>로그인</a></li>
                         <li><a href="#" data-link>회원가입</a></li>
                     </ul>
                     ${
                        type !== 'auth'
                           ? `
                            <div id="gnb__buttons">
                                <button class="gnb__toggle-button"><i class="fa-solid fa-bars"></i></button>
                                <button class="gnb__close-button"><i class="fa-solid fa-xmark"></i></button>
                            </div>   
                        `
                           : ''
                     }
                     
                 </div>
             </div>
             ${
                type !== 'auth'
                   ? `
                    <div class="gnb">
                        ${Navigation.template()}
                    </div>
                `
                   : ''
             }
         </header>
         `;
   },
};

export default Header;
