interface Window {
  kmpJsBridge: {
    callNative: (
      action: string,
      payload: string,
      callback?: (data: string) => void // 콜백 함수를 optional로 정의
    ) => void;
  };
  setAccessToken: (string) => void;
}
