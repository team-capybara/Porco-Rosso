import { ReactNode } from 'react';
import classnames from 'classnames/bind';
import styles from './layer.module.scss';

const cn = classnames.bind(styles);

interface Props {
  children: ReactNode;
  classNameForView?: '' | 'location_search_input';
  layerRef: React.RefObject<HTMLDivElement>;
}

const Layer = ({ children, classNameForView, layerRef }: Props) => {
  return (
    <div className={cn('layer', classNameForView)} ref={layerRef}>
      <div className={cn('inner')}>{children}</div>
    </div>
  );
};

export default Layer;
