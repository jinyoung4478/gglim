import * as API from '/services/api.js';
import Navigation from '/components/Navigation.js';
import navigate from '/utils/navigate.js';

const Header = {
   template: type => {
      let isLoggedIn;
      const token = sessionStorage.getItem('token');
      if (token) {
         //const res = API.get('/api/auth'); // 유저 기본 정보 get
         isLoggedIn = true;
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
                <li><a href="/login" data-link>마이페이지</a></li>
                <li><a href="#" data-id="logout">로그아웃</a></li>
            `;
         return headerList;
      }

      function renderToggleButon() {
         if (type === 'auth') return '';
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
            ${type !== 'auth' ? Navigation.template() : ''}
        </header>
        `;
   },
   script: type => {
      // 컴포넌트 스크립트 실행
      if (type !== 'auth') Navigation.script();

      const toggleBtn = document.querySelector('.gnb__toggle-button');
      const closeBtn = document.querySelector('.gnb__close-button');
      const nav = document.querySelector('.gnb__nav');
      const logoutButton = document.querySelector("[data-id='logout']");

      if (type !== 'auth') {
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
         sessionStorage.removeItem('token');
         navigate('/');
      }
   },
};

export default Header;
