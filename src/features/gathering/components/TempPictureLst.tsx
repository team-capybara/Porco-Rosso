/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import TempPicture from './TempPicture';
import { getMoimePhoto } from '../../../api/service/mockApi';
import axios from 'axios';

const TempPictureLst = () => {
  const tempStyle = {
    display: 'flex',
    width: 'calc(100vw - 32px)',
    // height: '1500px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '1px solid #adff45',
  };

  const target = useRef<HTMLDivElement>(null);
  const page = useRef<number>(1);
  const oddEven = useRef<number>(1);

  const [loading, setLoading] = useState<boolean>(false);
  const [tempArr, setTempArr] = useState<number[]>(
    [...new Array(20)].map((_, i) => i + 1)
  );

  useEffect(() => {
    const reqGetMoimePhoto = async () => {
      const res = await getMoimePhoto('1');
      console.warn('reqGetMoimePhoto', res);
    };

    reqGetMoimePhoto();

    const res = getMoimePhoto('1');
    console.warn('체크', res);
    return observer.observe(target.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      getTrueOrFasle(oddEven.current);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  console.warn('불러옴~', tempArr);

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

  console.warn('불러옴~', tempArr);

  function intersectionHandler() {
    console.log('page: ', page.current);
    setTempArr((prev) => prev.concat([21, 22, 23, 24, 25, 26]));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.warn('체크', entry);
      if (!entry.isIntersecting) return;
      if (loading) return;

      intersectionHandler();
      page.current += 1;
    });
  });

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <div style={tempStyle as React.CSSProperties}>
        {tempArr.map((el, idx) => {
          return <TempPicture pictureId={idx} key={idx}></TempPicture>;
        })}
      </div>
      <div style={{ height: '20px', backgroundColor: 'red' }} ref={target}>
        <p>{page.current}</p>
      </div>
      <button
        style={{
          height: '50px',
          width: '200px',
          backgroundColor: 'yellow',
          position: 'fixed',
          bottom: '50px',
          left: '100px',
        }}
        onClick={handleClick}
      >
        새로운 사진 있음 ⏫
      </button>
    </>
  );
};

export default TempPictureLst;
