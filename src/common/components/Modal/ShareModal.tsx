import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './shareModal.module.scss';

const cn = classnames.bind(styles);

interface Props {
  children: ReactNode;
}

const ShareModal = ({ children }: Props) => {
  return (
    <div className={cn('share_modal')}>
      <div className={cn('inner')}>
        {children}
        <div className={cn('moime')}>
          <span className={cn('blind')}>MOIME</span>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
