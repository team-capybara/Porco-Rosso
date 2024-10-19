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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);

  // // 카카오 API 로드 확인
  // useEffect(() => {
  //   if (searchInput.trim()) {
  //     // 검색어가 있을 때만 검색 실행
  //     const ps = new kakao.maps.services.Places();
  //     ps.keywordSearch(searchInput, (data: any[], status: any) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         setPlaces(data);
  //       } else {
  //         // alert('검색 결과가 없습니다.');
  //         setPlaces([]); // 검색 결과 없을 때 places 초기화
  //         // 장소 검색결과가 없습니다를 띄워줘야할듯
  //       }
  //     });
  //   } else {
  //     setPlaces([]); // 검색어가 비었을 때 검색 결과 초기화
  //   }
  // }, [searchInput]);

  // 디바운스된 검색어
  // const debouncedSearchInput = useDebounce(searchInput, 300); // 300ms 지연

  // // 카카오 API 로드 및 검색 실행
  // useEffect(() => {
  //   console.log(debouncedSearchInput, '체크체크');
  //   if (debouncedSearchInput.trim()) {
  //     const ps = new kakao.maps.services.Places();
  //     ps.keywordSearch(debouncedSearchInput, (data: any[], status: any) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         console.log(data, 'data');
  //         setPlaces(data);
  //       } else {
  //         setPlaces([]); // 검색 결과가 없을 때 초기화
  //       }
  //     });
  //   } else {
  //     setPlaces([]); // 검색어가 없을 때 초기화
  //   }
  // }, [debouncedSearchInput]); // 디바운스된 검색어를 의존성으로 추가

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
  const searchPlaces = (keyword: string, page: number) => {
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
      },
      { page } // 페이지 번호 전달
    );
  };

  // 검색어 변경 시 초기화 및 첫 페이지 검색
  useEffect(() => {
    if (debouncedSearchInput.trim()) {
      setPlaces([]); // 이전 데이터 초기화
      searchPlaces(debouncedSearchInput, 1); // 첫 페이지 검색
      setPage(1); // 페이지 초기화
    } else {
      setPlaces([]); // 이전 데이터 ���기화
    }
  }, [debouncedSearchInput]);

  // 무한 스크롤 처리: IntersectionObserver 사용
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1; // 페이지 번호 증가
          searchPlaces(debouncedSearchInput, nextPage); // 다음 페이지 검색
          return nextPage;
        });
      }
      // if (entry.isIntersecting && hasMore) {
      //   searchPlaces(debouncedSearchInput, 1); // 다음 페이지 검색
      // }
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
      <LocationList places={places} onPlaceSelect={handlePlaceSelect} />
      <div ref={loadMoreRef} className={cn('load-more-target')}>
        {hasMore && <div>로딩 중...</div>}
      </div>
    </div>
  );
};

export default LocationSearchInput;
