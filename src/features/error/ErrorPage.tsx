import classnames from 'classnames/bind';
import styles from './errorPage.module.scss';
import IconInfoCircle40X40 from '../../assets/svg/icon/IconInfoCircle40X40';
import { ReactNode } from 'react';

const cn = classnames.bind(styles);

interface Props {
  title?: ReactNode;
  description?: ReactNode;
  buttonText?: string;
}

const ErrorPage = ({
  title = '',
  description = '',
  buttonText = '메인화면',
}: Props) => {
  return (
    <div className={cn('error_page')}>
      <div className={cn('title_area')}>
        <IconInfoCircle40X40 className={cn('info_icon')} />
        <strong className={cn('title')}>
          {title}네트워크 연결이 끊어졌어요
        </strong>
        <p className={cn('description')}>
          {description}
          데이터 네트워크나 와이파이 연결 후<br />
          다시 시도해주세요!
        </p>
      </div>
      <button type="button" className={cn('button')}>
        {buttonText}
      </button>
    </div>
  );
};

export default ErrorPage;
