import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './scrollPhotoList.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';
import { MoimePhoto, ongoingType } from '../../types';
import { PhotoCardProps } from './PhotoList';
import { getMoimePhoto } from '../../../../api/service/mockApi';
import { getMoimePhotoResponse, Photo } from '../../types';

const cn = classnames.bind(styles);

interface Props {
  hiddenTitle?: boolean;
  isMiniPhotoCard?: boolean;
  moimeId: string;
  setRenderComponent?: React.Dispatch<React.SetStateAction<ongoingType>>;
}

const ScrollPhotoList = ({
  hiddenTitle = false,
  isMiniPhotoCard = false,
  moimeId = '0',
  setRenderComponent = () => {},
}: Props) => {
  const size: number = 18;

  const targetRef = useRef<HTMLLIElement>(null);
  const likeLoadingLst = useRef<number[]>([]);

  const [isLast, setIsLast] = useState<boolean>(false);
  const [intersectAction, setIntersectAction] = useState<'idle' | 'getPhoto'>(
    'idle'
  );
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [moimePhotoLst, setMoimePhotoLst] = useState<MoimePhoto[]>([]);

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

    nextMoimePhotoLst = [...moimePhotoLst, ...resPhotoLst];

    setCursorId(nextMoimePhotoLst[nextMoimePhotoLst.length - 1].photoId);
    setMoimePhotoLst(nextMoimePhotoLst);
    setLoading(false);
  }

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;
      if (loading) return;

      setIntersectAction('getPhoto');
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
    let nextMoimePhotoLst: MoimePhoto[] = [];
    if (photoId !== undefined) {
      nextMoimePhotoLst = moimePhotoLst.map((el) => {
        if (el.photoId === photoId) {
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
  }

  useEffect(() => {
    fetchData(moimeId, cursorId); // 최신 사진 18장 가져오기 (cursorId: null, size : 18)

    const observer = new IntersectionObserver(observerCallback);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(targetRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (intersectAction === 'getPhoto') {
      if (!isLast) {
        fetchData(moimeId, cursorId); // api 요청
      }
    }
    setIntersectAction('idle');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersectAction]);

  return (
    <div
      className={cn('scroll_photo_list', {
        is_mini_photo_card: isMiniPhotoCard,
      })}
    >
      {!hiddenTitle && (
        <div className={cn('title_area')}>
          <div className={cn('main_title')}>
            <strong className={cn('title')}>순간 모음</strong>
            <button
              type="button"
              className={cn('button')}
              onClick={() => {
                setRenderComponent('PhotoList');
              }}
            >
              <ArrowLeft24X24 className={cn('arrow_icon')} />
              <span className={cn('blind')}>더보기</span>
            </button>
          </div>
          <div className={cn('description')}>10장의 사진</div>
        </div>
      )}
      <HorizontalScrollWrapper>
        <ul className={cn('photo_list')}>
          {moimePhotoLst.map((el: MoimePhoto) => {
            const photoCardProps: PhotoCardProps = {
              profileUrl: el.uploaderProfile,
              photoUrl: el.url,
              photoId: el.photoId,
              likes: el.likes,
              liked: el.liked,
              likeButtonHandler: likeButtonHandler,
            };

            return (
              <li className={cn('item')} key={`photocard-${el.photoId}`}>
                <PhotoCard {...photoCardProps} />
              </li>
            );
          })}
          {isMiniPhotoCard ? (
            <li
              className={cn('item')}
              style={{
                backgroundColor: 'black',
                width: '86px',
                height: '86px',
              }}
              ref={targetRef}
            ></li>
          ) : (
            <li
              className={cn('item')}
              style={{
                backgroundColor: 'black',
                width: '220px',
                height: '220px',
              }}
              ref={targetRef}
            ></li>
          )}
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ScrollPhotoList;
