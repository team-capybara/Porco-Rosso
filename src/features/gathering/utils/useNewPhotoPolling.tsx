import { useEffect, useRef, useState } from 'react';
import { getMoimePhoto } from '../../../api/service/photoApi';
import { useMoimePhotoQuery } from './useMoimePhotoQuery';
import { Photo } from '../types';

// 새로운 사진 체크하는 폴링 로직을 커스텀 훅으로 분리
function usePhotoPolling(interval = 5000, moimeId: string) {
  const [isNew, setIsNew] = useState<boolean>(false);
  const { firstPhotoId } = useMoimePhotoQuery(moimeId, null);

  const firstPhotoIdRef = useRef<number | null>(firstPhotoId);

  useEffect(() => {
    firstPhotoIdRef.current = firstPhotoId;
  }, [firstPhotoId]);

  // 새로운 사진이 있는지 확인하는 함수
  const checkForNewPhotos = async () => {
    if (firstPhotoId === null) return;

    const res = await getMoimePhoto(moimeId, null, 1);
    const newPhoto: Photo | null = res.data?.[0] || null;

    if (newPhoto === null || firstPhotoIdRef.current === newPhoto.photoId) {
      setIsNew(false);
    } else {
      setIsNew(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkForNewPhotos();
    }, interval);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 해제
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]); // interval 값이 변경되면 타이머도 재설정

  return { isNew, setIsNew };
}

export default usePhotoPolling;
