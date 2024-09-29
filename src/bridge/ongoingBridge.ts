// 진행 중 모임에서 카메라 클릭
export const goOngoingCamera = (moimId: number) => {
  window.kmpJsBridge.callNative(
    'goOngoingCamera',
    JSON.stringify({ moimId: moimId })
  );
};
