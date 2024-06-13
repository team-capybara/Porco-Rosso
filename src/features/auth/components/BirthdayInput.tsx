import React from 'react';
import classnames from 'classnames/bind';
import styles from './birthdayInput.module.scss';

const cn = classnames.bind(styles);

const BirthdayInput = () => {
  return (
    <div className={cn('birthday_input')}>
      <label htmlFor="birthday">
        <span className={cn('blind')}>생년월일</span>
      </label>
      <input type="date" id="birthday" className={cn('input')} />
    </div>
  );
};

export default BirthdayInput;
