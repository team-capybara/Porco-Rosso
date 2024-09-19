import { useEffect, useState } from 'react';
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

interface OpenState {
  dateOpen: boolean;
  timeOpen: boolean;
  locationOpen: boolean;
}

const GatheringInfoInputs = ({
  gatheringData,
  onChange,
  onPlaceSelect,
  onTimeSelect,
  timeData,
}: GatheringInfoInputsProps) => {
  const { startedAt, location } = gatheringData;
  const [isOpen, setIsOpen] = useState<OpenState>({
    dateOpen: false,
    timeOpen: false,
    locationOpen: false,
  });
  const [okType, setOkType] = useState<string>('');

  const { dateOpen, timeOpen, locationOpen } = isOpen;

  const handleGatheringInfoLayerOpen = (key: keyof OpenState) => {
    setIsOpen({
      dateOpen: false,
      timeOpen: false,
      locationOpen: false,
      [key]: true, // 선택한 키만 true로 설정
    });
    setOkType(key);
  };

  const handleGatheringInfoLayerClose = (key: keyof OpenState) => {
    setIsOpen((prev) => ({
      ...prev,
      [key]: false, // 선택한 key만 false로 설정
    }));
    setOkType('');
    console.log(gatheringData, 'gatheringData');
    console.log(timeData, 'timedata');
  };

  useEffect(() => {
    handleGatheringInfoLayerClose(okType as keyof OpenState);
  }, [location]);

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
          onClick={() => handleGatheringInfoLayerOpen('dateOpen')}
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
        <button
          type="button"
          className={cn('button')}
          onClick={() => handleGatheringInfoLayerOpen('timeOpen')}
        >
          {timeData ? (
            // 마크업 font color 수정 부탁드립니다
            <span className={cn('number')} style={{ color: 'white' }}>
              {timeData.slice(0, 2) + '시 ' + timeData.slice(2, 4) + '분'}
            </span>
          ) : (
            <span className={cn('text')}>시간을 선택해 주세요</span>
          )}
          <ArrowLeft24X24 className={cn('icon')} />
        </button>
      </div>
      {/* 장소 */}
      <div className={cn('info_button')}>
        <strong className={cn('title')}>
          <IconLocation18X18 className={cn('icon')} />
          장소
        </strong>
        <button
          type="button"
          className={cn('button')}
          onClick={() => handleGatheringInfoLayerOpen('locationOpen')}
        >
          {location ? (
            // 마크업 font color 수정 부탁드립니다
            <span className={cn('number')} style={{ color: 'white' }}>
              {location.name}
            </span>
          ) : (
            <span className={cn('text')}>장소를 선택해 주세요</span>
          )}
          <ArrowLeft24X24 className={cn('icon')} />
        </button>
      </div>
      {/* Layer 활성화 시, 기존 화면 비활성화 부탁드립니다. */}
      {(dateOpen || locationOpen || timeOpen) && (
        <Layer classNameForView="location_search_input">
          {dateOpen && (
            <CalendarInput
              value={gatheringData.startedAt}
              onChange={(date: string) => onChange('startedAt', date)}
            />
          )}
          {timeOpen && <TimeInput onChange={onTimeSelect} />}
          {locationOpen && (
            <LocationSearchInput onPlaceSelect={onPlaceSelect} />
          )}
          {/* todo: 날짜, 시간 케이스에서만 노출부탁드립니다. */}
          {(timeOpen || dateOpen) && (
            <div className={cn('wrap_confirm_button')}>
              <button
                type="button"
                className={cn('confirm_button')}
                onClick={() =>
                  handleGatheringInfoLayerClose(okType as keyof OpenState)
                }
              >
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
