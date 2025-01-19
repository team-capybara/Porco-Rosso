// 뒤로가기 및 메인으로 가기
const onPopBridge = () => {
  window.kmpJsBridge.callNative('onPop', '');
};

export { onPopBridge };
