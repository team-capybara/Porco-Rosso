import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './photoList.module.scss';
import PhotoCard from './PhotoCard/PhotoCard';
import { getMoimePhoto } from '../../../../api/service/mockApi';
import axios from 'axios';

const cn = classnames.bind(styles);

interface PhotoListProps {
  moimeId?: number;
}

export interface PhotoCardProps {
  photoUrl: string;
  profileUrl: string;
  photoId: number;
}

export interface MoimePhoto {
  photoId: number;
  uploadedAt: string;
  uploaderId: number;
  uploaderNickname: string;
  uploaderProfile: string;
  url: string;
}

const PhotoList = ({ moimeId }: PhotoListProps) => {
  // const target = useRef<HTMLDivElement>(null);
  const cursorId = useRef<number | null>(null);
  const oddEven = useRef<number>(1);
  const size: number = 18;
  console.log(moimeId);

  // const [loading, setLoading] = useState<boolean>(false);
  const [moimePhotoLst, setMoimePhotoLst] = useState<MoimePhoto[]>([]);

  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((entry) => {
  //     console.warn('체크', entry);
  //     if (!entry.isIntersecting) return;
  //     if (loading) return;

  //     intersectionHandler();
  //     // page.current += 1;
  //   });
  // });

  // 최신 사진 18장 가져오기 (cursorId: null, size : 18)
  useEffect(() => {
    const fetchData = async () => {
      const res: unknown = await getMoimePhoto('1', cursorId.current, size);
      setMoimePhotoLst((prev) => prev.concat(res.data));
      console.warn('체크', res);
    };

    fetchData();
    // return observer.observe(target.current!);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getTrueOrFasle(oddEven.current);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  async function getTrueOrFasle(num: number) {
    let res = null;

    if (num % 2 === 1) {
      res = await axios.get('/moims/newPhoto/true');
    } else {
      res = await axios.get('/moims/newPhoto/false');
    }

    console.warn('새로운 사진은요?', res.data.isNew);
    oddEven.current += 1;
    return true;
  }

  // function intersectionHandler() {
  //   // api 요청
  //   setTempArr((prev) => prev.concat([21, 22, 23, 24, 25, 26]));
  // }

  // function handleClick() {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  const renderItem = (photoCardProps: PhotoCardProps) => {
    return (
      <li className={cn('item')}>
        <PhotoCard
          props={photoCardProps}
          key={`photocard-${photoCardProps.photoId}`}
        />
      </li>
    );
  };
  return (
    <ul className={cn('photo_list')}>
      {moimePhotoLst.map((el: MoimePhoto, idx: number) => {
        console.warn('체크', el);
        return renderItem({
          profileUrl: el.uploaderProfile,
          photoUrl: el.url,
          photoId: idx,
        });
      })}
    </ul>
  );
};

export default PhotoList;
