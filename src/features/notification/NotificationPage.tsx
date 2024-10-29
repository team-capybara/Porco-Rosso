import classnames from 'classnames/bind';
import styles from './notificationPage.module.scss';
import BackNavigation from '../auth/components/signup/BackNavigation';
import IconInvite24X24 from '../../assets/svg/icon/IconInvite24X24';
import IconFlash24X24 from '../../assets/svg/icon/IconFlash24X24';
import IconDanger24X24 from '../../assets/svg/icon/IconDanger24X24';
import IconImage24X24 from '../../assets/svg/icon/IconImage24X24';
import IconAddUser24X24 from '../../assets/svg/icon/IconAddUser24X24';
import { useNotificationQuery } from './utils/useNotificationsQuery';
import { useEffect, useRef } from 'react';
import React from 'react';
import { GetNotificationsReponse, MoimeNotification } from './types';
import { minutesAgo } from '../../common/utils/dateUtils';
import IconCloseCircle24X24 from '../../assets/svg/icon/IconCloseCircle24X24';
// import IconFlash24X24 from '../../assets/svg/icon/IconFlash24X24';
// import IconDanger24X24 from '../../assets/svg/icon/IconDanger24X24';
// import IconImage24X24 from '../../assets/svg/icon/IconImage24X24';
// import IconCloseCircle24X24 from '../../assets/svg/icon/IconCloseCircle24X24';
// import IconAddUser24X24 from '../../assets/svg/icon/IconAddUser24X24';

const cn = classnames.bind(styles);

const NotificationPage = () => {
  const targetRef = useRef<HTMLLIElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    // hasNextPage,
    isFetchingNextPage,
    // resetAndFetchFirstPage,
  } = useNotificationQuery();

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return;
      if (isFetchingNextPage) return;
      fetchNextPage();
    });
  };

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.3, // 30% 정도 화면에 보이면 트리거
    });

    observerRef.current.observe(targetElement);

    return () => {
      if (observerRef.current && targetElement) {
        observerRef.current.unobserve(targetElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.warn('data is changed', data);
  }, [data]);

  const renderItem = (notification: MoimeNotification) => {
    let isWarning = false;
    if (
      notification.type in
      ['MOIM_FAILED', 'MOIM_FINISHED', 'MOIM_OWNER_ASSIGNED']
    ) {
      isWarning = true;
    }

    return (
      // todo: 읽지 않은 알림인 경우, '.not_read' 클래스 활성화 부탁드립니다.
      <li
        className={cn('item', { not_read: !notification.checked })}
        key={`notification-${notification.id}`}
      >
        <div className={cn('inner')}>
          {/* todo: 중요 아이콘인 경우에는 '.warning' 클래스 활성화 부탁드립니다. */}
          {/* todo: 모임 시작 실패인 경우, '.warning' 클래스 활성화 부탁드립니다. */}
          <div className={cn('badge', { warning: isWarning })}>
            {notification.type === 'MOIM_INVITED' && (
              <IconInvite24X24 className={cn('icon')} />
            )}
            {notification.type === 'MOIM_STARTED' && (
              <IconFlash24X24 className={cn('icon')} />
            )}
            {notification.type === 'MOIM_FAILED' && (
              <IconCloseCircle24X24 className={cn('icon')} />
            )}
            {notification.type === 'MOIM_FINISHED' && (
              <IconDanger24X24 className={cn('icon')} />
            )}
            {notification.type === 'MOIM_COMPLETED' && (
              <IconImage24X24 className={cn('icon')} />
            )}
            {notification.type === 'MOIM_OWNER_ASSIGNED' && (
              <IconDanger24X24 className={cn('icon')} />
            )}
            {notification.type === 'FOLLOWER_ADDED' && (
              <IconAddUser24X24 className={cn('icon')} />
            )}
          </div>
          <div className={cn('text_area')}>
            <div className={cn('text')}>{notification.content}</div>
            <div className={cn('time')}>
              <span className={cn('number')}>
                {minutesAgo(notification.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className={cn('notification_page')}>
      <BackNavigation classNameForIconType="close_type" />
      <h1 className={cn('title')}>알림</h1>
      <ul className={cn('notification_list')}>
        {data?.pages.map((page: GetNotificationsReponse, pageNum: number) => (
          <React.Fragment key={`page-${pageNum}`}>
            {page.data.map((notification: MoimeNotification) => {
              return renderItem(notification);
            })}
          </React.Fragment>
        ))}
        {/* 페이지네이션 기준점을 잡기 위한 요소 */}
        <li className={cn('base')} ref={targetRef}></li>
      </ul>
    </div>
  );
};

export default NotificationPage;
