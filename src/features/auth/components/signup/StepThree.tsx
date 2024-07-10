import classnames from 'classnames/bind';
import styles from './stepThree.module.scss';

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
    </div>
  );
};

export default StepThree;
