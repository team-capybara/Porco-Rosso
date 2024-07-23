import classnames from 'classnames/bind';
import styles from './ModalContents.module.scss';

const cn = classnames.bind(styles);

interface Props {
  title: string;
  description?: string;
  firstButton: string;
  onClickFirstButton: () => void;
  secondButton?: string;
  onClickSecondButton?: () => void;
}

const ModalContents = ({
  title = '',
  description = '',
  firstButton = '',
  onClickFirstButton,
  secondButton = '',
  onClickSecondButton,
}: Props) => {
  return (
    <div className={cn('modal_contents')}>
      <div className={cn('title_area')}>
        <strong className={cn('title')}>{title}</strong>
        <p className={cn('description')}>{description}</p>
      </div>
      <div className={cn('button_area')}>
        <button
          type="button"
          className={cn('button')}
          onClick={onClickFirstButton}
        >
          {firstButton}
        </button>
        {secondButton && (
          <button
            type="button"
            className={cn('button')}
            onClick={onClickSecondButton}
          >
            {secondButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalContents;
