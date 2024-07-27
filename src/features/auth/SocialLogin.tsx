import classnames from 'classnames/bind';
import style from './socialLogin.module.scss';
import IconGoogle24X24 from '../../assets/svg/icon/IconGoogle24X24';
import IconApple24X24 from '../../assets/svg/icon/IconApple24X24';

const cn = classnames.bind(style);

const SocialLogin = () => {
  return (
    <div className={cn('social_login')}>
      <h1 className={cn('title')}>
        소셜 기록은 간편하게,
        <br />
        인사이트는 풍부하게
        <span className={cn('text')}>모이미</span>
      </h1>
      <div className={cn('link_area')}>
        <a
          href="https://api.moime.app/oauth2/authorization/google"
          className={cn('link', 'google')}
        >
          <IconGoogle24X24 className={cn('icon')} />
          Continue with Google
        </a>
        <a
          href="https://api.moime.app/oauth2/authorization/apple"
          className={cn('link', 'apple')}
        >
          <IconApple24X24 className={cn('icon')} />
          Continue with Apple
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
