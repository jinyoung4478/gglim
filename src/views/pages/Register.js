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
                     <button id="email-auth-button" class="register-input__button">
                        인증하기
                     </button>
                  </div>
                  <div id="register-email-confirm" class="register-form__wrapper-email">
                     <div class="register-form__wrapper-email">
                        <input
                           type="text"
                           maxlength="6"
                           id="register-email-code"
                           class="register-input register-email"
                           placeholder="인증번호 입력"
                        />
                        <button class="register-input__button">확인</button>
                     </div>
                     <p class="register-email-confirm-message">인증번호 6자리를 입력하세요.</p>
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
      const handleEmailAuthButton = e => {
         e.preventDefault();
         emailConfirmWrapper.style.display = 'block';
         console.log('인증번호 발송');
      };
      const emailConfirmWrapper = document.querySelector('#register-email-confirm');
      emailConfirmWrapper.style.display = 'none';

      const emailAuthButton = document.querySelector('#email-auth-button');

      emailAuthButton.addEventListener('click', handleEmailAuthButton);
   },
};

export default Register;
