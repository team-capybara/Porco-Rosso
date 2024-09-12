import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './timeInput.module.scss';
import IconClock18X18 from '../../../../assets/svg/icon/IconClock18X18';

const cn = classnames.bind(styles);

interface TimeInputProps {
  onChange: (time: string) => void; // 시간 변경 시 호출할 함수
}

const TimeInput = ({ onChange }: TimeInputProps) => {
  const hours = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

  const minutes = ['00', '15', '30', '45'];

  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  const hourRef = useRef<HTMLUListElement>(null);
  const minuteRef = useRef<HTMLUListElement>(null);

  const totalHours = [...hours, ...hours, ...hours]; // 무한 스크롤 효과를 위한 3번 반복
  const totalMinutes = [
    ...minutes,
    ...minutes,
    ...minutes,
    ...minutes,
    ...minutes,
  ];

  const ITEM_HEIGHT = 48; // 각 시간/분 아이템의 높이
  const VISIBLE_ITEMS = 3; // 화면에 보이는 아이템 수

  // 포커싱된 인덱스 계산 함수
  const calculateFocusedIndex = (scrollPosition: number, itemCount: number) => {
    const rawIndex = Math.round(scrollPosition / ITEM_HEIGHT) % itemCount;
    return rawIndex >= 0 ? rawIndex : rawIndex + itemCount;
  };

  // 시간 스크롤 핸들러
  const handleHourScroll = () => {
    if (hourRef.current) {
      const scrollTop = hourRef.current.scrollTop;
      const focusedIndex = calculateFocusedIndex(scrollTop, hours.length);
      setSelectedHour(hours[focusedIndex]);
    }
  };

  // 분 스크롤 핸들러
  const handleMinuteScroll = () => {
    if (minuteRef.current) {
      const scrollTop = minuteRef.current.scrollTop;
      const focusedIndex = calculateFocusedIndex(scrollTop, minutes.length);
      setSelectedMinute(minutes[focusedIndex]);
    }
  };

  // 시간 초기화 (중앙에 위치)
  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTop = hours.length * ITEM_HEIGHT; // 중앙에 위치
    }
    if (minuteRef.current) {
      minuteRef.current.scrollTop = minutes.length * ITEM_HEIGHT; // 중앙에 위치
    }
  }, [hours.length, minutes.length]);

  // 서버에 시간 업데이트 로직
  useEffect(() => {
    const time = `${selectedHour}${selectedMinute}`; // hhmm 형태로 반환
    onChange(time);
  }, [selectedHour, selectedMinute, onChange]);

  return (
    <div className={cn('time_input')}>
      <strong className={cn('title')}>
        <IconClock18X18 className={cn('icon')} />
        시간
      </strong>
      <div className={cn('wrap_time')}>
        {/* 시간 선택 리스트 */}
        <ul
          className={cn('time_list')}
          ref={hourRef}
          onScroll={handleHourScroll}
          style={{
            overflowY: 'scroll',
            height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px`,
          }}
        >
          {totalHours.map((hour, index) => (
            <li
              className={cn('item', { active: selectedHour === hour })}
              key={`hour_${index}`}
            >
              <button className={cn('button')}>
                {hour}
                <span className="blind">시</span>
              </button>
            </li>
          ))}
        </ul>

        {/* 분 선택 리스트 */}
        <ul
          className={cn('time_list')}
          ref={minuteRef}
          onScroll={handleMinuteScroll}
          style={{
            overflowY: 'scroll',
            height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px`,
          }}
        >
          {totalMinutes.map((minute, index) => (
            <li
              className={cn('item', { active: selectedMinute === minute })}
              key={`minute_${index}`}
            >
              <button className={cn('button')}>
                {minute}
                <span className="blind">분</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeInput;
