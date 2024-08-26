import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './layer.module.scss';

const cn = classnames.bind(styles);

interface Props {
  children: ReactNode;
  classNameForView?: '' | 'location_search_input';
}

const Layer = ({ children, classNameForView }: Props) => {
  return (
    <div className={cn('layer', classNameForView)}>
      <div className={cn('inner')}>{children}</div>
    </div>
  );
};

export default Layer;
