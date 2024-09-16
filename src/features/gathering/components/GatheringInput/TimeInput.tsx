import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './timeInput.module.scss';
import IconClock18X18 from '../../../../assets/svg/icon/IconClock18X18';

const cn = classnames.bind(styles);

interface TimeInputProps {
  onChange: (time: string) => void; // 시간 변경 시 호출할 함수
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TimeInput = ({ onChange }: TimeInputProps) => {
  const hours = Array.from({ length: 24 }, (_, index) =>
    String(index).padStart(2, '0')
  ); // '00'부터 '23'까지 생성

  const minutes = ['00', '15', '30', '45'];

  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  const hourRefs = useRef<(HTMLLIElement | null)[]>([]);
  const minuteRefs = useRef<(HTMLLIElement | null)[]>([]);
  const wrapTimeRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver를 사용하여 현재 보이는 항목을 active 상태로 설정
  useEffect(() => {
    const observerOptions = {
      root: wrapTimeRef.current,
      threshold: [1],
      rootMargin: '0px 0px',
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLLIElement;
        const button = target.querySelector('button');
        if (entry.isIntersecting) {
          console.log('최초 마운트');
          button?.classList.add(cn('active'));
          const selectedValue = button?.innerText;

          if (selectedValue?.endsWith('시')) {
            setSelectedHour(selectedValue.replace('시', '') || '00');
          } else if (selectedValue?.endsWith('분')) {
            setSelectedMinute(selectedValue.replace('분', '') || '00');
          }
        } else {
          console.log('어디가 시행되지?');
          button?.classList.remove(cn('active'));
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // 각 시간과 분 리스트 아이템에 대해 observe 실행
    hourRefs.current.forEach((hourRef) => {
      if (hourRef) observer.observe(hourRef);
    });
    minuteRefs.current.forEach((minuteRef) => {
      if (minuteRef) observer.observe(minuteRef);
    });

    return () => observer.disconnect();
  }, [selectedHour, selectedMinute]); // 최초 마운트 시에만 실행 , 이거 초기마운트에만 실행하려면,초기값 어떻게 세팅할지 생각해야함, 인터섹팅해야만 액티브 클래스가 활성화되기떄문에, 아래처럼 초기에 active 직접 적용해줘도, intersecting 기능이 활성화되면서 active 클래스가 사라지거나 함.. 왜...?

  // // 선택된 시간 및 분이 변경될 때 상위 컴포넌트로 전달
  // useEffect(() => {
  //   onChange(`${selectedHour}:${selectedMinute}`);
  // }, [selectedHour, selectedMinute, onChange]);

  return (
    <div className={cn('time_input')}>
      <strong className={cn('title')}>
        <IconClock18X18 className={cn('icon')} />
        시간
      </strong>
      <div className={cn('wrap_time')} ref={wrapTimeRef}>
        {/* 시간 선택 리스트 */}
        <ul className={cn('time_list')}>
          {hours.map((hour, index) => (
            <li
              className={cn('item')}
              key={`hour_${index}`}
              ref={(el) => (hourRefs.current[index] = el)} // 각 시간 항목을 ref에 저장
            >
              <button
                className={cn('button', { active: selectedHour === hour })}
              >
                {hour}
                <span className="blind">시</span>
              </button>
            </li>
          ))}
        </ul>

        {/* 분 선택 리스트 */}
        <ul className={cn('time_list')}>
          {minutes.map((minute, index) => (
            <li
              className={cn('item')}
              key={`minute_${index}`}
              ref={(el) => (minuteRefs.current[index] = el)} // 각 분 항목을 ref에 저장
            >
              <button
                className={cn('button', { active: selectedMinute === minute })}
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
