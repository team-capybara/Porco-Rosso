import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './calendarInput.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import { DateInfo } from '../../../../common/utils/calendarUtils';
import {
  getDatesInMonthDisplay,
  getMonthSet,
  getToday,
} from '../../../../common/utils/calendarUtils';
import { CalendarInputProps } from '../../types';
import {
  formatDateToYYYYMMDD,
  parseYYYYMMDDToDate,
} from '../../../../common/utils/dateUtils';

const cn = classnames.bind(styles);

const CalendarInput = ({ value, onChange }: CalendarInputProps) => {
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? parseYYYYMMDDToDate(value) : today
  );
  const [currentMonthYear, setCurrentMonthYear] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const oneYearFromToday = new Date(today);
  oneYearFromToday.setFullYear(today.getFullYear() + 1);

  const { month, year } = currentMonthYear;
  const datesInMonth: DateInfo[] = getDatesInMonthDisplay(month, year);

  const handlePrevMonth = () => {
    // getMonthSet 함수의 prev는 Date 객체입니다
    const prevDate = getMonthSet(new Date(year, month - 1, 1)).prev;
    const prevMonth = prevDate.getMonth() + 1; // 0-based index를 1-based index로 변환
    const prevYear = prevDate.getFullYear();
    setCurrentMonthYear({ month: prevMonth, year: prevYear });
  };
  const handleNextMonth = () => {
    // getMonthSet 함수의 next는 Date 객체입니다
    const nextDate = getMonthSet(new Date(year, month - 1, 1)).next;
    const nextMonth = nextDate.getMonth() + 1; // 0-based index를 1-based index로 변환
    const nextYear = nextDate.getFullYear();
    setCurrentMonthYear({ month: nextMonth, year: nextYear });
  };
  const handleDateSelect = (date: Date, beforeToday?: boolean) => {
    if (beforeToday && !isToday(date)) {
      alert('모임은 오늘 이후로만 만들 수 있어요'); // 토스트로 바꿔야함
      return;
    }
    if (date > today && !isWithinValidRange(date)) {
      alert('모임 생성 날짜는 오늘 기준 최대 1년 뒤를 초과할 수 없음.');
      return;
    }
    setSelectedDate(date);
    onChange(formatDateToYYYYMMDD(date));
  };

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const isSelected = (date: Date) =>
    date.toDateString() === selectedDate.toDateString();

  const isWithinValidRange = (date: Date) =>
    date >= today && date <= oneYearFromToday;

  // 날짜 수정 화살표 누를 시 나오는 모달
  return (
    <div className={cn('calendar_input')}>
      <div className={cn('title_area')}>
        <div className={cn('title')}>
          <span className={cn('number')}>{month}</span>월{' '}
          <span className={cn('number')}>{year}</span>
        </div>
        <div className={cn('button_area')}>
          <button className={cn('button')} onClick={handlePrevMonth}>
            <ArrowLeft24X24 className={cn('icon')} />
            <span className="blind">이전</span>
          </button>
          <button className={cn('button', 'next')} onClick={handleNextMonth}>
            <ArrowLeft24X24 className={cn('icon')} />
            <span className="blind">다음</span>
          </button>
        </div>
      </div>
      <div>
        <ul className={cn('day_of_the_week')}>
          <li className={cn('item')}>일</li>
          <li className={cn('item')}>월</li>
          <li className={cn('item')}>화</li>
          <li className={cn('item')}>수</li>
          <li className={cn('item')}>목</li>
          <li className={cn('item')}>금</li>
          <li className={cn('item')}>토</li>
        </ul>
        <ul className={cn('days_calendar')}>
          {datesInMonth.map((day) => {
            const { date, currentMonth, beforeToday } = day;
            const isDateDisabled = !currentMonth;
            return (
              <li className={cn('item')} key={date.toISOString()}>
                {/* todo: 해당 날짜가 오늘인 경우, 'is_today' 클래스 활성화 부탁드립니다. */}
                {/* todo: 버튼이 선택된 경우, 'active' 클래스 활성화 부탁드립니다. */}
                <button
                  type="button"
                  className={cn(
                    'button',
                    { is_today: isToday(date) },
                    { active: isSelected(date) && currentMonth }
                  )}
                  onClick={() => handleDateSelect(date, beforeToday)}
                  disabled={isDateDisabled}
                >
                  <span className={cn('text')}>
                    {currentMonth ? date.getDate() : null}
                  </span>
                  {/* todo: 버튼이 선택된 경우, '선택됨' 블라인드 텍스트 노출부탁드립니다. */}
                  {/* todo: 해당 날짜가 오늘인 경우, '오늘' 블라인드 텍스트 노출부탁드립니다. */}
                  {isSelected(date) && <span className="blind">선택됨</span>}
                  {isToday(date) && <span className="blind">오늘</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CalendarInput;
