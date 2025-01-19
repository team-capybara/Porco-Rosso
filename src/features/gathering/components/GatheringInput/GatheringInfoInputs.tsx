import { useEffect, useState, useRef } from 'react';
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
import {
  getDateFromDatetime,
  formatDateToYYYYMMDD,
} from '../../../../common/utils/dateUtils';

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
  mode,
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
    // 날짜 기본값 오늘로 설정
    if (okType === 'dateOpen' && !startedAt) {
      const today = new Date();
      const defaultDate = formatDateToYYYYMMDD(today);
      onChange('startedAt', defaultDate);
    }
    setIsOpen((prev) => ({
      ...prev,
      [key]: false, // 선택한 key만 false로 설정
    }));
    setOkType('');
  };

  useEffect(() => {
    handleGatheringInfoLayerClose(okType as keyof OpenState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        layerRef.current &&
        (!layerRef.current.contains(event.target as Node) ||
          layerRef.current === (event.target as Node))
      ) {
        handleGatheringInfoLayerClose(okType as keyof OpenState);
      }
    };

    if (dateOpen || timeOpen || locationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside); // 터치 이벤트 추가
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside); // 터치 이벤트 해제
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateOpen, timeOpen, locationOpen, okType]);

  return (
    <div className={cn('gathering_info_inputs')}>
      {/* 날짜 */}
      <div className={cn('info_button')}>
        <strong className={cn('title')}>
          <IconCalendar18X18 className={cn('icon')} />
          날짜
        </strong>
        <button
          type="button"
          className={cn('button', { active: startedAt ? true : false })}
          onClick={() => handleGatheringInfoLayerOpen('dateOpen')}
          disabled={mode === 'read' ? true : false}
        >
          {startedAt ? (
            <span className={cn('text')}>
              <span className={cn('number')}>
                {getDateFromDatetime(startedAt)}
              </span>
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
          disabled={mode === 'read' ? true : false}
        >
          {timeData ? (
            <span className={cn('number')}>
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
          disabled={mode === 'read' ? true : false}
        >
          {location.name ? (
            <span className={cn('text', 'active')}>{location.name}</span>
          ) : (
            <span className={cn('text')}>장소를 선택해 주세요</span>
          )}
          <ArrowLeft24X24 className={cn('icon')} />
        </button>
      </div>
      {/* Layer 활성화 시, 기존 화면 비활성화 부탁드립니다. */}
      {(dateOpen || locationOpen || timeOpen) && (
        <Layer
          classNameForView={locationOpen ? 'location_search_input' : ''}
          layerRef={layerRef}
        >
          {dateOpen && (
            <CalendarInput
              value={gatheringData.startedAt}
              onChange={(date: string) => onChange('startedAt', date)}
            />
          )}
          {timeOpen && (
            <TimeInput onChange={onTimeSelect} timeData={timeData} />
          )}
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
