import { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './nicknameInput.module.scss';
import { NicknameInputProps } from '../../types';

const cn = classnames.bind(styles);

const NicknameInput = ({
  value,
  onChange,
  errMsg,
  isFocus,
}: NicknameInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isFocus) {
      inputRef.current?.focus();
    }
  }, [isFocus]);
  return (
    <div className={cn('nickname_input')}>
      <label htmlFor="nickname" className={cn('label')}>
        사용할 닉네임을 입력해주세요
      </label>
      <div className={cn('input_area')}>
        <input
          type="text"
          id="nickname"
          className={cn('input')}
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
      </div>
      <p className={cn('description')}>1~15자, 영문/한글/숫자 입력 가능</p>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};

export default NicknameInput;
