import { SocialLoginProps } from './types/index';
import classnames from 'classnames/bind';
import style from './socialLogin.module.scss';

const cn = classnames.bind(style);

const SocialLogin = (props: SocialLoginProps) => {
  console.log(props);
  return (
    <div className={cn('social_login')}>
      <h1 className={cn('title')}>
        소셜 기록은 간편하게,
        <br />
        인사이트는 풍부하게
        <span className={cn('text')}>모이미</span>
      </h1>
      <div className={cn('link_area')}>
        <a href="/oauth2/authorization/" className={cn('link')}>
          Google로 계속하기
        </a>
        <a href="/" className={cn('link')}>
          Apple로 계속하기
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
