import React, { ReactNode } from 'react';
import classnames from 'classnames/bind';
import IconRefresh24X24 from '../../../../assets/svg/icon/IconRefresh24X24';
import styles from './gatheringTitle.module.scss';
import IconShare24X24 from '../../../../assets/svg/icon/IconShare24X24';

const cn = classnames.bind(styles);

interface Props {
  title?: string;
  description?: ReactNode;
  hasRefreshButton?: boolean;
  hasShareButton?: boolean;
}

const GatheringTitle = ({
  title = '',
  description = '',
  hasRefreshButton = false,
  hasShareButton = false,
}: Props) => {
  // todo: 다른 페이지 작업 진행하면서 분기가 추가되어 수정될 수 있는 점 참고부탁드립니다.
  return (
    <div className={cn('gathering_title')}>
      <strong className={cn('title')}>{title}</strong>
      <div className={cn('description')}>{description}</div>
      {(hasRefreshButton || hasShareButton) && (
        <button type="button" className={cn('button')}>
          {hasRefreshButton && (
            <>
              <IconRefresh24X24 className={cn('icon')} />
              <span className={cn('blind')}>새로고침</span>
            </>
          )}
          {hasShareButton && (
            <>
              <IconShare24X24 className={cn('icon')} />
              <span className={cn('blind')}>공유하기</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default GatheringTitle;
