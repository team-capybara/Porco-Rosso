import classnames from 'classnames/bind';
import styles from './ongoingFooter.module.scss';
import IconCamera24X24 from '../../../../assets/svg/icon/IconCamera24X24';
import IconOut24X24 from '../../../../assets/svg/icon/IconOut24X24';

const cn = classnames.bind(styles);

const OngoingFooter = () => {
  return (
    <div className={cn('ongoing_footer')}>
      <div className={cn('footer')}>
        <button type="button" className={cn('button', 'camera')}>
          <IconCamera24X24 className={cn('icon')} />
          촬영하기
        </button>
        <button type="button" className={cn('button', 'out')}>
          <IconOut24X24 className={cn('icon')} />
          <span className={cn('blind')}>나가기</span>
        </button>
      </div>
    </div>
  );
};

export default OngoingFooter;
