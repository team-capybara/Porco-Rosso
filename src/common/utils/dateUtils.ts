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

// yyyyMMddHHmmss => 월요일, 화요일...
export const getDayString = (dateString?: string) => {
  if (dateString === undefined) {
    return '';
  }
  // 연, 월, 일 추출
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)); // 월은 숫자로 변환 필요
  const day = parseInt(dateString.substring(6, 8)); // 일도 숫자로 변환

  // 요일 구하기
  const date = new Date(year, month - 1, day);
  const dayOfWeekNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const dayOfWeek = dayOfWeekNames[date.getDay()];

  // '10월 25일 금요일' 형태의 문자열 반환
  return `${dayOfWeek}`;
};

// 두 시간 간의 간격 => A 시간, B 분 => A, B string 반환

// 두 시간 간의 간격 => A 시간, B 분 => A, B string 반환
export const calculateElapsedTime = (
  startedAt: string,
  finishedAt: string | null
) => {
  if (finishedAt === null) {
    return { hours: '', minutes: '' };
  }

  // 문자열을 Date 객체로 변환
  const startDate = new Date(
    parseInt(startedAt.substring(0, 4)), // 연도
    parseInt(startedAt.substring(4, 6)) - 1, // 월 (0부터 시작하므로 -1)
    parseInt(startedAt.substring(6, 8)), // 일
    parseInt(startedAt.substring(8, 10)), // 시
    parseInt(startedAt.substring(10, 12)), // 분
    parseInt(startedAt.substring(12, 14)) // 초
  );

  const finishDate = new Date(
    parseInt(finishedAt.substring(0, 4)),
    parseInt(finishedAt.substring(4, 6)) - 1,
    parseInt(finishedAt.substring(6, 8)),
    parseInt(finishedAt.substring(8, 10)),
    parseInt(finishedAt.substring(10, 12)),
    parseInt(finishedAt.substring(12, 14))
  );

  // 두 시간의 차이를 밀리초로 계산
  const elapsedTimeMs = finishDate.getTime() - startDate.getTime();

  // 밀리초를 시간과 분으로 변환
  const hours = Math.floor(elapsedTimeMs / (1000 * 60 * 60)).toString();
  const minutes = Math.floor(
    (elapsedTimeMs % (1000 * 60 * 60)) / (1000 * 60)
  ).toString();

  // 결과 문자열 반환
  return { hours, minutes };
};

// 지금으로부터 몇 분전인지 알려줌, 1시간 이상은 시간단위 string 반환
export function minutesAgo(timeString: string) {
  // 주어진 문자열을 Date 객체로 변환
  const year = parseInt(timeString.slice(0, 4), 10);
  const month = parseInt(timeString.slice(4, 6), 10) - 1; // 월은 0부터 시작
  const day = parseInt(timeString.slice(6, 8), 10);
  const hour = parseInt(timeString.slice(8, 10), 10);
  const minute = parseInt(timeString.slice(10, 12), 10);
  const second = parseInt(timeString.slice(12, 14), 10);

  const givenDate = new Date(year, month, day, hour, minute, second);
  const currentDate = new Date();

  // 분 단위로 변환
  const timeDifferenceMinutes = Math.floor(
    (currentDate.getTime() - givenDate.getTime()) / 60000
  );

  // 방금 전 (2분 이내)
  if (timeDifferenceMinutes < 2) {
    return '방금 전';
  }

  // 시간 전 (60분 이내)
  if (timeDifferenceMinutes < 60) {
    return `${timeDifferenceMinutes}분 전`;
  }

  // 하루 이하 (24시간 이내)
  const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
  if (timeDifferenceHours < 24) {
    return `${timeDifferenceHours}시간 전`;
  }

  // 일 단위 표시 (24시간 이상)
  const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
  return `${timeDifferenceDays}일 전`;
}
