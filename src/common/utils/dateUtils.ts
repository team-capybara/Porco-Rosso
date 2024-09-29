// datetime(yyyyMMddHHmmss) -> 년월일. 없으면 오늘 날짜
export const getDateFromDatetime = (datetime?: string) => {
  return `${datetime?.slice(0, 4) ?? new Date().getFullYear()}년 ${datetime?.slice(4, 6) ?? new Date().getMonth() + 1}월 ${datetime?.slice(6, 8) ?? new Date().getDate()}일`;
};

// date 객체 -> yyyyMMdd
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1-based index
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

// yyyyMMdd => date 객체
export const parseYYYYMMDDToDate = (yyyyMMdd: string): Date => {
  const year = parseInt(yyyyMMdd.substring(0, 4), 10);
  const month = parseInt(yyyyMMdd.substring(4, 6), 10) - 1; // 0-based index for month
  const day = parseInt(yyyyMMdd.substring(6, 8), 10);

  return new Date(year, month, day);
};
