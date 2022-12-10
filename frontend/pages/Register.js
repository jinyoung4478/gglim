import * as API from '/services/api.js';
import { validateEmail, validateEmailCode, formatEmailCode, validatePassword } from '/utils/validate.js';
import navigate from '/utils/navigate.js';

const Register = {
   template: () => {
      return `
      <main class="register-container">
         <div class="register-wrapper">
            <h2 class="register-title">이메일 간편가입</h2>
            
            <!-- Register Form -->
            <form class="register-form">
               <div class="register-form__wrapper">
                  <p class="register-form__head">이메일</p>
                  <div class="register-form__wrapper-email">
                     <input
                        type="email"
                        class="register-input register-email"
                        id="register-email"
                        placeholder="이메일 계정"
                     />
                     <button id="register-email-button" class="register-input__button" disabled>
                        인증하기
                     </button>
                  </div>
                  <p id="register-email-message" class="register-validate-message">
                     이메일 정보를 입력해 주세요
                  </p>
                  <div id="register-email-code-wrapper" class="register-form__wrapper-email">
                     <div class="register-form__wrapper-email">
                        <input
                           type="text"
                           maxlength="6"
                           id="register-email-code"
                           class="register-input register-email"
                           placeholder="인증번호 입력"
                        />
                        <span id="register-timer"></span>
                        <button id="register-email-code-button" class="register-input__button" disabled>
                           확인
                        </button>
                     </div>
                     <p id="register-email-code-message" class="register-validate-message">
                        인증번호 6자리를 입력하세요.
                     </p>
                  </div>
               </div>
               <div class="register-form__wrapper">
                  <p class="register-form__head">닉네임</p>
                  <input
                     id="register-name"
                     type="text"
                     class="register-input"
                     placeholder="닉네임 입력" 
                     autocomplete="off"
                  />
                  <p id="register-name-message" class="register-validate-message"></p>
               </div>
               <div class="register-form__wrapper">
                  <p class="register-form__head">비밀번호</p>
                  <div class="register-password-wrapper">
                     <input
                        type="password"
                        class="register-input register-input-password"
                        placeholder="비밀번호 입력"
                        data-id="password"
                        autocomplete="off"
                     />
                     <p class="register-validate-message register-password-message" data-id="password-message">123</p>
                     <input
                        type="password"
                        class="register-input register-input-password"
                        placeholder="비밀번호 확인"
                        data-id="newPassword"
                        autocomplete="new-password"
                     />
                     <p class="register-validate-message register-password-message" data-id="newPassword-message">123</p>
                  </div>
               </div>
               <button class="register-complete" data-id="complete">완료</button>
            </form>
            <p class="register-login">
               이미 계정이 있나요?
               <a href="/login" class="register-login__highlight" data-link>
                  로그인
               </a>
            </p>
         </div>
      </main>`;
   },
   script: () => {
      const emailCodeWrapper = document.querySelector('#register-email-code-wrapper');
      const emailInput = document.querySelector('#register-email');
      const emailButton = document.querySelector('#register-email-button');
      const emailMessage = document.querySelector('#register-email-message');
      const emailCodeInput = document.querySelector('#register-email-code');
      const emailCodeButton = document.querySelector('#register-email-code-button');
      const emailCodeTimer = document.querySelector('#register-timer');
      const emailCodeMessage = document.querySelector('#register-email-code-message');
      const nameInput = document.querySelector('#register-name');
      const nameMessage = document.querySelector('#register-name-message');
      const passwordInput = document.querySelector("[data-id='password']");
      const passwordMessage = document.querySelector("[data-id='password-message']");
      const newPasswordInput = document.querySelector("[data-id='newPassword']");
      const newPasswordMessage = document.querySelector("[data-id='newPassword-message']");
      const completeButton = document.querySelector("[data-id='complete']");

      let timer = null;
      let email;
      let formData = new Object();

      initAllElements();
      addAllEvents();

      function initAllElements() {
         emailCodeWrapper.style.display = 'none';
         emailMessage.style.display = 'none';
         nameMessage.style.display = 'none';
         passwordMessage.style.display = 'none';
         newPasswordMessage.style.display = 'none';
      }

      function addAllEvents() {
         // Email Input
         emailInput.addEventListener('input', handleEmailInput);
         // Email Auth Button
         emailButton.addEventListener('click', handleEmailButton);
         // Email Code Input
         emailCodeInput.addEventListener('input', handleEmailCodeInput);
         // Email Code Check Button
         emailCodeButton.addEventListener('click', handleEmailCodeButton);
         // Name Input
         nameInput.addEventListener('focusout', handleNameInput);
         // Password Input
         passwordInput.addEventListener('focusout', handlePasswordInput);
         // New Password Input
         newPasswordInput.addEventListener('focusout', handleNewPasswordInput);
         // Complete Button
         completeButton.addEventListener('click', handleSubmitButton);
      }

      function handleEmailInput(e) {
         e.preventDefault();
         email = e.target.value;
         const isValide = validateEmail(email);
         if (!isValide) {
            emailInput.style['border-color'] = '#f66';
            emailMessage.style.display = 'block';
            emailMessage.style.color = '#f66';
            emailMessage.innerText = '이메일 정보를 입력해 주세요';
            emailButton.setAttribute('disabled', '');
         } else {
            emailInput.style['border-color'] = null;
            emailMessage.style.display = 'none';
            emailButton.removeAttribute('disabled');
         }
      }

      async function handleEmailButton(e) {
         e.preventDefault();
         // Request email authentication code
         email = emailInput.value;

         if (emailButton.innerText === '변경하기') {
            delete formData.email;
            emailInput.style['border-color'] = null;
            emailInput.style['background-color'] = null;
            emailInput.removeAttribute('disabled');
            emailInput.focus();
            emailButton.innerText = '인증하기';
            emailButton.style['background-color'] = null;
            emailButton.style['border'] = null;
            emailButton.style['color'] = null;
            emailMessage.style.display = 'none';
            emailButton.removeAttribute('disabled');
            return;
         }

         const res = await API.post('/api/users/email-auth', { email });
         if (res.error) {
            emailInput.style['border-color'] = '#f66';
            emailMessage.style.display = 'block';
            emailMessage.style.color = '#f66';
            emailMessage.innerText = res.message;
            return;
         }
         // Show email authentication code form
         emailButton.innerText = '재전송';
         emailButton.style['background-color'] = 'transparent';
         emailButton.style['border'] = '1px solid #cdd3d8';
         emailButton.style['color'] = '#495057';
         emailCodeWrapper.style.display = 'block';

         const deadline = res.deadline;

         emailCodeInput.focus();

         // Timer
         let timeout = deadline * 60;
         let min = '';
         let sec = '';
         // 재전송 버튼 클릭 시 이전 타이머 클리어
         if (timer !== null) {
            try {
               emailCodeTimer.innerText = '';
               emailCodeInput.removeAttribute('disabled');
               emailCodeInput.style['border-color'] = null;
               emailCodeButton.removeAttribute('disabled');
               emailCodeMessage.style.color = null;
               emailCodeMessage.innerText = '인증번호 6자리를 입력하세요.';
               clearInterval(timer);
               timer = null;
            } catch (err) {
               console.error(err);
            }
         }
         timer = setInterval(() => {
            min = parseInt(timeout / 60);
            sec = ('00' + (timeout % 60)).slice(-2);
            emailCodeTimer.innerText = `${min}:${sec}`;
            timeout -= 1;
            // Timeover
            if (timeout < 0) {
               clearInterval(timer);
               emailCodeInput.setAttribute('disabled', '');
               emailCodeInput.style['border-color'] = '#f66';
               emailCodeButton.setAttribute('disabled', '');
               emailCodeMessage.style.color = '#f66';
               emailCodeMessage.innerText = '인증 유효 시간을 초과했습니다. 다시 시도해 주세요.';
            }
         }, 1000);
      }

      function handleEmailCodeInput(e) {
         e.preventDefault();
         const code = e.target.value;
         // 이메일 인증 코드 6자리 형식 자동 포맷
         emailCodeInput.value = formatEmailCode(code);
         // 이메일 인증 코드 유효성 검증
         const isValid = validateEmailCode(code);
         if (isValid) {
            emailCodeInput.style['border-color'] = null;
            emailCodeMessage.style.color = null;
            emailCodeMessage.innerText = '인증번호 6자리를 입력하세요.';
            emailCodeButton.removeAttribute('disabled');
         } else {
            emailCodeInput.style['border-color'] = '#f66';
            emailCodeMessage.style.color = '#f66';
            emailCodeMessage.innerText = '인증번호를 정확히 입력해 주세요.';
            emailCodeButton.setAttribute('disabled', '');
         }
      }

      async function handleEmailCodeButton(e) {
         e.preventDefault();
         // 최종 Email Code 유효성 검사
         const code = emailCodeInput.value;
         // 이메일 인증 코드 유효성 검증
         const isValid = validateEmailCode(code);
         if (isValid) {
            // 인증 코드 확인 API 호출
            const res = await API.post('/api/users/code', { email, code });
            // 실패 시
            // 실패 안내 팝업 메세지 발생
            if (res.error) {
               emailCodeInput.style['border-color'] = '#f66';
               emailCodeMessage.style.color = '#f66';
               emailCodeMessage.innerText = '인증번호를 정확히 입력해 주세요.';
               emailCodeButton.setAttribute('disabled', '');
               emailCodeInput.focus();
               return;
            }
            // 인증 성공
            emailCodeWrapper.style.display = 'none';
            emailInput.setAttribute('disabled', '');
            emailInput.style['border-color'] = null;
            emailInput.style['background-color'] = '#f8f9fa';
            emailButton.innerText = '변경하기';
            passwordInput.removeAttribute('disabled');
            newPasswordInput.removeAttribute('disabled');
            formData.email = email;
         }
      }

      function handleNameInput(e) {
         e.preventDefault();
         const name = e.target.value;
         if (name.length < 2) {
            nameInput.style['border-color'] = '#f66';
            nameMessage.style.display = 'block';
            nameMessage.innerText = '최소 2자 이상입니다.';
            delete formData.name;
            return;
         }
         if (name.length > 20) {
            nameInput.style['border-color'] = '#f66';
            nameMessage.style.display = 'block';
            nameMessage.innerText = '닉네임 최대 길이는 20자 입니다. 확인해 주세요.';
            delete formData.name;
            return;
         }
         nameInput.style['border-color'] = null;
         nameMessage.style.display = 'none';
         formData.name = name;
      }

      function handlePasswordInput(e) {
         e.preventDefault();
         const password = e.target.value;
         if (password.length < 8) {
            passwordInput.style['border-color'] = '#f66';
            passwordMessage.style.display = 'block';
            passwordMessage.innerText = '최소 8자입니다.';
            return;
         }
         if (password.length > 20) {
            passwordInput.style['border-color'] = '#f66';
            passwordMessage.style.display = 'block';
            passwordMessage.innerText = '최대 20자입니다.';
            return;
         }

         const isValid = validatePassword(password);
         if (!isValid) {
            passwordInput.style['border-color'] = '#f66';
            passwordMessage.style.display = 'block';
            passwordMessage.innerText = '영문,숫자,특수문자를 조합한 8자 이상';
            return;
         }
         passwordInput.style['border-color'] = null;
         passwordMessage.style.display = 'none';
         //
      }

      function handleNewPasswordInput(e) {
         e.preventDefault();
         const password = passwordInput.value;
         const newPassword = e.target.value;
         if (password !== newPassword) {
            newPasswordInput.style['border-color'] = '#f66';
            newPasswordMessage.style.display = 'block';
            newPasswordMessage.innerText = '동일한 비밀번호를 입력해주세요.';
            return;
         }
         newPasswordInput.style['border-color'] = null;
         newPasswordMessage.style.display = 'none';
      }

      async function handleSubmitButton(e) {
         e.preventDefault();

         // 이메일 확인
         if (!formData.email) {
            emailInput.style['border-color'] = '#f66';
            emailInput.focus();
            emailMessage.style.display = 'block';
            emailMessage.style.color = '#f66';
            emailMessage.innerText = '이메일 인증이 필요합니다.';
            return;
         }
         if (!formData.name) {
            nameInput.style['border-color'] = '#f66';
            emailInput.focus();
            nameMessage.style.display = 'block';
            nameMessage.innerText = '닉네임을 확인해주세요.';
            return;
         }
         const password = passwordInput.value;
         const isValid = validatePassword(password);
         if (!isValid) {
            passwordInput.style['border-color'] = '#f66';
            passwordInput.focus();
            passwordMessage.style.display = 'block';
            passwordMessage.innerText = '비밀번호를 올바르게 설정해주세요.';
            return;
         }
         const newPassword = newPasswordInput.value;
         if (password !== newPassword) {
            newPasswordInput.style['border-color'] = '#f66';
            newPasswordInput.focus();
            newPasswordMessage.style.display = 'block';
            newPasswordMessage.innerText = '동일한 비밀번호를 입력해주세요.';
            return;
         }
         // 유효성 검증 완료
         formData.password = password;

         const res = await API.post('/api/users/', formData);

         if (res.error) {
            alert(`Error 발생: ${res.message}`);
            return;
         }

         navigate('/login');
      }
   },
};

export default Register;
