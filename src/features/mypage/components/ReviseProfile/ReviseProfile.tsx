import classnames from 'classnames/bind';
import style from './reviseProfile.module.scss';
import ProfileImage from '../../../auth/components/signup/ProfileImage';
import NicknameInput from '../../../auth/components/signup/NicknameInput';
import IconApple14X16 from '../../../../assets/svg/icon/IconApple14X16';

const cn = classnames.bind(style);

const ReviseProfile = () => {
  return (
    <div className={cn('revise_profile')}>
      <div className={cn('title_area')}>
        <strong className={cn('title')}>프로필 수정</strong>
        <button type="button" className={cn('clear_button')}>
          완료
        </button>
      </div>
      <div className={cn('wrap_profile_image')}>
        <ProfileImage
          value={'https://via.placeholder.com/150.jpg'}
          onChange={() => {}}
          setProfile={() => {}}
          setIsProfileModify={() => {}}
        />
      </div>
      <div className={cn('wrap_login')}>
        <a href="/" className={cn('apple_login')}>
          <IconApple14X16 className={cn('icon')} />
          애플 간편 로그인
        </a>
      </div>
      <div className={cn('wrap_nickname_input')}>
        <NicknameInput
          value={'닉네임이요'}
          onChange={() => {}}
          errMsg={''}
          isFocus={false}
        />
      </div>
    </div>
  );
};

export default ReviseProfile;
