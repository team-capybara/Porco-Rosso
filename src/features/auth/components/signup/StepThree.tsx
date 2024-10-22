import classnames from 'classnames/bind';
import styles from './stepThree.module.scss';
import { goOnboarding } from '../../../../bridge/authBridge';
import NextStepButton from './NextStepButton';

const cn = classnames.bind(styles);

const StepThree = ({ nickname }: { nickname: string }) => {
  return (
    <div className={cn('step_three')}>
      <h2 className={cn('title')}>
        축하드려요!
        <br />
        이제 {nickname}님의 소중한 모임,
        <br />
        모이미에서 차곡차곡 쌓아가요
      </h2>
      <div className={cn('wrap_agree_conditions')}>
        <div className={cn('inner')}>
          <div className={cn('button_area')}>
            {/* todo: 버튼 선택된 경우, selected 클래스 활성화 및 span.blind 노출 부탁드립니다. */}
            <button type="button" className={cn('button', { selected: false })}>
              <span className={cn('blind')}>선택됨</span>
            </button>
            <div className={cn('text')}>
              <a href="/" className={cn('link')}>
                개인정보 처리방침
              </a>
              을 모두 확인했으며, 이에 동의해요.
            </div>
          </div>
          <div className={cn('button_area')}>
            {/* todo: 버튼 선택된 경우, selected 클래스 활성화 및 span.blind 노출 부탁드립니다. */}
            <button type="button" className={cn('button', { selected: true })}>
              <span className={cn('blind')}>선택됨</span>
            </button>
            <div className={cn('text')}>
              <a href="/" className={cn('link')}>
                서비스 이용약관
              </a>
              을 모두 확인했으며, 이에 동의해요.
            </div>
          </div>
        </div>
      </div>
      <NextStepButton text="다음" onClick={goOnboarding} />
    </div>
  );
};

export default StepThree;
