import React from 'react';
import classnames from 'classnames/bind';
import styles from './backNavigation.module.scss';

import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import IconClose24X24 from '../../../../assets/svg/icon/IconClose24X24';

const cn = classnames.bind(styles);

interface Props {
  classNameForIconType?: '' | 'arrow_type' | 'close_type';
  blindText?: string;
  isButton?: boolean;
  hasNext?: boolean;
  targetHref?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const BackNavigation = ({
  classNameForIconType = '',
  blindText = '',
  isButton = false,
  hasNext = false,
  targetHref = '#;', // javascript:void(0);
  onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  },
}: Props) => {
  return (
    <div className={cn('back_navigation')}>
      <div className={cn('inner')}>
        <a
          href={targetHref}
          onClick={
            isButton
              ? (e: React.MouseEvent<HTMLAnchorElement>) => onClick(e)
              : undefined
          }
          className={cn('link')}
        >
          {classNameForIconType == 'arrow_type' && (
            <ArrowLeft24X24 className={cn('icon')} />
          )}
          {classNameForIconType == 'close_type' && (
            <IconClose24X24 className={cn('icon')} />
          )}
          {blindText && <span className={cn('blind')}>{blindText}</span>}
        </a>
        {hasNext && (
          <a href="/" className={cn('next_link')}>
            다음
          </a>
        )}
      </div>
    </div>
  );
};

export default BackNavigation;
