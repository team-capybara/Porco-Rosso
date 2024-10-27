import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './gatheringTitle.module.scss';
import IconRefresh24X24 from '../../../../assets/svg/icon/IconRefresh24X24';
import IconShare24X24 from '../../../../assets/svg/icon/IconShare24X24';
import IconEdit16X162 from '../../../../assets/svg/icon/IconEdit16X162';
import IconDownload24X24 from '../../../../assets/svg/icon/IconDownload24X24';

const cn = classnames.bind(styles);

interface Props {
  title?: string;
  description?: ReactNode;
  hasRefreshButton?: boolean;
  hasEditButton?: boolean;
  onClickRefreshButton?: () => void;
  hasShareButton?: boolean;
  onClickShareButton?: () => void;
  classNameForPage?: '' | 'invite_friends' | 'upcoming_page' | 'share_page';
  onClickEditButton?: () => void;
  hasDownloadButton?: boolean;
  onClickFinishButton?: () => void;
  onClickUpcomingButton?: (mode: string) => void;
  isUserAndOwner?: boolean;
  isParticipant?: boolean;
  mode?: string;
}

const GatheringTitle = ({
  title = '',
  description = '',
  hasRefreshButton = false,
  onClickRefreshButton,
  hasShareButton = false,
  onClickShareButton,
  hasEditButton = false,
  onClickEditButton,
  hasDownloadButton = false,
  onClickFinishButton,
  classNameForPage = '',
  isUserAndOwner = false,
  isParticipant = false,
  mode = '',
  onClickUpcomingButton,
}: Props) => {
  return (
    <div className={cn('gathering_title', classNameForPage)}>
      <strong className={cn('title')}>
        {title}
        {hasEditButton && (
          <button
            type="button"
            className={cn('edit_button')}
            onClick={onClickEditButton}
          >
            <IconEdit16X162 className={cn('icon')} />
            <span className="blind">수정</span>
          </button>
        )}
      </strong>
      <div className={cn('description')}>{description}</div>
      {(hasRefreshButton || hasShareButton || hasDownloadButton) && (
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
          {hasDownloadButton && (
            <>
              <IconDownload24X24
                className={cn('icon')}
                onClick={() => {
                  alert('개발중입니다');
                }}
              />
              <span className={cn('blind')}>다운로드</span>
            </>
          )}
        </button>
      )}
      {classNameForPage === 'upcoming_page' && (
        // todo: 초대한 사람의 경우, '수정' 텍스트 및 'revise' 클래스 적용
        // todo: 초대받은 사람의 경우, '나가기' 텍스트 및 'getout' 클래스 적용
        // todo: 진행 중 모임 수정의 경우, '삭제' 텍스트 및 'delete' 클래스 적용
        <button
          type="button"
          className={cn(
            'button',
            { revise: isUserAndOwner },
            { getout: isParticipant },
            { delete: mode === 'revise' ? true : false }
          )}
          disabled={false}
          onClick={() => onClickUpcomingButton && onClickUpcomingButton(mode)}
        >
          {isUserAndOwner && '수정'}
          {isParticipant && '나가기'}
          {mode === 'revise' && '삭제'}
          {/* 수정 */}
        </button>
      )}
      {classNameForPage === 'invite_friends' && (
        // todo: 친구 선택 시, disabled={false} 로 토글 부탁드립니다.
        <button
          type="button"
          className={cn('button', 'complete')}
          disabled={false}
          onClick={onClickFinishButton}
        >
          완료
        </button>
      )}
    </div>
  );
};

export default GatheringTitle;
