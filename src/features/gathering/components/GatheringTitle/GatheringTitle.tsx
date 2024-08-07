import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import IconRefresh24X24 from '../../../../assets/svg/icon/IconRefresh24X24';
import styles from './gatheringTitle.module.scss';
import IconShare24X24 from '../../../../assets/svg/icon/IconShare24X24';

const cn = classnames.bind(styles);

interface Props {
  title?: string;
  description?: ReactNode;
  hasRefreshButton?: boolean;
  onClickRefreshButton?: () => void;
  hasShareButton?: boolean;
  onClickShareButton?: () => void;
}

const GatheringTitle = ({
  title = '',
  description = '',
  hasRefreshButton = false,
  onClickRefreshButton,
  hasShareButton = false,
  onClickShareButton,
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
              <IconRefresh24X24
                className={cn('icon')}
                onClick={onClickRefreshButton} // 새로고침 버튼 눌렀을 때 새로고침 돌아가는거 같은 이벤트 넣어야할지
              />
              <span className={cn('blind')}>새로고침</span>
            </>
          )}
          {hasShareButton && (
            <>
              <IconShare24X24
                className={cn('icon')}
                onClick={onClickShareButton}
              />
              <span className={cn('blind')}>공유하기</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default GatheringTitle;
