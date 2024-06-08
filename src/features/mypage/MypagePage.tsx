import React from 'react';
import { mypageProps } from './types/index';

const MypagePage = (props: mypageProps) => {
  console.log(props);
  return (
    <div>
      <h1>my Page</h1>
      {/* 마이 페이지 */}
    </div>
  );
};

export default MypagePage;
