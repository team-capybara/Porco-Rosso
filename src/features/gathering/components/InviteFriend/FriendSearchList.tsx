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

  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  // 스크롤 위치 복원
  useEffect(() => {
    const savedScrollTop = localStorage.getItem(SCROLL_KEY);
    if (savedScrollTop) {
      window.scrollTo(0, parseInt(savedScrollTop, 10));
    }
  }, []);

  // 옵저버를 활용한 스크롤 위치 저장 및 페이지 로딩
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting) {
        // 스크롤 위치를 LocalStorage에 저장
        const scrollY = window.scrollY;
        localStorage.setItem(SCROLL_KEY, scrollY.toString());
        console.log('Saved Scroll Position:', scrollY); // 디버깅용
        // 다음 페이지 로딩
        fetchNextPage();
      }
    });

    const current = lastFriendRef.current;
    if (current) observerRef.current.observe(current);

    return () => {
      if (current) observerRef.current?.unobserve(current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const SCROLL_KEY = 'inviteFriendsScrollPosition'; // 스크롤 위치를 저장할 키

  return (
    <ul className={cn('friend_search_list')} ref={scrollContainerRef}>
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
