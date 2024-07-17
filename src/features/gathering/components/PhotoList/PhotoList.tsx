import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import classnames from 'classnames/bind';
import styles from './photoList.module.scss';
import PhotoCard from './PhotoCard/PhotoCard';
import { getMoimePhoto } from '../../../../api/service/mockApi';
import axios from 'axios';
import { getMoimePhotoResponse, Photo } from '../../types';

const cn = classnames.bind(styles);

interface PhotoListProps {
  moimeId: string;
  setRenderComponent: React.Dispatch<React.SetStateAction<string>>;
}

export interface PhotoCardProps {
  photoUrl: string;
  profileUrl: string;
  photoId: number;
  likes: number;
  liked: boolean;
  likeButtonHandler?: (
    event: React.MouseEvent<HTMLButtonElement>,
    photoId: number
  ) => void;
}

export interface MoimePhoto {
  photoId: number;
  url: string;
  uploadedAt: string;
  uploaderId: number;
  uploaderProfile: string;
  liked: boolean;
  likes: number;
}

const PhotoList = ({ moimeId, setRenderComponent }: PhotoListProps) => {
  const size: number = 18;

  const targetsRef = useRef<HTMLLIElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const oddEven = useRef<number>(1);
  const likeLoadingLst = useRef<number[]>([]);
  const photoIdIndexMap = useRef<Map<number, number>>(new Map());

  const [isLast, setIsLast] = useState<boolean>(false);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [moimePhotoLst, setMoimePhotoLst] = useState<MoimePhoto[]>([]);
  const [intersectAction, setIntersectAction] = useState<'idle' | 'getPhoto'>(
    'idle'
  );

  async function getTrueOrFasle(num: number) {
    let res = null;

    if (num % 2 === 1) {
      res = await axios.get('/moims/newPhoto/true');
    } else {
      res = await axios.get('/moims/newPhoto/false');
    }
    const isNewPhoto: boolean = res.data.isNew;

    setIsNew(isNewPhoto);
    oddEven.current += 1;
    return true;
  }

  async function fetchData(moimeId: string, cusorIdVal: number | null) {
    setLoading(true);

    const res: getMoimePhotoResponse = await getMoimePhoto(
      moimeId,
      cusorIdVal,
      size
    );
    setIsLast(res.last);
    fetchDataCallback(res.data);
  }

  function fetchDataCallback(resPhotoLst: Array<Photo>) {
    let nextMoimePhotoLst = [];

    // 테스트용 : photoId 중복을 막기 위한 코드(실제api에서 photoId 중복 없음)
    resPhotoLst.forEach((el) => {
      if (cursorId === null) {
        el.photoId = el.photoId + 100;
      } else {
        el.photoId = el.photoId + cursorId;
      }
    });

    if (moimePhotoLst.length !== 0) {
      nextMoimePhotoLst = [...moimePhotoLst, ...resPhotoLst];
    } else {
      nextMoimePhotoLst = resPhotoLst;
    }

    setCursorId(nextMoimePhotoLst[nextMoimePhotoLst.length - 1].photoId);
    setMoimePhotoLst(nextMoimePhotoLst);
    setLoading(false);
  }

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;
      if (loading) return;

      const targetIndex = targetsRef.current.findIndex(
        (target) => target === entry.target
      );

      // 마지막 요소의 경우에는 fetch data
      if (targetIndex === targetsRef.current.length - 1) {
        setIntersectAction('getPhoto');
      } else {
        // 아닌경우 지금 보고있는 사진의 page(18장에 1장) update
        setPageNum(targetIndex);
      }
    });
  };

  const likeButtonHandler = function likeButtonHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    photoId: number
  ) {
    e.preventDefault();
    if (likeLoadingLst.current.includes(photoId)) {
      console.log('좋아요 변경을 이미 요청 중입니다');
    } else {
      likeLoadingLst.current.push(photoId);
      console.log('LOCK', photoId);
      setTimeout(() => {
        likeButtonHandlerCb(photoId);
      }, 500); // 좋아요 요청 <-> 응답 간의 시간을 주기 위해(테스트용)
    }
  };

  function likeButtonHandlerCb(photoId: number) {
    const photoIdx = photoIdIndexMap.current.get(photoId);
    let nextMoimePhotoLst: MoimePhoto[] = [];
    if (photoIdx !== undefined) {
      nextMoimePhotoLst = moimePhotoLst.map((el, idx) => {
        if (idx === photoIdx) {
          const nextEl: MoimePhoto = el;

          nextEl.liked = !el.liked;
          nextEl.likes = nextEl.liked ? el.likes + 1 : el.likes - 1;

          return nextEl;
        } else {
          return el;
        }
      });
    }
    setMoimePhotoLst(nextMoimePhotoLst);

    likeLoadingLst.current = likeLoadingLst.current.filter(
      (el) => el !== photoId
    );
    console.warn('LOCK 해제', photoId);
  }

  useEffect(() => {
    fetchData(moimeId, cursorId); // 최신 사진 18장 가져오기 (cursorId: null, size : 18)

    const option = {
      root: null,
      rootMargin: '-300px 0px',
      threshold: 0.3,
    };

    observerRef.current = new IntersectionObserver(observerCallback, option);

    return () => {
      // 컴포넌트 언마운트 시 observer 해제
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        targetsRef.current.forEach((target) => {
          if (target) observerRef.current!.unobserve(target);
        });
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getTrueOrFasle(oddEven.current);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    moimePhotoLst.forEach((el, idx) => {
      photoIdIndexMap.current.set(el.photoId, idx);
    });

    if (cursorId === null) return;
    observerRef.current!.observe(
      targetsRef.current[targetsRef.current.length - 1]
    );

    setPageNum(targetsRef.current.length - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moimePhotoLst]);

  useEffect(() => {
    if (intersectAction === 'getPhoto') {
      if (!isLast) {
        fetchData(moimeId, cursorId); // api 요청
      }
    }
    setIntersectAction('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersectAction]);

  useEffect(() => {
    toast(
      (t) => (
        <div style={{ display: 'flex' }}>
          <button
            style={{
              fontSize: '24px',
              marginRight: '16px',
              background: 'white',
            }}
            onClick={() => {
              toast.dismiss(t.id);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
              setRenderComponent!('');
              setTimeout(() => {
                setRenderComponent!('PhotoList');
              }, 0);
            }}
          >
            ⏫
          </button>
          <div style={{ margin: '0', padding: '2px', lineHeight: '32px' }}>
            userName님이 사진을 업로드 했습니다.
          </div>
        </div>
      ),
      { duration: 3000 }
    );
    setIsNew(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  useEffect(() => {
    console.log('pageNum 변경됨 :', pageNum);
    console.log('cursorId 변경됨: ', cursorId);
  }, [pageNum, cursorId]);

  return (
    <>
      <ul className={cn('photo_list')}>
        {moimePhotoLst.map((el: MoimePhoto, idx: number) => {
          const photoCardProps: PhotoCardProps = {
            profileUrl: el.uploaderProfile,
            photoUrl: el.url,
            photoId: el.photoId,
            likes: el.likes,
            liked: el.liked,
            likeButtonHandler: likeButtonHandler,
          };

          if ((idx + 1) % 18 === 0) {
            return (
              <li
                className={cn('item')}
                key={`photocard-${el.photoId}`}
                ref={(htmlEl: HTMLLIElement) => {
                  if (htmlEl !== null) {
                    targetsRef.current[Math.floor(idx / 18)] = htmlEl;
                  }
                }}
              >
                <PhotoCard {...photoCardProps} />
              </li>
            );
          } else {
            return (
              <li className={cn('item')} key={`photocard-${el.photoId}`}>
                <PhotoCard {...photoCardProps} />
              </li>
            );
          }
        })}
      </ul>
      <div style={{ height: '1000px', backgroundColor: 'red' }}></div>
    </>
  );
};

export default PhotoList;
