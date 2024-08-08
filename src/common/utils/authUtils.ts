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

export { getCookie, setCookie, getQueryStringValue };
