import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './timeInput.module.scss';
import IconClock18X18 from '../../../../assets/svg/icon/IconClock18X18';

const cn = classnames.bind(styles);
interface TimeInputProps {
  onChange: (time: string) => void; // 시간 변경 시 호출할 함수
}

const TimeInput = ({ onChange }: TimeInputProps) => {
  // 시간 수정 화살표 누를 시 나오는 모달

  // 임시 데이터
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

  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  // 시간 선택 핸들러
  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
    onChange(`${hour}${selectedMinute}`); // hhmm 형태로 반환
  };

  // 분 선택 핸들러
  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute);
    onChange(`${selectedHour}${minute}`); // hhmm 형태로 반환
  };

  const minutes = ['00', '15', '30', '45'];

  return (
    <div className={cn('time_input')}>
      <strong className={cn('title')}>
        <IconClock18X18 className={cn('icon')} />
        시간
      </strong>
      <div className={cn('wrap_time')}>
        {/* 시간 선택 리스트 */}
        <ul className={cn('time_list')}>
          {hours.map((hour) => (
            <li className={cn('item')} key={`${hour}hour`}>
              <button
                type="button"
                className={cn('button', { active: selectedHour === hour })}
                onClick={() => handleHourSelect(hour)}
              >
                {hour}
                <span className="blind">시</span>
              </button>
            </li>
          ))}
        </ul>
        {/* 분 선택 리스트 (15분 단위) */}
        <ul className={cn('time_list')}>
          {minutes.map((minute) => (
            <li className={cn('item')} key={`${minute}minute`}>
              <button
                type="button"
                className={cn('button', { active: selectedMinute === minute })}
                onClick={() => handleMinuteSelect(minute)}
              >
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
