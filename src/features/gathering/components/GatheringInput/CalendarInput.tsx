import classnames from 'classnames/bind';
import styles from './calendarInput.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';

const cn = classnames.bind(styles);

const CalendarInput = () => {
  // 임시 데이터
  const days = [
    null,
    null,
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  // 날짜 수정 화살표 누를 시 나오는 모달
  console.log('CalendarInput');
  return (
    <div className={cn('calendar_input')}>
      <div className={cn('title_area')}>
        <div className={cn('title')}>
          <span className={cn('number')}>5</span>월{' '}
          <span className={cn('number')}>2023</span>
        </div>
        <div className={cn('button_area')}>
          <button className={cn('button')}>
            <ArrowLeft24X24 className={cn('icon')} />
            <span className="blind">이전</span>
          </button>
          <button className={cn('button', 'next')}>
            <ArrowLeft24X24 className={cn('icon')} />
            <span className="blind">다음</span>
          </button>
        </div>
      </div>
      <div>
        <ul className={cn('day_of_the_week')}>
          <li className={cn('item')}>월</li>
          <li className={cn('item')}>화</li>
          <li className={cn('item')}>수</li>
          <li className={cn('item')}>목</li>
          <li className={cn('item')}>금</li>
          <li className={cn('item')}>토</li>
          <li className={cn('item')}>일</li>
        </ul>
        <ul className={cn('days_calendar')}>
          {days.map((day) => {
            return (
              <li className={cn('item')} key={`${day}day`}>
                {/* todo: 해당 날짜가 오늘인 경우, 'is_today' 클래스 활성화 부탁드립니다. */}
                {/* todo: 버튼이 선택된 경우, 'active' 클래스 활성화 부탁드립니다. */}
                <button
                  type="button"
                  className={cn(
                    'button',
                    { is_today: false },
                    { active: false }
                  )}
                >
                  <span className={cn('text')}>{day}</span>
                  {/* todo: 버튼이 선택된 경우, '선택됨' 블라인드 텍스트 노출부탁드립니다. */}
                  {/* todo: 해당 날짜가 오늘인 경우, '오늘' 블라인드 텍스트 노출부탁드립니다. */}
                  {false && <span className="blind">선택됨</span>}
                  {false && <span className="blind">오늘</span>}
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
