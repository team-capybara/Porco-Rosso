import classnames from 'classnames/bind';
import style from './alarmSetting.module.scss';
import Modal from '../../../../common/components/Modal/Modal';
import ModalContents from '../../../../common/components/Modal/ModalContents';

const cn = classnames.bind(style);

interface ItemProps {
  text: string;
  isOff: boolean;
}

const AlarmSetting = () => {
  const renderItem = ({ text, isOff }: ItemProps) => {
    return (
      <div className={cn('item')}>
        {text}
        {/* todo: 토글 여부에 따라 off 클래스 토글부탁드립니다 */}
        <button type="button" className={cn('toggle_button', { off: isOff })}>
          {/* todo: 토글 여부에 따라 블라인드 텍스트 "켜기/끄기" 변경부탁드립니다 */}
          <span className="blind">켜기</span>
        </button>
      </div>
    );
  };

  return (
    <div className={cn('alarm_setting')}>
      <strong className={cn('title')}>알림 설정</strong>
      <div className={cn('section')}>
        <div className={cn('section_title')}>모임 알림</div>
        {renderItem({ text: '모임 초대', isOff: true })}
        {renderItem({ text: '모임 시작', isOff: true })}
        {renderItem({ text: '모임 종료', isOff: true })}
        {renderItem({ text: '추억 생성', isOff: true })}
        {renderItem({ text: '방장 변경', isOff: true })}
      </div>
      <div className={cn('section')}>
        <div className={cn('section_title')}>친구 알림</div>
        {renderItem({ text: '나를 추가한 친구', isOff: true })}
      </div>
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
    </div>
  );
};

export default AlarmSetting;
