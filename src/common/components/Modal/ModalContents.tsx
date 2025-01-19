import classnames from 'classnames/bind';
import styles from './modalContents.module.scss';
import { ModalContentsProps } from '../../../features/gathering/types';

const cn = classnames.bind(styles);

const ModalContents = ({
  title = '',
  description = '',
  firstButton = '',
  onClickFirstButton,
  secondButton = '',
  onClickSecondButton,
}: ModalContentsProps) => {
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
