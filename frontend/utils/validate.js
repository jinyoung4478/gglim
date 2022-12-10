// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = email => {
   const regExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return email.match(regExp);
};

export const validateEmailCode = code => {
   const regExp = /[0-9]{6}$/;
   return code.match(regExp);
};

export const validatePassword = password => {
   const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
   return password.match(regExp);
};

export const formatEmailCode = code => {
   const result = code.replace(/[^0-9]/g, '');
   return result;
};

// 폰 번호 형식 자동 포맷
export function formatPhoneNumber(phoneNumber) {
   const formattedPhoneNumber = phoneNumber
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
   return formattedPhoneNumber;
}
