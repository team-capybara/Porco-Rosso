/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames/bind';
import styles from './locationList.module.scss';

const cn = classnames.bind(styles);

interface LocationListProps {
  places: any[]; // 상위 컴포넌트에서 전달받은 장소 리스트
  onPlaceSelect: (place: any) => void; // 장소 선택 시 호출되는 함수
  hasSearched: boolean; // 검색이 시도되었는지 여부
}

const LocationList = ({
  places,
  onPlaceSelect,
  hasSearched,
}: LocationListProps) => {
  return (
    <div className={cn('location_list')}>
      <ul className={cn('inner_list')}>
        {hasSearched && places.length === 0 ? (
          <li className={cn('item')}>
            <strong className={cn('title')}>검색 결과가 없습니다.</strong>
            <p className={cn('location')}>다른 키워드로 검색해 보세요.</p>
          </li>
        ) : (
          places.map((place, index) => (
            <li key={index} className={cn('item')}>
              <button
                className={cn('button')}
                onClick={() => onPlaceSelect(place)}
              >
                <strong className={cn('title')}>{place.place_name}</strong>
                <p className={cn('location')}>
                  {place.road_address_name || place.address_name}
                </p>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LocationList;
