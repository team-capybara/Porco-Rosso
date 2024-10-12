import { useState, useEffect, useRef } from 'react';
import BackNavigation from '../../../auth/components/signup/BackNavigation';
import classnames from 'classnames/bind';
import styles from '../../createGathering.module.scss';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import ParticipantList from '../ParticipantList/ParticipantList';
import FriendSearchInput from './FriendSearchInput';
import FriendSearchList from './FriendSearchList';
import { useQuery } from '@tanstack/react-query';
import {
  IParticipants,
  GetFriendsListRes,
  InviteFriendsProps,
} from '../../types';
import {
  addFriendsToMoim,
  getFriendsList,
} from '../../../../api/service/gatheringApi';

const cn = classnames.bind(styles);

// 프롭 속성 : 친구 추가 팝업 노출 상태 조절, 추가된 친구 목록 조절, 모임 상태, 모임아이디, 선택된 친구 아이디리스트 및 선택된 친구 목록 조절
const InviteFriends = ({
  moimId,
  moimStart,
  moimStatus,
  participantData,
  selectedFriends,
  setLayerOpen,
  setSelectedFriends,
  setParticipantDataList, // 모임 생성 시 기존 참가자 목록이 가변 상태일 때
  isUserAndOwner, //방장 일때
  ownerId, // 방장 id
  setFriendAddSuccess,
}: InviteFriendsProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 검색어 상태 관리
  const [cursorId, setCursorId] = useState<number | null>(null); // 커서 관리
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  // 선택된 친구 id를 기반으로 친구 목록에 정보를 렌더링 해줘야함
  const [selectedFriendsData, setSelectedFriendsData] = useState<
    IParticipants[]
  >([]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 감지할 대상 (페이지 하단)

  const useFriendSearch = (
    keyword: string,
    cursorId: number | null,
    size: number
  ) => {
    const {
      data: friendsData, // 가져온 친구 목록 데이터
      isLoading, // 데이터 로딩 중 상태
      isFetching, // 추가 데이터 요청 중 상태
      isError, // 에러 상태
      error, // 발생한 에러 객체
    } = useQuery<GetFriendsListRes>({
      queryKey: ['friendsList', keyword, cursorId, size], // 쿼리 키 명시
      queryFn: () => getFriendsList(keyword, cursorId, size), // 쿼리 함수 명시
      // enabled: !!searchKeyword, // 검색어가 있을 때만 쿼리가 실행되도록 설정
      // keepPreviousData: true, // 무한 스크롤 시 이전 데이터를 유지
      // staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주됨
    });

    return { friendsData, isLoading, isFetching, isError, error };
  };

  // React Query로 친구 목록 데이터 가져오기
  const {
    friendsData,
    isLoading,
    isFetching,
    isError,
    // error
  } = useFriendSearch(searchKeyword, cursorId, 10);

  // 검색어 변경 처리
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    setCursorId(null); // 검색 시 커서를 초기화
  };

  const inviteFriendBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    // 진행중 모임일 땐 모달 끄면 선택된 친구 초기화
    if (moimStart) {
      setSelectedFriends([]);
    }
    setLayerOpen?.(false);
  };

  // 친구 선택 처리
  const handleFriendSelect = (friendId: number) => {
    setSelectedFriends((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(friendId);

      // friendsData에서 선택된 친구 찾기
      const selectedFriend = friendsData?.data.find(
        (friend) => friend.targetId === friendId
      );

      if (!selectedFriend) return prevSelected; // 친구가 없으면 이전 선택을 반환

      const updateList = (prevList: IParticipants[]) => {
        if (isAlreadySelected) {
          // 선택 해제된 경우 participantDataList 또는 selectedFriendsData에서 제거
          return prevList.filter(
            (participant) => participant.userId !== friendId
          );
        }
        // 이미 추가된 경우는 중복 방지, 추가되지 않은 경우만 추가
        const isAlreadyAdded = prevList.some(
          (participant) => participant.userId === selectedFriend.targetId
        );
        if (!isAlreadyAdded) {
          return [
            ...prevList,
            {
              userId: selectedFriend.targetId,
              nickname: selectedFriend.targetNickname,
              profileImageUrl: selectedFriend.targetProfile,
              isOwner: false, // 친구는 owner가 아니므로 false
            },
          ];
        }
        return prevList;
      };

      // 모임생성에서만, 바로바로 변경사항 반영
      if (!moimStart) {
        setParticipantDataList?.((prevList) => updateList(prevList));
      }

      // 진행 전이거나 중인 경우에는, invite friend 내 참가자 목록만 가변임
      // 이미 모임이 생성된 경우에는 participantData에 서버에서 불러온 데이터로 업데이트 되기 때문
      setSelectedFriendsData((prevList) => updateList(prevList));

      // selectedFriends 상태 업데이트
      return isAlreadySelected
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId];
    });
  };

  useEffect(() => {
    setFriendAddSuccess && setFriendAddSuccess(false);
    // 모임 생성 및 수정 단계(진행전 모임)에서는 선택된 친구 데이터를 바로 수정 및 확인해야 하므로, 초기 렌더 시 데이터 한번 세팅
    if (selectedFriends.length) {
      // 모임생성 || 진행전이면서 유저가 오너 ||
      // 진행중이면서 유저가 오너일 때는 제외, 기존 애들은 못 건드리기 때문에, 세팅해줄 필요 없음
      if (
        !moimStart ||
        (moimStart && moimStatus === 'CREATED' && isUserAndOwner)
        // || (moimStart && moimStatus === 'ONGOING' && isUserAndOwner)
      ) {
        const selectedData = friendsData?.data
          .filter((friend) => selectedFriends.includes(friend.targetId))
          .map((friend) => ({
            userId: friend.targetId,
            nickname: friend.targetNickname,
            profileImageUrl: friend.targetProfile,
            isOwner: false,
          }));

        selectedData && setSelectedFriendsData(selectedData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendsData]);

  // 스크롤 끝에 도달했을 때 다음 페이지 로드
  useEffect(() => {
    if (isFetchingNextPage || !friendsData || friendsData.last === true) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && friendsData.cursorId) {
        setIsFetchingNextPage(true);
        setCursorId(friendsData.cursorId.cursorId || null); // cursorId가 null일 수 있으므로 안전하게 처리
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(loadMoreRef.current);
      }
    };
  }, [friendsData, isFetchingNextPage]);

  const inviteFriendValidation = () => {
    const totalFriendCnt = selectedFriends.length + participantData.length;
    if (totalFriendCnt > 11) {
      alert('친구는 최대 11명까지만 초대 가능'); // 토스트로 변경
      return false;
    }
    return true;
  };

  const handleFinishButton = () => {
    if (inviteFriendValidation()) {
      // 진행중 모임에서 친구 추가 api 요청 보내기
      if (
        moimStart &&
        moimStatus === 'ONGOING' &&
        isUserAndOwner &&
        ownerId !== null &&
        moimId &&
        selectedFriendsData.length
      ) {
        // 진행중 모임에서는 완료 버튼 눌렀을 때 친구 목록 수정 api 보내야함
        const modifiedFriendList = [ownerId, ...selectedFriends];
        addFriendsToMoim(moimId, modifiedFriendList)
          .then(() => {
            setFriendAddSuccess && setFriendAddSuccess(true);
          })
          .catch((error) => {
            console.error('친구 목록 수정 실패:', error);
          });
      }
      setLayerOpen?.(false);
    }
  };

  const handleDeleteParticipant = (userId: number) => {
    // 모임생성에서만, 바로바로 변경사항 반영
    // 모임생성에서만 participantDataList에서도 삭제
    if (!moimStart) {
      setParticipantDataList?.((prevList) =>
        prevList.filter((participant) => participant.userId !== userId)
      );
    }

    setSelectedFriendsData((prevList) =>
      prevList.filter((participant) => participant.userId !== userId)
    );

    // 삭제된 참가자를 selectedFriends에서도 제거
    setSelectedFriends((prevSelected) =>
      prevSelected.filter((id) => id !== userId)
    );
  };

  return (
    <>
      <BackNavigation
        classNameForIconType="close_type"
        hasNext={true}
        isButton={true}
        onClick={inviteFriendBackNavClickHandler}
        blindText="이전으로"
      />
      <GatheringTitle
        title="함께 모일 친구"
        description="모임에 초대할 친구를 추가해보세요."
        classNameForPage="invite_friends"
        onClickFinishButton={handleFinishButton}
      />
      <div className={cn('wrap_participant_list')}>
        {/* 가변성이 있되, 기존 참가자리스트와 합쳐져야함 */}
        <ParticipantList
          hasAddButton={false}
          mode="update"
          moimStart={false}
          participantData={selectedFriendsData}
          onClickDeleteButton={handleDeleteParticipant}
        />
      </div>
      <div className={cn('wrap_friend_search_input')}>
        <strong className={cn('title')}>
          내친구
          <span className={cn('count')}>{friendsData?.data?.length}명</span>
        </strong>
        <FriendSearchInput onChange={handleSearchChange} />
      </div>
      <div className={cn('friend_search_list')}>
        {isLoading || isFetching ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러 발생</div>
        ) : (
          <FriendSearchList
            friends={friendsData?.data || []}
            selectedFriends={selectedFriends}
            onFriendSelect={handleFriendSelect}
            moimStart={moimStart}
            participantData={participantData}
            moimStatus={moimStatus}
          />
        )}
      </div>
    </>
  );
};

export default InviteFriends;
