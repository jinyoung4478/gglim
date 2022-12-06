const Login = {
   template: () => {
      return `
         <main class="login-container">
            <div class="login-wrapper">
               <h2 class="login-title">로그인</h2>
               <form class="login-form">
                  <input type="email" class="login-form__input" placeholder="이메일" autocomplete="false">
                  <input type="password" class="login-form__input" placeholder="비밀번호" autocomplete="off">
                  <p class="login-forgot"><a href="#">로그인 정보를 잊으셨나요?</a></p>
                  <button class="login-login__button">로그인</button
               </form>
               <div class="login-social">
                  <button class="login-social__button social-google">
                     ${svgImgs.google}
                  </button>
                  <button class="login-social__button social-kakao">
                     ${svgImgs.kakao}
                  </button>
                  <button class="login-social__button social-github">
                     ${svgImgs.github}
                  </button>
               </div>
               <div class="login-register">
                  <p>계정이 없으신가요?
                     <a href="#" data-link>
                        <p class="login-register__highlight" data-link>회원가입</p>
                     </a>
                  </p>
               </div>
            </div>
         </main>
      `;
   },
   script: () => {},
};

export default Login;

const svgImgs = {
   google: `
   <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
   <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4" />
   <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853" />
   <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05" />
   <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335" />
   <path d="M1 1h22v22H1z" fill="none" />
   </svg>
   `,
   kakao: `
   <svg width="24" height="24" viewBox="0 0 99.61801 92.147011">
      <g id="g686" transform="matrix(1,0,0,-1,-362.26358,234.09895)">
         <g clip-path="url(#clipPath692)" id="g688">
            <g transform="translate(163.2612,376.6777)" id="g694">
               <path
                  id="path696"
                  style="fill: #3c1e1e; fill-opacity: 1; fill-rule: nonzero; stroke: none"
                  d="m 248.81039,-143.57875 c -26.953,0 -48.80801,-17.256 -48.80801,-38.555 0,-13.68101 9.05201,-25.69301 22.64601,-32.54901 l -4.599,-17.167 c -0.176,-0.527 -0.03,-1.085 0.352,-1.465 0.263,-0.265 0.614,-0.411 0.995,-0.411 0.294,0 0.586,0.117 0.85,0.322 l 19.775,13.36 c 2.872,-0.41 5.802,-0.644 8.789,-0.644 26.953,0 48.81,17.255 48.81,38.55401 0,21.299 -21.857,38.555 -48.81,38.555"
                  inkscape:connector-curvature="0" />
            </g>
         </g>
      </g>
   </svg>
   `,
   github: `
   <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
   </svg>
   `,
};
