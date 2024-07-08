import classnames from 'classnames/bind';
import styles from './nextStepLink.module.scss';

const cn = classnames.bind(styles);

const NextStepLink = () => {
  return (
    <a href="/" className={cn('next_step_link')}>
      다음
    </a>
  );
};

export default NextStepLink;
