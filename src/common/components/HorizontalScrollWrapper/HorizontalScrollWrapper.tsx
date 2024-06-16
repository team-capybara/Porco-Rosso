import React, { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './horizontalScrollWrapper.module.scss';

const cn = classnames.bind(styles);

interface Props {
  children?: ReactNode;
}

const HorizontalScrollWrapper = ({ children }: Props) => {
  // todo: 모바일 터치 스크롤 이벤트 적용부탁드립니다.
  return (
    <div className={cn('horizontal_scroll_wrapper')}>
      <div className={cn('inner')}>{children}</div>
    </div>
  );
};

export default HorizontalScrollWrapper;
