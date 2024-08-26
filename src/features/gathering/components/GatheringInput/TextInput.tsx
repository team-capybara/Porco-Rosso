import classnames from 'classnames/bind';
import styles from './textInput.module.scss';

const cn = classnames.bind(styles);

const TextInput = () => {
  // 모임명 편집버튼 누를 시 나오는 모달
  console.log('textInput');
  return (
    <div className={cn('text_input')}>
      <label className={cn('label')}>
        <input
          type="text"
          name=""
          placeholder="모임 이름을 알려주세요"
          className={cn('input')}
        />
      </label>
      <div className={cn('count')}>0 / 15</div>
    </div>
  );
};

export default TextInput;
