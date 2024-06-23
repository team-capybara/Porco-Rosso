import React, { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './Modal.module.scss';

const cn = classnames.bind(styles);

interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <div className={cn('modal')}>
      <div className={cn('inner')}>{children}</div>
    </div>
  );
};

export default Modal;
