// datetime(yyyyMMddHHmmss) -> 년월일. 없으면 오늘 날짜
export const getDateFromDatetime = (datetime?: string) => {
  return `${datetime?.slice(0, 4) ?? new Date().getFullYear()}년 ${datetime?.slice(4, 6) ?? new Date().getMonth() + 1}월 ${datetime?.slice(6, 8) ?? new Date().getDate()}일`;
};
