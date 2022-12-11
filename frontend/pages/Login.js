import * as API from '/services/api.js';
import navigate from '/utils/navigate.js';
import { validateEmail } from '/utils/validate.js';

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
                     data-id="email"
                  />
                  <p class="login-validate-message" data-id="email-message"></p>
                  <input
                     type="password"
                     class="login-form__input"
                     placeholder="비밀번호"
                     autocomplete="new-password"
                     data-id="password"
                  />
                  <p class="login-validate-message" data-id="password-message"></p>
                  <p class="login-forgot">
                     <a href="#">로그인 정보를 잊으셨나요?</a>
                  </p>
                  <button class="login-login__button" data-id="login-button">로그인</button
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
      const emailInput = document.querySelector("[data-id='email']");
      const emailMessage = document.querySelector("[data-id='email-message']");
      const passwordInput = document.querySelector("[data-id='password']");
      const passwordMessage = document.querySelector("[data-id='password-message']");
      const loginButton = document.querySelector("[data-id='login-button']");

      initAllElements();
      addAllEvents();

      function initAllElements() {
         emailMessage.style.display = 'none';
         passwordMessage.style.display = 'none';
      }

      function addAllEvents() {
         emailInput.addEventListener('focusout', handleEmailInput);
         loginButton.addEventListener('click', handleLoginButton);
      }

      function handleEmailInput(e) {
         e.preventDefault();
         const email = e.target.value;
         const isValide = validateEmail(email);
         if (!isValide) {
            emailInput.style['border-color'] = '#f66';
            emailInput.style['background-color'] = '#ff9b9b0f';
            emailMessage.style.display = 'block';
            emailMessage.innerText = '이메일 형식이 올바르지 않습니다.';
         } else {
            emailInput.style['border-color'] = null;
            emailInput.style['background-color'] = null;
            emailMessage.style.display = 'none';
         }
      }

      async function handleLoginButton(e) {
         e.preventDefault();
         const email = emailInput.value;
         const password = passwordInput.value;

         const res = await API.post('/api/auth/login', { email, password });
         if (res.error) {
            sessionStorage.removeItem('token');
            emailInput.style['border-color'] = '#f66';
            emailInput.style['background-color'] = '#ff9b9b0f';
            passwordInput.style['border-color'] = '#f66';
            passwordInput.style['background-color'] = '#ff9b9b0f';
            passwordMessage.style.display = 'block';
            passwordMessage.innerText = res.message;
            return;
         }
         const token = res.token;
         sessionStorage.setItem('token', token);

         navigate('http://localhost:3000/');
      }
   },
};

export default Login;
