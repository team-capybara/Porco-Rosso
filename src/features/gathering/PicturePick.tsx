import React from 'react';
import TempPictureLst from './components/TempPictureLst';
import { PicturePickProps } from './types/index';

const PicturePick = (props: PicturePickProps) => {
  console.log(props);
  return (
    <div>
      <h1>PicturePick Page</h1>
      <TempPictureLst></TempPictureLst>
      {/* 모임 종료 후 사진 좋아요하는 페이지 */}
    </div>
  );
};

export default PicturePick;
