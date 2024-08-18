import classnames from 'classnames/bind';
import styles from './stepThree.module.scss';
import { goOnboarding } from '../../../../bridge/authBridge';

const cn = classnames.bind(styles);

const StepThree = () => {
  return (
    <div className={cn('step_three')}>
      <h2 className={cn('title')}>
        축하드려요!
        <br />
        이제 00님의 소중한 모임,
        <br />
        모이미에서 차곡차곡 쌓아가요
      </h2>
      {/* 가입 단계가 많이 생략되어서, 링크이동이 아니라 버튼으로 바뀔 것 같습니다. 마크업 부탁드립니다. */}
      {/* 인라인 스타일태그는 글자가 너무 안보여섴 잠깐 썼어용 */}
      <button
        onClick={goOnboarding}
        style={{ color: '#fff', fontSize: '18px' }}
      >
        다음
      </button>
    </div>
  );
};

export default StepThree;
