import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import { CreateGatheringProps } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import TextInput from './components/GatheringInput/TextInput';
import styles from './createGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import { CreateGatheringData, ChangeHandler } from './types/index';
import { textInputValidation } from '../../common/utils/authUtils';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../api/service/authApi';
import { IParticipants } from '../gathering/types/index';
import InviteFriends from './components/InviteFriend/InviteFriends';

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
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]); // 선택된 친구 ID 관리
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

  const textInputBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setTextInputOpen(false);
  };

  useEffect(() => {
    console.log('Current gatheringData:', gatheringData);
  }, [gatheringData]);

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

  console.log(props);
  return (
    <div className={cn('create_gathering')}>
      {textInputOpen && renderTextInput()}
      {!textInputOpen && !inviteFriendOpen && renderCreateMain()}
      {!textInputOpen && inviteFriendOpen && (
        // 친구 초대 공통으로 사용해야해서 컴포넌트화 진행
        <InviteFriends
          moimStart={false}
          setLayerOpen={setInviteFriendOpen}
          setParticipantDataList={setParticipantDataList}
          selectedFriends={selectedFriends}
          setSelectedFriends={setSelectedFriends}
        />
      )}
    </div>
  );
};

export default CreateGathering;
