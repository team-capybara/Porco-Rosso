import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// 새로운 사진 체크하는 폴링 로직을 커스텀 훅으로 분리
function usePhotoPolling(interval = 5000) {
  const [isNew, setIsNew] = useState<boolean>(false);
  const oddEven = useRef<number>(1);

  // 새로운 사진이 있는지 확인하는 함수
  const checkForNewPhotos = async () => {
    let res = null;

    if (oddEven.current % 2 === 1) {
      res = await axios.get('/moims/newPhoto/true');
    } else {
      res = await axios.get('/moims/newPhoto/false');
    }

    const isNewPhoto: boolean = res.data.isNew;
    setIsNew(isNewPhoto);
    oddEven.current += 1;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkForNewPhotos();
    }, interval);

    return () => {
      clearInterval(timer); // 컴포넌트 언마운트 시 타이머 해제
    };
  }, [interval]); // interval 값이 변경되면 타이머도 재설정

  return { isNew, setIsNew };
}

export default usePhotoPolling;
