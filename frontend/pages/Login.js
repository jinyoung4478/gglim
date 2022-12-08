import * as API from '/services/api.js';

const Login = {
   template: () => {
      return `
         <main class="login-container">
            <div class="login-wrapper">
               <h2 class="login-title">로그인</h2>
               <form class="login-form">
                  <input
                     type="email"
                     class="login-form__input"
                     placeholder="이메일"
                  />
                  <input
                     type="password"
                     class="login-form__input"
                     placeholder="비밀번호"
                     autocomplete="new-password"
                  />
                  <p class="login-forgot">
                     <a href="#">로그인 정보를 잊으셨나요?</a>
                  </p>
                  <button id="login-button" class="login-login__button">로그인</button
               </form>
               <div class="login-social">
                  <button class="login-social__button social-google">
                     <img src="/public/img/google-logo.svg" />
                  </button>
                  <button class="login-social__button social-kakao">
                     <img src="/public/img/kakao-logo.svg" />
                  </button>
                  <button class="login-social__button social-github">
                     <img src="/public/img/github-logo.svg" />
                  </button>
               </div>
               <div class="login-register">
                  <p>계정이 없으신가요?
                     <a href="/register" data-link>
                        <p class="login-register__highlight" data-link>회원가입</p>
                     </a>
                  </p>
               </div>
            </div>
         </main>
      `;
   },
   script: () => {
      const handleLoginButton = () => {
         const data = API.post('/api/users/login', { test: 'test' });
      };
      const loginButton = document.getElementById('login-button');
      loginButton.addEventListener('click', handleLoginButton);
   },
};

export default Login;
