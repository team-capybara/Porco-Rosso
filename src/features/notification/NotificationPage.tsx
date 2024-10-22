import classnames from 'classnames/bind';
import styles from './notificationPage.module.scss';
import BackNavigation from '../auth/components/signup/BackNavigation';
import { notificationProps } from './types/index';
import IconInvite24X24 from '../../assets/svg/icon/IconInvite24X24';
// import IconFlash24X24 from '../../assets/svg/icon/IconFlash24X24';
// import IconDanger24X24 from '../../assets/svg/icon/IconDanger24X24';
// import IconImage24X24 from '../../assets/svg/icon/IconImage24X24';
// import IconAddUser24X24 from '../../assets/svg/icon/IconAddUser24X24';

const cn = classnames.bind(styles);

const NotificationPage = (props: notificationProps) => {
  console.log(props);
  const renderItem = () => {
    return (
      // todo: 읽지 않은 알림인 경우, '.not_read' 클래스 활성화 부탁드립니다.
      <li className={cn('item', { not_read: true })}>
        <div className={cn('inner')}>
          {/* todo: 중요 아이콘인 경우에는 '.warning' 클래스 활성화 부탁드립니다. */}
          <div className={cn('badge', { warning: false })}>
            {/* todo: 초대인 경우 IconInvite24X24 노출 */}
            <IconInvite24X24 className={cn('icon')} />

            {/* todo: 모임인 경우 IconFlash24X24 노출 */}
            {/* <IconFlash24X24 className={cn('icon')} /> */}

            {/* todo: 중요알림인 경우 IconDanger24X24 노출 */}
            {/* <IconDanger24X24 className={cn('icon')} /> */}

            {/* todo: 추억인 경우 IconImage24X24 노출 */}
            {/* <IconImage24X24 className={cn('icon')} /> */}

            {/* todo: 친구인 경우 IconAddUser24X24 노출 */}
            {/* <IconAddUser24X24 className={cn('icon')} /> */}
          </div>
          <div className={cn('text_area')}>
            <div
              className={cn('text')}
            >{`'카피바라 회동' 모임이 종료됐어요. 딱 10분 동안 베스트 사진을 고를 수 있어요!`}</div>
            <div className={cn('time')}>
              <span className={cn('number')}>45</span>분 전
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
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
      </ul>
    </div>
  );
};

export default NotificationPage;
