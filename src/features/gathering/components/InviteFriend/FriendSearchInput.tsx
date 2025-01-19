import classnames from 'classnames/bind';
import styles from './friendSearchInput.module.scss';
import IconSearchPlus24X24 from '../../../../assets/svg/icon/IconSearchPlus24X24';

const cn = classnames.bind(styles);
interface FriendSearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 검색어 변경 핸들러
}

const FriendSearchInput = ({ onChange }: FriendSearchInputProps) => {
  // 친구 추가 모달 작업 전이라고 했던 거 같은데 해당 컴포넌트로 작업하고, 공통화 하면 될 것 같아요
  return (
    <div className={cn('freind_search_input')}>
      <input
        type="text"
        className={cn('input')}
        placeholder="닉네임으로 검색"
        onChange={onChange} // 입력값 변경 시 부모 컴포넌트로 전달
      />
      <button className={cn('search_button')}>
        <IconSearchPlus24X24 className={cn('icon')} />
        <span className="blind">검색</span>
      </button>
    </div>
  );
};

export default FriendSearchInput;
