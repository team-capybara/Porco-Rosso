const goMainAfterCreateMoim = () => {
  console.log('모임 생성 성공 후, 모임 메인으로 가기');
  // 객체가 있을때만 조건분기하는거 꼭 필요한가?
  window.kmpJsBridge.callNative('onCreateMoimSuccess', '');
};

// 뒤로가기 및 메인으로 가기
const onPopBridge = () => {
  window.kmpJsBridge.callNative('onPop', '');
};

export { goMainAfterCreateMoim, onPopBridge };
