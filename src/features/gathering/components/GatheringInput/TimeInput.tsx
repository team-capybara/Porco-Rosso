import classnames from 'classnames/bind';
import styles from './timeInput.module.scss';
import IconClock18X18 from '../../../../assets/svg/icon/IconClock18X18';

const cn = classnames.bind(styles);

const TimeInput = () => {
  // 시간 수정 화살표 누를 시 나오는 모달
  console.log('timeInput');

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

  return (
    <div className={cn('time_input')}>
      <strong className={cn('title')}>
        <IconClock18X18 className={cn('icon')} />
        시간
      </strong>
      <div className={cn('wrap_time')}>
        {/* todo: 애니메이션 확인 및 적용 필요 */}
        <ul className={cn('time_list')}>
          {hours.map((hour) => {
            return (
              <li className={cn('item')} key={`${hour}hour`}>
                {/* todo: 활성화, 비활성화 케이스 디자인 확인 필요 */}
                <button type="button" className={cn('button')}>
                  {hour}
                  <span className="blind">시</span>
                </button>
              </li>
            );
          })}
        </ul>
        <ul className={cn('time_list')}>
          {hours.map((hour) => {
            return (
              <li className={cn('item')} key={`${hour}hour`}>
                <button type="button" className={cn('button')}>
                  {hour}
                  <span className="blind">분</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TimeInput;
