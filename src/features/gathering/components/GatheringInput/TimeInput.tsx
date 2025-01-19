import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './timeInput.module.scss';
import IconClock18X18 from '../../../../assets/svg/icon/IconClock18X18';
import { getNextQuarterHour } from '../../../../common/utils/timeUtils';

const cn = classnames.bind(styles);

interface TimeInputProps {
  onChange: (time: string) => void; // 시간 변경 시 호출할 함수
  timeData?: string; // ���기 시간 (hhmm)
}

const TimeInput = ({ onChange, timeData }: TimeInputProps) => {
  const hours = Array.from({ length: 24 }, (_, index) =>
    String(index).padStart(2, '0')
  ); // '00'부터 '23'까지 생성

  const minutes = ['00', '15', '30', '45'];

  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  const hourRefs = useRef<(HTMLLIElement | null)[]>([]);
  const minuteRefs = useRef<(HTMLLIElement | null)[]>([]);
  const wrapTimeRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef<boolean>(false); // 초기 설정 여부 추적
  const setDefaultTime = (timeData: string) => {
    console.log(timeData);
    const hourIndex = parseInt(timeData.slice(0, 2));
    const minuteIndex = minutes.indexOf(timeData.slice(2, 4));

    if (hourIndex >= 0 && hourRefs.current[hourIndex]) {
      hourRefs?.current[hourIndex]?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }

    if (minuteIndex >= 0 && minuteRefs.current[minuteIndex]) {
      minuteRefs?.current[minuteIndex]?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    }
  };

  useEffect(() => {
    // 기존에 입력된 타임데이타 없으면, 기본 값 세팅
    if (!timeData && !initializedRef.current) {
      setDefaultTime(getNextQuarterHour().replace(':', ''));
      initializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // timeData 입력된 값 있을 시 입력 값으로 포커스 처리
    if (timeData && !initializedRef.current) {
      setDefaultTime(timeData);
      initializedRef.current = true; // 초기화 완료
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeData]);

  // IntersectionObserver를 사용하여 현재 보이는 항목을 active 상태로 설정
  useEffect(() => {
    const observerOptions = {
      root: wrapTimeRef.current,
      threshold: [1],
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // const target = entry.target as HTMLLIElement;
        const target = entry.target;
        const button = target.querySelector('button');
        if (entry.isIntersecting) {
          button?.classList.add(cn('active'));
          const selectedValue = button?.innerText;
          if (selectedValue?.endsWith('시')) {
            setSelectedHour(selectedValue.replace('시', '').trim());
          } else if (selectedValue?.endsWith('분')) {
            setSelectedMinute(selectedValue.replace('분', '').trim());
          }
        } else {
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
  }, []); //observer장착은 최초마운트 시에만 하면 되는데, 초기값 세팅이 안되는 현상 때문에 일단 리렌더링으로 해결 -> 최적화 필요

  // 선택된 시간 및 분이 변경될 때 상위 컴포넌트로 전달
  useEffect(() => {
    onChange(`${selectedHour}${selectedMinute}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHour, selectedMinute]);

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
