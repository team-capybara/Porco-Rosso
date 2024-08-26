import classnames from 'classnames/bind';
import styles from './friendSearchInput.module.scss';
import IconSearchPlus24X24 from '../../../../assets/svg/icon/IconSearchPlus24X24';

const cn = classnames.bind(styles);

const FriendSearchInput = () => {
  // 친구 추가 모달 작업 전이라고 했던 거 같은데 해당 컴포넌트로 작업하고, 공통화 하면 될 것 같아요
  return (
    <div className={cn('freind_search_input')}>
      <input
        type="text"
        className={cn('input')}
        placeholder="닉네임으로 검색"
      />
      <button className={cn('search_button')}>
        <IconSearchPlus24X24 className={cn('icon')} />
        <span className="blind">검색</span>
      </button>
    </div>
  );
};

export default FriendSearchInput;
