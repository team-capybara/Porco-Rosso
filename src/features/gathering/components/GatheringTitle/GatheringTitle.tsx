import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './gatheringTitle.module.scss';
import IconRefresh24X24 from '../../../../assets/svg/icon/IconRefresh24X24';
import IconShare24X24 from '../../../../assets/svg/icon/IconShare24X24';
import IconEdit16X162 from '../../../../assets/svg/icon/IconEdit16X162';

const cn = classnames.bind(styles);

interface Props {
  title?: string;
  description?: ReactNode;
  hasRefreshButton?: boolean;
  onClickRefreshButton?: () => void;
  hasShareButton?: boolean;
  onClickShareButton?: () => void;
  classNameForPage?: '' | 'create_page' | 'invite_friends';
}

const GatheringTitle = ({
  title = '',
  description = '',
  hasRefreshButton = false,
  onClickRefreshButton,
  hasShareButton = false,
  onClickShareButton,
  classNameForPage = '',
}: Props) => {
  return (
    <div className={cn('gathering_title')}>
      <strong className={cn('title')}>
        {title}
        {classNameForPage === 'create_page' && (
          <button type="button" className={cn('edit_button')}>
            <IconEdit16X162 className={cn('icon')} />
            <span className="blind">수정</span>
          </button>
        )}
      </strong>
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
      {classNameForPage === 'invite_friends' && (
        // todo: 친구 선택 시, disabled={false} 로 토글 부탁드립니다.
        <button type="button" className={cn('button')} disabled={false}>
          완료
        </button>
      )}
    </div>
  );
};

export default GatheringTitle;
