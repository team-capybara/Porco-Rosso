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
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
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
  isLoading,
  isFetching,
  isError,
}: FriendSearchListProps) => {
  const participantIds = new Set(
    participantData.map((participant) => participant.userId)
  );
  // 친구 검색 결과 리스트
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastFriendRef = useRef<HTMLLIElement | null>(null); // 마지막 친구 할당용

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
    <>
      {isLoading || isFetching ? (
        <div>로딩 중...</div>
      ) : isError ? (
        <div>에러 발생</div>
      ) : (
        <ul className={cn('friend_search_list')}>
          {friends.map((friend, index) => (
            <li
              key={`${friend.friendId}-${index}`}
              className={cn('item')}
              ref={index === friends.length - 1 ? lastFriendRef : null}
            >
              <FriendCard
                friend={friend}
                isSelected={selectedFriends.includes(friend.id)}
                onClick={() => onFriendSelect(friend.id)}
                moimStart={moimStart}
                moimStatus={moimStatus}
                disabled={participantIds.has(friend.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FriendSearchList;
