/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './locationSearchInput.module.scss';
import LocationList from './LocationList';
import IconLocation18X18 from '../../../../assets/svg/icon/IconLocation18X18';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';

const cn = classnames.bind(styles);

interface LocationSearchInputProps {
  onPlaceSelect: (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const LocationSearchInput = ({ onPlaceSelect }: LocationSearchInputProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  // 카카오 API 로드 확인
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
    } else {
      console.error('카카오 API가 로드되지 않았습니다.');
    }
  }, []);

  const searchPlaces = () => {
    if (!isKakaoLoaded) {
      console.error('카카오 API가 아직 로드되지 않았습니다.');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchInput, (data: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
  };

  const handlePlaceSelect = (place: any) => {
    const location = {
      name: place.place_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    };
    onPlaceSelect(location); // 상위 컴포넌트로 장소 정보 전달
  };

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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력시 업데이트
        />
        <ArrowLeft24X24 className={cn('icon')} />
      </label>
      <button onClick={searchPlaces}>검색</button>

      {/* 검색 결과 리스트 */}
      <LocationList places={places} onPlaceSelect={handlePlaceSelect} />
    </div>
  );
};

export default LocationSearchInput;
