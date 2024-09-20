import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import { CreateGatheringProps } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import TextInput from './components/GatheringInput/TextInput';
import styles from './createGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import FriendSearchInput from './components/GatheringInput/FriendSearchInput';
import FriendSearchList from './components/GatheringInput/FriendSearchList';
import {
  // getGatheringInfo,
  getFriendsList,
} from '../../api/service/gatheringApi';
import {
  CreateGatheringData,
  ChangeHandler,
  GetFriendsListRes,
} from './types/index';
import { textInputValidation } from '../../common/utils/authUtils';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../api/service/authApi';
import { IParticipants } from '../gathering/types/index';

// import { formatDateToYYYYMMDD } from '../../common/utils/dateUtils';

const cn = classnames.bind(styles);

const CreateGathering = (props: CreateGatheringProps) => {
  // T는 CreateGatheringData로 설정되며, key와 value의 타입이 CreateGatheringData의 프로퍼티와 일치하게 됨
  // CreateGatheringData의 키값에 따라 각각의 타입을 모두 추론할 수 있게 맵핑해주는 제네릭
  // const { data: gatheringInfoData } = getGatheringInfo(1);

  // const today = new Date();
  // const initialDate = formatDateToYYYYMMDD(today);
  const [gatheringData, setGatheringData] = useState<CreateGatheringData>({
    title: '',
    participantIds: [],
    startedAt: '',
    location: { name: '', latitude: 0, longitude: 0 },
  });

  const [timeData, setTimeData] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 검색어 상태 관리
  const [cursorId, setCursorId] = useState<number | null>(null); // 커서 관리
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]); // 선택된 친구 ID 관리
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 감지할 대상 (페이지 하단)

  const [textInputOpen, setTextInputOpen] = useState<boolean>(false);
  const [participantDataList, setParticipantDataList] = useState<
    IParticipants[]
  >([]);
  const [inviteFriendOpen, setInviteFriendOpen] = useState<boolean>(false);

  const checkTextInputValid = (input: string) => {
    const errorMsg = textInputValidation(input, 'withEmoji');
    // 밸리데이션 통과
    if (!errorMsg) {
      setTextInputOpen(false);
    } else {
      alert(errorMsg); // 추후 토스트 공통화 후 토스트로 바꿈
    }
  };

  const handleChange: ChangeHandler<CreateGatheringData> = (key, value) => {
    setGatheringData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5, // 신선한 시간 5분
  });

  // userData를 participantList에 추가하는 로직
  useEffect(() => {
    if (userData) {
      setParticipantDataList((prevList) => [
        ...prevList,
        {
          userId: userData.id,
          nickname: userData.nickname,
          profileImageUrl: userData.profile,
          isOwner: true,
        }, // userData에서 필요한 정보를 구조화
      ]);
    }
  }, [userData]);

  const handleLocationSelect = (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => {
    handleChange('location', location); // 장소 데이터 변경
  };

  const handleTimeSelect = (time: string) => {
    setTimeData(`${time}00`);
    // console.log(`${gatheringData.startedAt.slice(0, 8)}${time}00`, '세팅확인');
    // handleChange(
    //   'startedAt',
    //   `${gatheringData.startedAt.slice(0, 8)}${time}00`
    // ); // yyyyMMdd + hhmm00 초는 입력 안 받으므로 00
  };

  const handleTextInputOpen = () => {
    setTextInputOpen(true);
  };

  const handleInviteFriendLayer = (type: string) => {
    if (type === 'open') {
      setInviteFriendOpen(true);
    }
    if (type === 'close') {
      setInviteFriendOpen(false);
    }
    return '';
  };

  // const handleInviteFriendClose = () => {
  //   setInviteFriendOpen(false);
  // };

  const textInputBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setTextInputOpen(false);
  };

  const inviteFriendBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setInviteFriendOpen(false);
  };

  useEffect(() => {
    console.log('Current gatheringData:', gatheringData);
  }, [gatheringData]);

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
      enabled: inviteFriendOpen, // 검색어가 있을 때만 쿼리가 실행되도록 설정
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

  // 친구 선택 처리
  const handleFriendSelect = (friendId: number) => {
    setSelectedFriends((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(friendId);

      const updatedSelectedFriends = isAlreadySelected
        ? prevSelected.filter((id) => id !== friendId) // 이미 선택된 친구는 해제
        : [...prevSelected, friendId]; // 선택되지 않은 친구는 추가

      // friendsData에서 선택된 친구 찾기
      const selectedFriend = friendsData?.data.find(
        (friend) => friend.friendId === friendId
      );

      if (selectedFriend) {
        setParticipantDataList((prevList) => {
          if (isAlreadySelected) {
            // 선택 해제된 경우 participantDataList에서 해당 친구를 제거
            return prevList.filter(
              (participant) => participant.userId !== friendId
            );
          }

          // 이미 추가된 경우는 중복 방지, 추가되지 않은 경우만 추가
          const isAlreadyAdded = prevList.some(
            (participant) => participant.userId === selectedFriend.friendId
          );

          if (!isAlreadyAdded) {
            return [
              ...prevList,
              {
                userId: selectedFriend.friendId,
                nickname: selectedFriend.targetNickname,
                profileImageUrl: selectedFriend.targetProfile,
                isOwner: false, // 친구는 owner가 아니므로 false
              },
            ];
          }

          return prevList; // 이미 추가된 경우 그대로 반환
        });
      }

      return updatedSelectedFriends; // selectedFriends 상태 업데이트
    });
  };

  useEffect(() => {
    console.log(selectedFriends, 'selectedFriends');
    console.log(participantDataList, 'participantDataList');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFriends]);

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

  // 모임 제목 입력
  const renderTextInput = () => {
    return (
      <>
        <BackNavigation
          classNameForIconType="close_type"
          hasNext={true}
          isButton={true}
          onClick={textInputBackNavClickHandler}
          blindText="이전으로"
        />
        <div className={cn('wrap_text_input')}>
          <TextInput
            value={gatheringData.title} // 현재 제목을 입력 필드에 표시
            onChange={(value: string) => handleChange('title', value)} // 제목 변경 처리
          />
        </div>
        {/* 버튼 위치 마크업 필요 */}
        <div className={cn('wrap_confirm_button')}>
          <button
            type="button"
            className={cn('confirm_button')}
            style={{ color: 'white' }}
            onClick={() => checkTextInputValid(gatheringData.title)}
          >
            확인
          </button>
        </div>
      </>
    );
  };

  // 모임 생성 메인 화면
  const renderCreateMain = () => {
    return (
      <>
        <BackNavigation classNameForIconType="close_type" />
        <GatheringTitle
          title={gatheringData.title || '제목 없는 모임'}
          description="정보를 채우고 모임을 시작해보세요."
          classNameForPage="create_page"
          onClickEditButton={handleTextInputOpen}
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList
            hasAddButton={true}
            mode="read"
            moimStart={false}
            participantData={participantDataList}
            onClickAddButton={handleInviteFriendLayer}
          />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs
            gatheringData={gatheringData}
            onChange={handleChange}
            onPlaceSelect={handleLocationSelect}
            onTimeSelect={handleTimeSelect}
            timeData={timeData}
          />
        </div>
        <div className={cn('wrap_create_button')}>
          {/* Markup todo: 모임 생성하기 버튼 상단에 버튼 색상으로 선 생기는 이슈 검토하기 */}
          <div className={cn('inner')}>
            {/* todo: 날짜, 시간, 장소 입력된 경우, disabled={false} 토글 부탁드려요 */}
            <button
              type="button"
              className={cn('create_button')}
              disabled={false}
            >
              모임 생성하기
            </button>
          </div>
        </div>
      </>
    );
  };

  // 친구 초대 화면
  const renderInviteFriends = () => {
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
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList
            hasAddButton={false}
            mode="read"
            moimStart={false}
            participantData={participantDataList}
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
            />
          )}
        </div>
        {/* <FriendSearchList /> */}
      </>
    );
  };

  console.log(props);
  return (
    <div className={cn('create_gathering')}>
      {textInputOpen && renderTextInput()}
      {!textInputOpen && !inviteFriendOpen && renderCreateMain()}
      {!textInputOpen && inviteFriendOpen && renderInviteFriends()}
    </div>
  );
};

export default CreateGathering;
