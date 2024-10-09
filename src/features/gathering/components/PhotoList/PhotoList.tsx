import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './photoList.module.scss';
import PhotoCard from './PhotoCard/PhotoCard';
import { useMoimePhotoQuery } from '../../../../api/service/mockApi';
import { getMoimePhotoResponse, Photo } from '../../types';
import React from 'react';
import useNewPhotoPolling from '../../utils/useNewPhotoPolling';
import { useMoimeToast } from '../../../../common/utils/useMoimeToast';
import { PhotoCardProps } from '../../types';
import { useNavigate } from 'react-router-dom';

const cn = classnames.bind(styles);

interface PhotoListProps {
  moimeId: string;
}

const PhotoList = ({ moimeId }: PhotoListProps) => {
  const navigate = useNavigate();
  const { moimeToast } = useMoimeToast();
  const targetsRef = useRef<HTMLDivElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [pageNum, setPageNum] = useState<number>(0);

  // 새로운 사진 polling hooks
  const { isNew, setIsNew } = useNewPhotoPolling(5000);

  // 사진 페이지네이션 로직 관련 START
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    resetAndFetchFirstPage,
  } = useMoimePhotoQuery(moimeId, null); // 초기 cursorId = null;

  const handleClick = () => {
    if (observerRef.current) {
      // unmount시 모든 감시 대상 해제
      targetsRef.current.forEach((target) => {
        if (target) observerRef.current?.unobserve(target);
      });
      observerRef.current.disconnect();
      targetsRef.current = [];
    }
    resetAndFetchFirstPage();
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;

      const targetIndex = targetsRef.current.findIndex(
        (target) => target === entry.target
      );

      // 마지막 요소이고, 페이지가 남아 있을 때
      if (targetIndex === targetsRef.current.length - 1) {
        if (isFetchingNextPage) return;
        fetchNextPage();
      }
      setPageNum(targetIndex);
    });
  };

  useEffect(() => {
    // IntersectionObserver 옵션 설정
    const option = {
      root: null, // 뷰포트 기준으로 감시
      rootMargin: '0px',
      threshold: 0.3, // 요소가 20% 이상 보일 때 트리거
    };

    if (!observerRef.current) {
      // observer가 존재하지 않을 때 새로 생성
      observerRef.current = new IntersectionObserver(observerCallback, option);
    }

    if (targetsRef.current.length === 0) return;
    // targetsRef의 마지막 요소만 감시 대상으로 추가
    const lastTarget = targetsRef.current[targetsRef.current.length - 1];
    if (lastTarget) {
      observerRef.current.observe(lastTarget); // 새로 추가된 요소 감시 시작
      setPageNum(targetsRef.current.length - 1); // 페이지 세팅
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        // unmount시 모든 감시 대상 해제
        targetsRef.current.forEach((target) => {
          if (target) observerRef.current?.unobserve(target);
        });
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setSelectedPhotoId = (selectedPhotoId: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('selectedPhotoId', selectedPhotoId);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  // toast 공통화 필요함
  useEffect(() => {
    if (!isNew) return;

    //
    moimeToast({
      message: 'userName님이 사진을 업로드 했습니다.', // 메시지 커스터마이징
      onClickEnabled: true, // onClick 활성화
      onClick: handleClick, // 클릭 시 실행할 함수
      duration: 3000, // 지속 시간 설정
      id: 'new-photo-toast', // 고유 ID 설정
    });
    setIsNew(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  // 디버깅용
  useEffect(() => {
    console.log('pageNum 변경됨 :', pageNum);
  }, [pageNum]);

  return (
    <>
      <ul className={cn('photo_list')}>
        {data?.pages.map((page: getMoimePhotoResponse, pageNum: number) => (
          <React.Fragment key={`page-${pageNum}`}>
            {page.data.map((photo: Photo, idx: number) => {
              const photoCardProps: PhotoCardProps = {
                profileUrl: photo.uploaderProfile,
                photoUrl: photo.url,
                photoId: photo.photoId,
                likes: photo.likes,
                liked: photo.liked,
                likeButtonEnabled: true,
                onClickHandler: setSelectedPhotoId,
              };

              const isLastItemInPage = idx === page.data.length - 1;

              return (
                <li className={cn('item')} key={`photocard-${photo.photoId}`}>
                  <PhotoCard {...photoCardProps} />
                  {/* 페이지의 마지막 항목에만 감시용 div 추가 */}
                  {isLastItemInPage && (
                    <div
                      ref={(htmlDiv: HTMLDivElement) => {
                        if (htmlDiv !== null) {
                          targetsRef.current[pageNum] = htmlDiv;
                        }
                      }}
                      style={{
                        visibility: 'hidden', // 감시 대상이 보이지 않도록 설정
                        width: '1px',
                        height: '1px',
                      }}
                      key={`observer-${pageNum}`} // 고유한 키 추가
                    />
                  )}
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ul>
      <div
        style={{
          height: '100px',
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center',
          paddingTop: '40px',
        }}
      >
        {isFetchingNextPage && <p>로딩중입니다...</p>}
        {!hasNextPage && <p>마지막페이지입니다.</p>}
      </div>
    </>
  );
};

export default PhotoList;
