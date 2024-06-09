import React from 'react';
import classnames from 'classnames/bind';
import styles from './backNavigation.module.scss';

const cn = classnames.bind(styles);

const BackNavigation = () => {
  return (
    <div className={cn('back_navigation')}>
      {/* 승현 todo: 뒤로가기 아이콘으로 변경 */}
      <a href="/" className={cn('back_link')}>
        {'<'}
        <span className={cn('blind')}>이전 페이지</span>
      </a>
    </div>
  );
};

export default BackNavigation;
