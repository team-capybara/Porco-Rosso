import classnames from 'classnames/bind';
import style from './alarmSetting.module.scss';
import Modal from '../../../../common/components/Modal/Modal';
import ModalContents from '../../../../common/components/Modal/ModalContents';
import { useEffect, useState } from 'react';
import {
  useAlarmSettings,
  AlarmSettingType,
} from '../../utils/useAlarmSettings';

const cn = classnames.bind(style);

interface ItemProps {
  text: string;
  isOff: boolean;
  type: AlarmSettingType;
}

const AlarmSetting = () => {
  const [modalOpen] = useState<boolean>(false);
  const [systemAlarmSetting, setSystemAlarmSetting] = useState<boolean>(false);
  const { settings, updateSetting, loading } = useAlarmSettings();

  useEffect(() => {
    if (window.kmpJsBridge === undefined) return;

    window.kmpJsBridge.callNative(
      'onGetNotificationPermission',
      '',
      (data: string) => {
        const grantedState: boolean = JSON.parse(data).granted;
        setSystemAlarmSetting(grantedState);
      }
    );
  }, []); // 시스템 알림 설정 확인

  const renderItem = ({ text, isOff, type }: ItemProps) => {
    return (
      <div className={cn('item')}>
        {text}
        {/* todo: 토글 여부에 따라 off 클래스 토글부탁드립니다 */}
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            updateSetting(type, isOff);
          }}
          className={cn('toggle_button', { off: isOff })}
        >
          {/* todo: 토글 여부에 따라 블라인드 텍스트 "켜기/끄기" 변경부탁드립니다 */}
          <span className="blind">{isOff ? '켜기' : '끄기'}</span>
        </button>
      </div>
    );
  };

  return (
    // todo: 시스템 알림 off 인 경우, '.is_off' 클래스 활성화부탁드립니다.
    <div className={cn('alarm_setting', { is_off: !systemAlarmSetting })}>
      <strong className={cn('title')}>알림 설정</strong>
      <div className={cn('section')}>
        <div className={cn('item')}>
          시스템 알림
          {/* todo: 활성화 여부에 따라 블라인드 텍스트 "ON/OFF" 변경부탁드립니다 */}
          <div className={cn('text')}>{systemAlarmSetting ? 'ON' : 'OFF'}</div>
        </div>
      </div>
      <div className={cn('section')}>
        <div className={cn('section_title')}>모임 알림</div>
        {renderItem({
          text: '모임 초대',
          isOff: !settings.isMoimInvitatedOn,
          type: 'MOIM_INVITATED',
        })}
        {renderItem({
          text: '모임 시작',
          isOff: !settings.isMoimStartedOn,
          type: 'MOIM_STARTED',
        })}
        {renderItem({
          text: '모임 종료',
          isOff: !settings.isMoimFinishedOn,
          type: 'MOIM_FINISHED',
        })}
        {renderItem({
          text: '추억 생성',
          isOff: !settings.isMoimCompletedOn,
          type: 'MOIM_COMPLETED',
        })}
        {renderItem({
          text: '방장 변경',
          isOff: !settings.isMoimOwnerAssignedOn,
          type: 'MOIM_OWNER_ASSIGNED',
        })}
      </div>
      <div className={cn('section')}>
        <div className={cn('section_title')}>친구 알림</div>
        {renderItem({
          text: '나를 추가한 친구',
          isOff: !settings.isFollowerAddedOn,
          type: 'FOLLOWER_ADDED',
        })}
      </div>
      {modalOpen && (
        <Modal>
          <ModalContents
            title="알림 설정을 변경할까요?"
            description={
              <>
                서비스의 이벤트 및 업데이트 알림을
                <br />
                더 이상 받을 수 없게 됩니다.
                <br />
                정말 알림을 해제하시겠습니까?
              </>
            }
            firstButton="알림 해제"
            secondButton="알림 유지"
            onClickFirstButton={() => {}}
          />
        </Modal>
      )}
    </div>
  );
};

export default AlarmSetting;
