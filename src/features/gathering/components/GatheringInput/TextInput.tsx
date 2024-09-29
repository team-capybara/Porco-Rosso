import classnames from 'classnames/bind';
import styles from './textInput.module.scss';

const cn = classnames.bind(styles);

const TextInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const maxLength = 15;

  return (
    <div className={cn('text_input')}>
      <label className={cn('label')}>
        <input
          type="text"
          placeholder="모임 이름을 알려주세요"
          className={cn('input')}
          value={value}
          onChange={(e) => onChange(e.target.value)} // 입력값 변경 시 호출
          maxLength={maxLength} // 최대 글자 수 제한
        />
      </label>
      <div className={cn('count')}>
        {value.length} / {maxLength} {/* 현재 글자 수 / 최대 글자 수 */}
      </div>
    </div>
  );
};

export default TextInput;
