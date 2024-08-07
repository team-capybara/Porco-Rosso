import classnames from 'classnames/bind';
import styles from './locationSearchInput.module.scss';
import LocationList from './LocationList';
import IconLocation18X18 from '../../../../assets/svg/icon/IconLocation18X18';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';

const cn = classnames.bind(styles);

const LocationSearchInput = () => {
  // 장소 수정 화살표 누를 시 나오는 모달
  console.log('LocationSearchInput');
  return (
    <div className={cn('location_search_input')}>
      <strong className={cn('title')}>
        <IconLocation18X18 className={cn('icon')} />
        장소
      </strong>
      <label className={cn('label')}>
        <input
          type="text"
          className={cn('input')}
          placeholder="장소를 입력해주세요"
        />
        <ArrowLeft24X24 className={cn('icon')} />
      </label>
      {/* 장소 검색 결과 */}
      <LocationList />
    </div>
  );
};

export default LocationSearchInput;
