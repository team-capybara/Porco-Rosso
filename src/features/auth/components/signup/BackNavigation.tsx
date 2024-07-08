import classnames from 'classnames/bind';
import styles from './backNavigation.module.scss';

import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import IconClose24X24 from '../../../../assets/svg/icon/IconClose24X24';

const cn = classnames.bind(styles);

interface Props {
  classNameForIconType?: '' | 'arrow_type' | 'close_type';
  blindText?: string;
}

const BackNavigation = ({
  classNameForIconType = '',
  blindText = '',
}: Props) => {
  return (
    <div className={cn('back_navigation')}>
      {/* 승현 todo: 아이콘에 따른 분기 필요 */}
      <a href="/" className={cn('link')}>
        {classNameForIconType == 'arrow_type' && (
          <ArrowLeft24X24 className={cn('icon')} />
        )}
        {classNameForIconType == 'close_type' && (
          <IconClose24X24 className={cn('icon')} />
        )}
        {blindText && <span className={cn('blind')}>{blindText}</span>}
      </a>
    </div>
  );
};

export default BackNavigation;
