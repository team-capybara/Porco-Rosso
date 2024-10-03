import classnames from 'classnames/bind';
import styles from './nextStepButton.module.scss';

const cn = classnames.bind(styles);

interface Props {
  text: string;
  onClick: () => void;
}

const NextStepLink = ({ text, onClick }: Props) => {
  return (
    <div className={cn('next_step_button')}>
      <div className={cn('inner')}>
        <button type="button" onClick={onClick} className={cn('button')}>
          {text}
        </button>
      </div>
    </div>
  );
};

export default NextStepLink;
