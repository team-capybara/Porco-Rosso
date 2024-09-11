import classnames from 'classnames/bind';
import LocationSearchInput from './LocationSearchInput';
import TimeInput from './TimeInput';
import CalendarInput from './CalendarInput';
import styles from './gatheringInfoInputs.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import Layer from '../../../../common/components/Layer/Layer';
import IconCalendar18X18 from '../../../../assets/svg/icon/IconCalendar18X18';
import IconClock18X18 from '../../../../assets/svg/icon/IconClock18X18';
import IconLocation18X18 from '../../../../assets/svg/icon/IconLocation18X18';
import { GatheringInfoInputsProps } from '../../types';
import { getDateFromDatetime } from '../../../../common/utils/dateUtils';

const cn = classnames.bind(styles);

const GatheringInfoInputs = ({
  gatheringData,
  onChange,
  onPlaceSelect,
}: GatheringInfoInputsProps) => {
  const { startedAt } = gatheringData;
  return (
    <div className={cn('gathering_info_inputs')}>
      {/* 날짜 */}
      <div className={cn('info_button')}>
        <strong className={cn('title')}>
          <IconCalendar18X18 className={cn('icon')} />
          날짜
        </strong>
        {/* todo: 입력이 활성화된 경우, 'active' 클래스 활성화부탁드립니다.  */}
        <button
          type="button"
          className={cn('button', { active: startedAt ? true : false })}
        >
          {startedAt ? (
            <span className={cn('text')}>
              <span className={cn('number')}>
                {getDateFromDatetime(startedAt)}
              </span>
              {/* 큰 차이 없다면 위 처럼 파싱된 날짜로 바로 나타내는게 심플할 거 같은데 어떻게 생각하시나용?*/}
              {/* <span className={cn('number')}>2024</span>년{' '}
              <span className={cn('number')}>5</span>월{' '}
              <span className={cn('number')}>3</span>일 */}
            </span>
          ) : (
            <span className={cn('text')}>날짜를 선택해 주세요</span>
          )}
          {/* todo: 숫자의 경우 span.number로 감싸주세요. */}
          <ArrowLeft24X24 className={cn('icon')} />
        </button>
      </div>
      {/* 시간 */}
      <div className={cn('info_button')}>
        <strong className={cn('title')}>
          <IconClock18X18 className={cn('icon')} />
          시간
        </strong>
        <button type="button" className={cn('button')}>
          <span className={cn('text')}>시간을 선택해 주세요</span>
          <ArrowLeft24X24 className={cn('icon')} />
        </button>
      </div>
      {/* 장소 */}
      <div className={cn('info_button')}>
        <strong className={cn('title')}>
          <IconLocation18X18 className={cn('icon')} />
          장소
        </strong>
        <button type="button" className={cn('button')}>
          <span className={cn('text')}>장소를 선택해 주세요</span>
          <ArrowLeft24X24 className={cn('icon')} />
        </button>
      </div>
      {/* Layer 활성화 시, 기존 화면 비활성화 부탁드립니다. */}
      {false && (
        <Layer classNameForView="location_search_input">
          {false && (
            <CalendarInput
              value={gatheringData.startedAt}
              onChange={(date: string) => onChange('startedAt', date)}
            />
          )}
          {false && <TimeInput />}
          {false && <LocationSearchInput onPlaceSelect={onPlaceSelect} />}
          {/* todo: 날짜, 시간 케이스에서만 노출부탁드립니다. */}
          {true && (
            <div className={cn('wrap_confirm_button')}>
              <button type="button" className={cn('confirm_button')}>
                확인
              </button>
            </div>
          )}
        </Layer>
      )}
    </div>
  );
};

export default GatheringInfoInputs;
