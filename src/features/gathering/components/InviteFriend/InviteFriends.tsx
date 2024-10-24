import { useState, useEffect } from 'react';
import BackNavigation from '../../../auth/components/signup/BackNavigation';
import classnames from 'classnames/bind';
import styles from '../../createGathering.module.scss';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import ParticipantList from '../ParticipantList/ParticipantList';
import FriendSearchInput from './FriendSearchInput';
import FriendSearchList from './FriendSearchList';
import { IParticipants, InviteFriendsProps } from '../../types';
import {
  addFriendsToMoim,
  getFriendCnt,
} from '../../../../api/service/gatheringApi';
import { useFriendSearch } from '../../utils/useFriendSearch';
import { useDebounce } from '../../utils/useDebounce';
import { useMoimeToast } from '../../../../common/utils/useMoimeToast';
import { useQuery } from '@tanstack/react-query';

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
  const [cursorId] = useState<number | null>(null); // 커서 관리
  // 선택된 친구 id를 기반으로 친구 목록에 정보를 렌더링 해줘야함
  const [selectedFriendsData, setSelectedFriendsData] = useState<
    IParticipants[]
  >([]);

  const debouncedKeyword = useDebounce(searchKeyword, 300);

  const { moimeToast } = useMoimeToast();

  // React Query로 친구 목록 데이터 가져오기
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    // error
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFriendSearch(debouncedKeyword, cursorId, 10);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const friendsData = data?.pages.flatMap((page) => page.data) || [];

  // 검색어 변경 처리
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const inviteFriendBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    // 진행중 모임일 땐 모달 끄면 선택된 친구 초기화
    if (moimStart && moimStatus === 'ONGOING') {
      console.log('이거 때문인듯?');
      setSelectedFriends([]);
    }
    setLayerOpen?.(false);
  };

  useEffect(() => {
    console.log(selectedFriends, '쒸익쉬익');
  }, [selectedFriends]);

  // 친구 선택 처리
  const handleFriendSelect = (friendId: number) => {
    setSelectedFriends((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(friendId);

      // friendsData에서 선택된 친구 찾기
      const selectedFriend = friendsData?.find(
        (friend) => friend.id === friendId
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
          (participant) => participant.userId === selectedFriend.id
        );
        if (!isAlreadyAdded) {
          return [
            ...prevList,
            {
              userId: selectedFriend.id,
              nickname: selectedFriend.nickname,
              profileImageUrl: selectedFriend.profile,
              isOwner: false, // 친구는 owner가 아니므로 false
            },
          ];
        }
        return prevList;
      };

      // 모임생성 || 진행 전이면서 유저가 오너, 바로바로 변경사항 반영
      console.log(moimStart, moimStatus, isUserAndOwner, '허허허허');
      if (!moimStart || (moimStart && moimStatus === 'CREATED')) {
        console.log('되나');
        setParticipantDataList?.((prevList) => updateList(prevList));
      }

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
    if (selectedFriends.length && isSuccess) {
      // 모임생성 || 진행전이면서 유저가 오너 ||
      // 진행중이면서 유저가 오너일 때는 제외, 기존 애들은 못 건드리기 때문에, 세팅해줄 필요 없음
      if (
        !moimStart ||
        (moimStart && moimStatus === 'CREATED' && isUserAndOwner)
        // || (moimStart && moimStatus === 'ONGOING' && isUserAndOwner)
      ) {
        const selectedData = friendsData
          ?.filter((friend) => selectedFriends.includes(friend.id))
          .map((friend) => ({
            userId: friend.id,
            nickname: friend.nickname,
            profileImageUrl: friend.profile,
            isOwner: false,
          }));

        selectedData && setSelectedFriendsData(selectedData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFriends, isSuccess]);

  useEffect(() => {
    console.log('selectedfriendsdata', selectedFriendsData);
    console.log('participantdata', participantData);
  }, [selectedFriendsData, participantData]);

  const inviteFriendValidation = () => {
    const totalFriendCnt = selectedFriends.length;
    if (totalFriendCnt > 10) {
      moimeToast({
        message: '친구는 최대 10명까지 초대 가능합니다', // 메시지 커스터마이징
        onClickEnabled: false, // onClick 활성화
        duration: 3000, // 지속 시간 설정
        id: 'invite-friend-validation-toast', // 고유 ID 설정
      });
      return false;
    }
    return true;
  };

  const handleFinishButton = () => {
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
      if (inviteFriendValidation()) {
        // const modifiedFriendList = [ownerId, ...selectedFriends];
        const modifiedFriendList = [...selectedFriends];
        addFriendsToMoim(moimId, modifiedFriendList)
          .then(() => {
            setFriendAddSuccess && setFriendAddSuccess(true);
            setLayerOpen?.(false);
          })
          .catch(() => {
            moimeToast({
              message: '일시적인 오류로 친구 추가를 실패했습니다.', // 메시지 커스터마이징
              onClickEnabled: false, // onClick 활성화
              duration: 3000, // 지속 시간 설정
              id: 'invite-friend-err-toast', // 고유 ID 설정
            });
          });
      }
    } else {
      setLayerOpen?.(false);
    }
  };

  const handleDeleteParticipant = (userId: number) => {
    // 모임생성에서만, 바로바로 변경사항 반영
    // 모임생성에서만 participantDataList에서도 삭제
    if (!moimStart || (moimStart && moimStatus === 'CREATED')) {
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

  const {
    // isLoading,
    // isFetching,
    data: friendCnt,
    // isError,
    // error,
    // refetch,
  } = useQuery<number>({
    queryKey: ['friendCnt'],
    queryFn: getFriendCnt,
  });

  return (
    <div>
      <BackNavigation
        classNameForIconType="close_type"
        hasNext={false}
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
          participantData={
            moimStart && moimStatus === 'CREATED'
              ? participantData
              : selectedFriendsData
          }
          onClickDeleteButton={handleDeleteParticipant}
        />
      </div>
      <div className={cn('wrap_friend_search_input')}>
        <strong className={cn('title')}>
          내친구
          <span className={cn('count')}>{friendCnt}명</span>
        </strong>
        <FriendSearchInput onChange={handleSearchChange} />
      </div>
      <div className={cn('friend_search_list')}>
        <FriendSearchList
          friends={friendsData || []}
          selectedFriends={selectedFriends}
          onFriendSelect={handleFriendSelect}
          moimStart={moimStart}
          participantData={participantData}
          moimStatus={moimStatus}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default InviteFriends;
