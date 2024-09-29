import classnames from 'classnames/bind';
import style from './myPageMain.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import Modal from '../../../../common/components/Modal/Modal';
import ModalContents from '../../../../common/components/Modal/ModalContents';

const cn = classnames.bind(style);

interface ItemProps {
  text: string;
}

const MyPageMain = () => {
  const renderItem = ({ text }: ItemProps) => {
    return (
      <a href="/" className={cn('link')}>
        <span className={cn('text')}>{text}</span>
        <ArrowLeft24X24 className={cn('arrow_icon')} />
      </a>
    );
  };

  return (
    <div className={cn('my_page_main')}>
      <strong className={cn('title')}>마이페이지</strong>
      <div className={cn('profile_area')}>
        <div className={cn('thumbnail')}>
          <img
            src="https://via.placeholder.com/150.jpg"
            alt=""
            className={cn('image')}
          />
        </div>
        <div className={cn('information')}>
          <strong className={cn('nickname')}>닉네임</strong>
          <div className={cn('email')}>social@apple.com</div>
        </div>
      </div>
      <div className={cn('button_area')}>
        <button type="button" className={cn('revise_button')}>
          프로필 수정
        </button>
      </div>
      {renderItem({ text: '알림 설정' })}
      <div className={cn('section')}>
        {renderItem({ text: '자주 묻는 질문' })}
        {renderItem({ text: '1:1 문의' })}
        {renderItem({ text: '앱 평가' })}
      </div>
      <div className={cn('section')}>
        {renderItem({ text: '서비스 약관' })}
        {renderItem({ text: '개인정보 처리방침' })}
        {renderItem({ text: '공지사항' })}
        <div className={cn('version_area')}>
          <div className={cn('version')}>
            버전정보<span className={cn('number')}>1.0.0(1)</span>
          </div>
          <div className={cn('text')}>강남구 근처</div>
        </div>
      </div>
      <div className={cn('account_area')}>
        <a href="/" className={cn('account_link')}>
          로그아웃
        </a>
        <a href="/" className={cn('account_link')}>
          계정 삭제
        </a>
      </div>
      {/* 로그아웃 클릭 시 모달 */}
      <Modal>
        <ModalContents
          title="로그아웃"
          description="모이미에서 로그아웃할까요?"
          firstButton="아직이요"
          secondButton="로그아웃"
          onClickFirstButton={() => {}}
        />
      </Modal>
    </div>
  );
};

export default MyPageMain;
