import classnames from 'classnames/bind';
import styles from './nextStepButton.module.scss';

const cn = classnames.bind(styles);

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const NextStepLink = ({ text, onClick, disabled }: Props) => {
  return (
    <div className={cn('next_step_button')}>
      <div className={cn('inner')}>
        <button
          type="button"
          onClick={onClick}
          className={cn('button')}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default NextStepLink;
