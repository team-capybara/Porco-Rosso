import classnames from 'classnames/bind';
import styles from './stepTwo.module.scss';
import BirthdayInput from './BirthdayInput';

const cn = classnames.bind(styles);

const StepTwo = () => {
  return (
    <div className={cn('step_two')}>
      <h2 className={cn('title')}>
        oo님의
        <br />
        생년월일을 알려주세요
      </h2>
      <BirthdayInput />
    </div>
  );
};

export default StepTwo;
