// 현재 url의 querystring에서 userId 가져오기
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const getmoimId = (location: any) => {
  const queryParams = new URLSearchParams(location.search);
  const moimId = queryParams.get('moimId');
  return Number(moimId);
};
