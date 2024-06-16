import React from 'react';
import classnames from 'classnames/bind';
import IconRefresh24X24 from '../../../../assets/svg/icon/IconRefresh24X24';
import styles from './gatheringTitle.module.scss';

const cn = classnames.bind(styles);

const GatheringTitle = () => {
  // Markup todo: 제목 줄바꿈 or 말줄임 확인 필요
  // todo: 다른 페이지 작업 진행하면서 분기가 추가되어 수정될 수 있는 점 참고부탁드립니다.
  return (
    <div className={cn('gathering_title')}>
      <strong className={cn('title')}>
        모이미 제목인데요오오오ㅗ오 ㅇ ㄹㄴㅇㄴㄹ ㄴㅇ ㄹㅇㄴ ㄹㅇㄴ
      </strong>
      <div className={cn('date')}>2024년 5월 3일</div>
      <button type="button" className={cn('button')}>
        <IconRefresh24X24 className={cn('refresh_icon')} />
        <span className={cn('blind')}>새로고침</span>
      </button>
    </div>
  );
};

export default GatheringTitle;
