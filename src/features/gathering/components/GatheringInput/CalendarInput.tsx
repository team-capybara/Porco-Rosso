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
import { formatDateToYYYYMMDD } from '../../../../common/utils/dateUtils';

const cn = classnames.bind(styles);

const CalendarInput = ({ onChange }: CalendarInputProps) => {
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentMonthYear, setCurrentMonthYear] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

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
  const handleDateSelect = (date: Date) => {
    console.log(date, 'date');
    setSelectedDate(date);
    onChange(formatDateToYYYYMMDD(date));
  };

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const isSelected = (date: Date) =>
    date.toDateString() === selectedDate.toDateString();

  // 날짜 수정 화살표 누를 시 나오는 모달
  console.log('CalendarInput');
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
            console.log(date, currentMonth, beforeToday);
            // const todayClass = isToday(date) ? 'is_today' : '';
            // const activeClass = isSelected(date) ? 'active' : '';
            return (
              <li className={cn('item')} key={date.toISOString()}>
                {/* todo: 해당 날짜가 오늘인 경우, 'is_today' 클래스 활성화 부탁드립니다. */}
                {/* todo: 버튼이 선택된 경우, 'active' 클래스 활성화 부탁드립니다. */}
                <button
                  type="button"
                  className={cn(
                    'button',
                    { is_today: isToday(date) },
                    { active: isSelected(date) }
                  )}
                  onClick={() => handleDateSelect(date)}
                  disabled={beforeToday}
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
