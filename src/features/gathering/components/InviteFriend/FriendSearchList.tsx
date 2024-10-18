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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchNextPage: () => Promise<any>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const FriendSearchList = ({
  friends,
  selectedFriends,
  onFriendSelect,
  moimStart,
  participantData,
  moimStatus, // 모임 상태(CREATED, ONGOING)
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: FriendSearchListProps) => {
  const participantIds = new Set(
    participantData.map((participant) => participant.userId)
  );
  // 친구 검색 결과 리스트
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastFriendRef = useRef<HTMLLIElement | null>(null); // 마지막 친구 할당용

  // 옵저버를 활용한 스크롤 위치 저장 및 페이지 로딩
  // useEffect(() => {
  //   observerRef.current = new IntersectionObserver((entries) => {
  //     const lastEntry = entries[0];
  //     if (lastEntry.isIntersecting) {
  //       // 다음 페이지 로딩
  //       fetchNextPage();
  //     }
  //   });

  //   const current = lastFriendRef.current;
  //   if (current) observerRef.current.observe(current);

  //   return () => {
  //     if (current) observerRef.current?.unobserve(current);
  //   };
  // }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (lastFriendRef.current) {
      observerRef.current.observe(lastFriendRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <ul className={cn('friend_search_list')}>
      {friends.map((friend, index) => (
        <li
          key={`${friend.friendId}-${index}`}
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
