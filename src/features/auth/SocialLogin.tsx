import classnames from 'classnames/bind';
import style from './socialLogin.module.scss';
import IconApple24X24 from '../../assets/svg/icon/IconApple24X24';
import IconMoime253X85 from '../../assets/svg/icon/IconMoime253X85';
import IconKakao20X19 from '../../assets/svg/icon/IconKakao20X19';

const cn = classnames.bind(style);

const SocialLogin = () => {
  return (
    <div className={cn('social_login')}>
      <h1 className={cn('title')}>
        샌드박스 소셜 기록은 간편하게,
        <br />
        인사이트는 풍부하게
        <span className={cn('logo')}>
          <IconMoime253X85 className={cn('icon')} />
          <span className={cn('blind')}>moime</span>
        </span>
      </h1>
      <div className={cn('link_area')}>
        <a
          href="https://api.moime.app/oauth2/authorization/kakao"
          className={cn('link', 'kakao')}
        >
          <IconKakao20X19 className={cn('icon')} />
          Continue with Kakao
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
