import classnames from 'classnames/bind';
import styles from './nextStepLink.module.scss';

const cn = classnames.bind(styles);

interface Props {
  text: string;
}

const NextStepLink = ({ text }: Props) => {
  return (
    <a href="/" className={cn('next_step_link')}>
      {text}
    </a>
  );
};

export default NextStepLink;
