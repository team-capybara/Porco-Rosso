type MonthYear = {
  month: number;
  year: number;
};

export type DateInfo = {
  date: Date;
  currentMonth: boolean;
  beforeToday?: boolean;
};

export interface DateDisplay {
  date: Date;
  currentMonth: boolean;
  beforeToday?: boolean;
}

// 날짜를 생성하는 함수
export const getSpecificDate = (
  month: number,
  dayOfMonth: number,
  year: number
): Date => {
  return new Date(year, month - 1, dayOfMonth);
};

// 날짜의 일(day)만 반환하는 함수
export const getDayOfMonth = (date: Date): number => date.getDate();

// 날짜의 월(month)만 반환하는 함수
export const getMonth = (date: Date): number => date.getMonth(); // 0부터 시작 (0 = 1월)

// 날짜의 연도(year)만 반환하는 함수
export const getYear = (date: Date): number => date.getFullYear();

// 현재 날짜를 반환하는 함수
export const getToday = (): Date => new Date();

// 날짜의 요일을 읽기 쉬운 형식으로 반환하는 함수
export const getReadableWeekday = (date: Date): string => {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekdays[date.getDay()];
};

// 날짜를 읽기 쉬운 월-일 형식으로 반환하는 함수
export const getReadableMonthDate = (date: Date): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const suffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  return `${months[date.getMonth()]} ${day}${suffix(day)}`;
};

// 날짜를 월-일-연도 형식으로 반환하는 함수
export const getMonthDayYear = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

// 날짜를 선택할 때 이전 달과 다음 달을 구하는 함수
export const getMonthSet = (
  selectDate: Date
): {
  current: Date;
  prev: Date;
  next: Date;
} => {
  const month = selectDate.getMonth() + 1; // 1부터 시작하도록 조정
  const year = selectDate.getFullYear();

  const result = {
    current: selectDate,
    prev: getSpecificDate(month - 1, 1, year),
    next: getSpecificDate(month + 1, 1, year),
  };

  if (month === 1) {
    result.prev = getSpecificDate(12, 1, year - 1);
  }

  if (month === 12) {
    result.next = getSpecificDate(1, 1, year + 1);
  }

  return result;
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate(); // 0일을 지정하면 전달의 마지막 날이 됨
};

export const getFirstWeekdayOfMonth = (month: number, year: number): number => {
  return new Date(year, month - 1, 1).getDay(); // 1일을 기준으로 요일 반환 (0 = 일요일)
};

export const getPrevMonthYear = (month: number, year: number): MonthYear => {
  if (month === 1) {
    return {
      month: 12,
      year: year - 1,
    };
  }
  return {
    month: month - 1,
    year,
  };
};

export const getNextMonthYear = (month: number, year: number): MonthYear => {
  if (month === 12) {
    return {
      month: 1,
      year: year + 1,
    };
  }
  return {
    month: month + 1,
    year,
  };
};

export const getDatesInMonthDisplay = (
  month: number,
  year: number
): DateInfo[] => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstWeekday = getFirstWeekdayOfMonth(month, year);
  const result: DateInfo[] = [];

  const prev = getPrevMonthYear(month, year);
  const prevDaysInMonth = getDaysInMonth(prev.month, prev.year);

  // 이전 달의 overflow 날짜 추가
  for (let j = firstWeekday - 1; j >= 0; j--) {
    const currentDate = new Date(
      prev.year,
      prev.month - 1,
      prevDaysInMonth - j
    );
    result.push({
      date: currentDate,
      currentMonth: false,
      beforeToday: currentDate < new Date(),
    });
  }

  // 현재 달의 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    const today = new Date();
    const currentDate = new Date(year, month - 1, i);
    result.push({
      date: currentDate,
      beforeToday: currentDate < today,
      currentMonth: true,
    });
  }

  // 42일 표시 형식을 맞추기 위해 다음 달의 overflow 날짜 추가
  if (result.length < 42) {
    const daysToAdd = 42 - result.length;
    const next = getNextMonthYear(month, year);

    for (let k = 1; k <= daysToAdd; k++) {
      const nextDate = new Date(next.year, next.month - 1, k);
      result.push({
        date: nextDate,
        currentMonth: false,
        beforeToday: nextDate < new Date(),
      });
    }
  }

  return result;
};
