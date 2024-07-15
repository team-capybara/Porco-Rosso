import classnames from 'classnames/bind';
import styles from './nicknameInput.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';

const cn = classnames.bind(styles);

const NicknameInput = () => {
  return (
    <div className={cn('nickname_input')}>
      <label htmlFor="nickname" className={cn('label')}>
        사용할 닉네임을 입력해주세요
      </label>
      <div className={cn('input_area')}>
        <input type="text" id="nickname" className={cn('input')} />
        <span className={cn('icon_area')}>
          <ArrowLeft24X24 className={cn('arrow_icon')} />
        </span>
      </div>
      <p className={cn('description')}>2~20자, 영문 소문자/한글 입력 가능</p>
    </div>
  );
};

export default NicknameInput;
