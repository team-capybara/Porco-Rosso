const getCookie = (name: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // 쿠키 이름이 일치하는 경우 해당 값을 반환
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  // 일치하는 쿠키가 없을 경우 null 반환
  return null;
};

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

const getQueryStringValue = (key: string, url = window.location.href) => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  // 특정 키의 값을 가져옵니다.
  return params.get(key);
};

const textInputValidation = (input: string) => {
  // 허용된 문자: 한글, 영어, 숫자, 공백, 특수 문자 (!@#^%_$), 이모지
  const validCharacters = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9!@#^%_$\s]+$/u;
  if (input.trim() === '') {
    return '닉네임이 공백만으로 이루어질 수 없습니다.';
  }
  if (!validCharacters.test(input)) {
    return '한글/영어/숫자/특수 문자(!@#^%_$)만 사용할 수 있습니다.';
  }
  if (input.length < 1 || input.length > 15) {
    return '글자 수는 1자 이상, 15자 이하여야 합니다.';
  }

  return '';
};

export { getCookie, setCookie, getQueryStringValue, textInputValidation };
