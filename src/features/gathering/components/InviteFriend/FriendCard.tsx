import classnames from 'classnames/bind';
import styles from './friendCard.module.scss';
import { Friend } from '../../types';

const cn = classnames.bind(styles);
interface FriendCardProps {
  friend: Friend; // 친구 정보
  isSelected: boolean; // 친구가 선택되었는지 여부
  disabled: boolean; // 이미 모임에 있는 친구인지 여부
  onClick: () => void; // 클릭 핸들러
  moimStart: boolean;
}

const FriendCard = ({
  friend,
  isSelected,
  onClick,
  moimStart,
  disabled,
}: FriendCardProps) => {
  return (
    <button
      type="button"
      className={cn('friend_card', { selected: isSelected })}
      onClick={onClick}
      disabled={moimStart && disabled}
    >
      <div className={cn('thumbnail')}>
        <img
          src={friend.targetProfile}
          alt={friend.targetNickname}
          className={cn('image')}
        />
      </div>
      <strong className={cn('nickname')}>{friend.targetNickname}</strong>
      <div className={cn('mark')} />
      {isSelected && <span className="blind">선택됨</span>}
    </button>
  );
};

export default FriendCard;
