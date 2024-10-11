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

  // 카카오 API 로드 확인
  useEffect(() => {
    if (searchInput.trim()) {
      // 검색어가 있을 때만 검색 실행
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchInput, (data: any[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
        } else {
          // alert('검색 결과가 없습니다.');
          setPlaces([]); // 검색 결과 없을 때 places 초기화
          // 장소 검색결과가 없습니다를 띄워줘야할듯
        }
      });
    } else {
      setPlaces([]); // 검색어가 비었을 때 검색 결과 초기화
    }
  }, [searchInput]);

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

      {/* 검색 결과 리스트 */}
      <LocationList places={places} onPlaceSelect={handlePlaceSelect} />
    </div>
  );
};

export default LocationSearchInput;
