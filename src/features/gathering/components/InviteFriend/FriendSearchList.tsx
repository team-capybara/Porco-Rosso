import classnames from 'classnames/bind';
import styles from './friendSearchList.module.scss';
import { Friend, IParticipants } from '../../types';

const cn = classnames.bind(styles);

import FriendCard from './FriendCard';

interface FriendSearchListProps {
  friends: Friend[]; // 검색된 친구 목록
  selectedFriends: number[]; // 선택된 친구 ID 목록
  onFriendSelect: (friendId: number) => void; // 친구 선택 처리 함수
  moimStart: boolean;
  participantData: IParticipants[];
}

const FriendSearchList = ({
  friends,
  selectedFriends,
  onFriendSelect,
  moimStart,
  participantData,
}: FriendSearchListProps) => {
  const participantIds = new Set(
    participantData.map((participant) => participant.userId)
  );
  // 친구 검색 결과 리스트
  console.log('FriendSearchList');
  return (
    <ul className={cn('friend_search_list')}>
      {friends.map((friend) => (
        <li key={friend.friendId} className={cn('item')}>
          <FriendCard
            friend={friend}
            isSelected={selectedFriends.includes(friend.targetId)}
            onClick={() => onFriendSelect(friend.targetId)}
            moimStart={moimStart}
            disabled={participantIds.has(friend.targetId)}
          />
        </li>
      ))}
    </ul>
  );
};

export default FriendSearchList;
