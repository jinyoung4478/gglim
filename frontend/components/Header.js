import * as API from '/services/api.js';
import Navigation from '/components/Navigation.js';
import navigate from '/utils/navigate.js';

const Header = {
   template: () => {
      let isAuth;
      if (location.pathname === '/login' || location.pathname === '/register') {
         isAuth = true;
      }

      let isLoggedIn;
      const token = sessionStorage.getItem('token');
      if (token) {
         isLoggedIn = true;
         // const res = verifyToken();
         // console.log(res);

         // if (res.error) {
         //    console.log(res.message); // 유효하지 않은 토큰입니다.
         //    sessionStorage.removeItem('token');
         //    isLoggedIn = false;
         // }
      }

      function renderHeaderList() {
         const headerList = !isLoggedIn
            ? `
                <li><a href="#" data-link>이용수칙</a></li>
                <li><a href="/login" data-link>로그인</a></li>
                <li><a href="/register" data-link>회원가입</a></li>
                `
            : `
                <li><a href="#" data-link>포인트: 1,000P</a></li>
                <li><a href="#" data-link>마이페이지</a></li>
                <li><a href="#" data-id="logout">로그아웃</a></li>
            `;
         return headerList;
      }

      function renderToggleButon() {
         if (isAuth) return '';
         return `
            <div id="gnb__buttons">
                <button class="gnb__toggle-button"><i class="fa-solid fa-bars"></i></button>
                <button class="gnb__close-button"><i class="fa-solid fa-xmark"></i></button>
            </div>
            `;
      }

      return `
            <header>
                <div class="header">
                    <h1 class="header__logo">
                    <a href="/" data-link>
                        <label>끌림</label>
                        <img src="/public/img/gglim-logo.png" alt="끌림" data-link/>
                    </a>
                </h1>
                <div class="header__auth">
                    <ul>
                        ${renderHeaderList()}
                    </ul>
                    ${renderToggleButon()}
                </div>
            </div>
            ${!isAuth ? Navigation.template() : ''}
        </header>
        `;
   },
   script: () => {
      let isAuth;
      if (location.pathname === '/login' || location.pathname === '/register') {
         isAuth = true;
      }

      // 컴포넌트 스크립트 실행
      if (!isAuth) Navigation.script();

      const toggleBtn = document.querySelector('.gnb__toggle-button');
      const closeBtn = document.querySelector('.gnb__close-button');
      const nav = document.querySelector('.gnb__nav');
      const logoutButton = document.querySelector("[data-id='logout']");

      if (!isAuth) {
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

      if (logoutButton) {
         logoutButton.addEventListener('click', handleLogoutButton);
      }

      function handleLogoutButton(e) {
         e.preventDefault();
         console.log('HELlo');
         sessionStorage.removeItem('token');
         navigate('/');
      }
   },
};

export default Header;
