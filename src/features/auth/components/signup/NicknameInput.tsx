import classnames from 'classnames/bind';
import styles from './nicknameInput.module.scss';

const cn = classnames.bind(styles);

const NicknameInput = () => {
  return (
    <div className={cn('nickname_input')}>
      <label htmlFor="nickname">
        <span className={cn('blind')}>닉네임</span>
      </label>
      <input type="text" id="nickname" className={cn('input')} />
      <p className={cn('description')}>2~20자, 영문 소문자/한글 입력 가능</p>
    </div>
  );
};

export default NicknameInput;
