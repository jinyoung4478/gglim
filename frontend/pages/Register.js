import * as API from '/services/api.js';
import { validateEmail, validateEmailCode, formatEmailCode } from '/utils/validate.js';

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
                  <p class="register-form__head">이름</p>
                  <input type="text" class="register-input" placeholder="이름 입력" />
               </div>
               <div class="register-form__wrapper">
                  <p class="register-form__head">비밀번호</p>
                  <div class="register-password-wrapper">
                     <input
                        type="password"
                        disabled
                        class="register-input register-input-password"
                        placeholder="비밀번호 입력"
                        autocomplete="new-password"
                     />
                     <input
                        type="password"
                        class="register-input register-input-password"
                        placeholder="비밀번호 확인"
                        autocomplete="new-password"
                     />
                  </div>
               </div>
               <button class="register-complete">완료</button>
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
      let timer = null;

      initAllElements();
      addAllEvents();

      function initAllElements() {
         emailCodeWrapper.style.display = 'none';
         emailMessage.style.display = 'none';
         //emailButton.setAttribute('disabled', '');
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
      }

      function handleEmailInput(e) {
         e.preventDefault();
         const email = e.target.value;
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
         const email = emailInput.value;

         const res = await API.post('/api/users/email-auth', { email });
         if (res.error) {
            emailInput.style['border-color'] = '#f66';
            emailMessage.style.display = 'block';
            emailMessage.style.color = '#f66';
            emailMessage.innerText = res.message;
            console.log(res);
            return;
         }
         // Show email authentication code form
         emailButton.innerText = '재전송';
         emailButton.style['background-color'] = 'transparent';
         emailButton.style['border'] = '1px solid #cdd3d8';
         emailButton.style['color'] = '#495057';

         emailCodeWrapper.style.display = 'block';

         //emailMessage.innerText = '이메일 정보를 입력해 주세요';

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
            console.log('Req', code);

            // 인증 코드 확인 API 호출

            // 인증 성공 시
            // 1. emailCodeWrapper display none
            // 2. 재전송 -> 변경하기

            // 실패 시
            // 실패 안내 팝업 메세지 발생
         }
      }
   },
};

export default Register;
