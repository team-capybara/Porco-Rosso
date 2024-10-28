import { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './stepThree.module.scss';
import { goOnboarding } from '../../../../bridge/authBridge';
import NextStepButton from './NextStepButton';

const cn = classnames.bind(styles);

const StepThree = ({ nickname }: { nickname: string }) => {
  const [privacyChecked, setPrivacyChecked] = useState(false); // 개인정보 처리방침 동의 상태
  const [termsChecked, setTermsChecked] = useState(false); // 서비스 이용약관 동의 상태

  // 모든 항목이 동의되었는지 확인하는 함수
  const isAllChecked = privacyChecked && termsChecked;

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
            <button
              type="button"
              className={cn('button', { selected: privacyChecked })}
              onClick={() => setPrivacyChecked(!privacyChecked)} // 클릭 시 상태 토글
            >
              <span className={cn('blind')}>
                {privacyChecked ? '선택됨' : ''}
              </span>
            </button>
            <div className={cn('text')}>
              <a
                href="https://www.notion.so/woogies-outer-brain/Team-Capybara-28b73095ed364ecc9ecde51660ef2a23"
                className={cn('link')}
              >
                개인정보 처리방침
              </a>
              을 모두 확인했으며, 이에 동의해요.
            </div>
          </div>

          <div className={cn('button_area')}>
            <button
              type="button"
              className={cn('button', { selected: termsChecked })}
              onClick={() => setTermsChecked(!termsChecked)} // 클릭 시 상태 토글
            >
              <span className={cn('blind')}>
                {termsChecked ? '선택됨' : ''}
              </span>
            </button>
            <div className={cn('text')}>
              <a
                href="https://www.notion.so/woogies-outer-brain/Team-Capybara-28b73095ed364ecc9ecde51660ef2a23"
                className={cn('link')}
              >
                서비스 이용약관
              </a>
              을 모두 확인했으며, 이에 동의해요.
            </div>
          </div>
        </div>
      </div>

      {/* 모든 항목이 동의된 경우에만 버튼 활성화 */}
      <NextStepButton
        text="다음"
        onClick={goOnboarding}
        disabled={!isAllChecked}
      />
    </div>
  );
};

export default StepThree;
