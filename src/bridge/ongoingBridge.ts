// 진행 중 모임에서 카메라 클릭
export const onNavigateCamera = (moimId: number) => {
  window.kmpJsBridge.callNative(
    'onNavigateCamera',
    JSON.stringify({ moimId: moimId })
  );
};
