import { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './friendSearchList.module.scss';
import { Friend, IParticipants, moimStatusType } from '../../types';

const cn = classnames.bind(styles);

import FriendCard from './FriendCard';

interface FriendSearchListProps {
  friends: Friend[]; // 검색된 친구 목록
  selectedFriends: number[]; // 선택된 친구 ID 목록
  onFriendSelect: (friendId: number) => void; // 친구 선택 처리 함수
  moimStart: boolean;
  participantData: IParticipants[];
  moimStatus: moimStatusType; // 모임 상태(CREATED, ONGOING)
  updateCursorId: () => void;
  isFetchingNextPage: boolean;
  isLast?: boolean;
  setIsFetchingNextPage: (value: boolean) => void;
}

const FriendSearchList = ({
  friends,
  selectedFriends,
  onFriendSelect,
  moimStart,
  participantData,
  moimStatus, // 모임 상태(CREATED, ONGOING)
  updateCursorId,
  isFetchingNextPage,
  setIsFetchingNextPage,
  isLast,
}: FriendSearchListProps) => {
  const participantIds = new Set(
    participantData.map((participant) => participant.userId)
  );
  // 친구 검색 결과 리스트
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastFriendRef = useRef<HTMLLIElement | null>(null); // 마지막 친구 할당용

  // 마지막 친구를 관찰하는 IntersectionObserver 설정
  useEffect(() => {
    console.log('머지');
    console.log(isFetchingNextPage, isLast, friends.length);
    if (isFetchingNextPage || isLast || !friends.length) return; // 이미 다음 페이지를 가져오는 중이면 중단
    console.log('dfsdf');

    observerRef.current = new IntersectionObserver((entries) => {
      const lastEntry = entries[0]; // 첫 번째 관찰 항목(마지막 친구)
      console.log(lastEntry, 'lastEntry');
      if (lastEntry.isIntersecting) {
        setIsFetchingNextPage(true); // 다음 페이지 로드 중 상태로 설정
        updateCursorId();
      }
    });

    const current = lastFriendRef.current;
    console.log(current, '머지');
    if (current) observerRef.current.observe(current); // 마지막 친구 관찰 시작

    return () => {
      if (current) observerRef.current?.unobserve(current); // 컴포넌트 언마운트 시 정리
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends, isFetchingNextPage]);

  return (
    <ul className={cn('friend_search_list')}>
      {friends.map((friend, index) => (
        <li
          key={friend.friendId}
          className={cn('item')}
          ref={index === friends.length - 1 ? lastFriendRef : null}
        >
          <FriendCard
            friend={friend}
            isSelected={selectedFriends.includes(friend.targetId)}
            onClick={() => onFriendSelect(friend.targetId)}
            moimStart={moimStart}
            moimStatus={moimStatus}
            disabled={participantIds.has(friend.targetId)}
          />
        </li>
      ))}
    </ul>
  );
};

export default FriendSearchList;
