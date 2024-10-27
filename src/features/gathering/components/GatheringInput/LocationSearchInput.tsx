/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './locationSearchInput.module.scss';
import LocationList from './LocationList';
import IconLocation18X18 from '../../../../assets/svg/icon/IconLocation18X18';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import { useDebounce } from '../../utils/useDebounce';

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
  const [page, setPage] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState(false);
  console.log(page, 'page');

  const handlePlaceSelect = (place: any) => {
    const location = {
      name: place.place_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    };
    onPlaceSelect(location); // 상위 컴포넌트로 장소 정보 전달
  };

  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤 타겟
  const debouncedSearchInput = useDebounce(searchInput, 300); // 디바운스된 검색어
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터 여부

  // 장소 검색
  // 페이지네이션 기능이 먹는건가?
  const searchPlaces = (keyword: string, page: number) => {
    if (!keyword.trim()) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data: any[], status: any, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces((prevPlaces) => [...prevPlaces, ...data]); // 데이터 누적
          console.log(pagination, 'pagination');
          setHasMore(pagination.hasNextPage); // 다음 페이지 여부 설정

          // 다음 페이지가 있을 경우 자동으로 페이지 요청 설정
          if (pagination.hasNextPage) {
            pagination.nextPage();
          }
        } else {
          setPlaces([]); // 검색 결과가 없을 때 초기화
          setHasMore(false); // 더 이상 데이터 없음
        }
        setHasSearched(true);
      },
      { page } // 페이지 번호 전달
    );
  };

  // 검색어 변경 시 초기화 및 첫 페이지 검색
  useEffect(() => {
    if (debouncedSearchInput.trim()) {
      console.log('엥뭐지');
      setPlaces([]); // 이전 데이터 초기화
      searchPlaces(debouncedSearchInput, 1); // 첫 페이지 검색
      setPage(1); // 페이지 초기화
      setHasSearched(false);
    } else {
      setPlaces([]); // 이전 데이터 초기화
      setHasSearched(false);
    }
  }, [debouncedSearchInput]);

  // 무한 스크롤 처리: IntersectionObserver 사용
  useEffect(() => {
    console.log('엥뭐지');
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1; // 페이지 번호 증가
          searchPlaces(debouncedSearchInput, nextPage); // 다음 페이지 검색
          return nextPage;
        });
      }
    });

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target); // 정리
    };
  }, [hasMore, debouncedSearchInput]);

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
      <LocationList
        places={places}
        onPlaceSelect={handlePlaceSelect}
        hasSearched={hasSearched}
      />
      <div ref={loadMoreRef} className={cn('load-more-target')}>
        {hasMore && <div>로딩 중...</div>}
      </div>
    </div>
  );
};

export default LocationSearchInput;
