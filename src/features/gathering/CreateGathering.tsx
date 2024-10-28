import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import BackNavigation from '../auth/components/signup/BackNavigation';
import TextInput from './components/GatheringInput/TextInput';
import styles from './createGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import {
  CreateGatheringData,
  ChangeHandler,
  CreateGatheringProps,
  ReviseGatheringParams,
} from './types/index';
import { textInputValidation } from '../../common/utils/authUtils';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserInfo } from '../../api/service/authApi';
import { IParticipants } from '../gathering/types/index';
import InviteFriends from './components/InviteFriend/InviteFriends';
import { createMoim, reviseMoim } from '../../api/service/gatheringApi';
import Modal from '../../common/components/Modal/Modal';
import ModalContents from '../../common/components/Modal/ModalContents';
import { onPopBridge } from '../../bridge/gatheringBridge.ts';
import { useMoimeToast } from '../../common/utils/useMoimeToast.tsx';

const cn = classnames.bind(styles);

const CreateGathering = ({
  mode,
  initialData,
  initialTimeData,
  handleUpcomingTitleBtn,
  moimId,
  moimReviseRes,
  setMoimReviseRes,
  setReviseView,
  participants,
}: CreateGatheringProps) => {
  // T는 CreateGatheringData로 설정되며, key와 value의 타입이 CreateGatheringData의 프로퍼티와 일치하게 됨
  // CreateGatheringData의 키값에 따라 각각의 타입을 모두 추론할 수 있게 맵핑해주는 제네릭

  const [gatheringData, setGatheringData] = useState<CreateGatheringData>(
    mode === 'revise' && initialData
      ? initialData
      : {
          title: '',
          participantIds: [],
          startedAt: '',
          location: { name: '', latitude: 0, longitude: 0 },
        }
  );

  const [timeData, setTimeData] = useState<string>(initialTimeData || '');
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]); // 선택된 친구 ID 관리
  const [textInputOpen, setTextInputOpen] = useState<boolean>(
    mode === 'revise' ? false : true
  );
  const [participantDataList, setParticipantDataList] = useState<
    IParticipants[]
  >(mode === 'revise' && participants ? participants : []);
  const [inviteFriendOpen, setInviteFriendOpen] = useState<boolean>(false);
  const [chkModalOpen, setChkModalOpen] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [moimCreateRes, setMoimCreateRes] = useState<string>('');
  const [ownerInfo, setOwnerInfo] = useState<IParticipants>();
  const [modalErrMsg, setModalErrMsg] = useState<string>('');

  const { moimeToast } = useMoimeToast();

  const checkTextInputValid = (input: string) => {
    const errorMsg = textInputValidation(input, 'withEmoji');
    // 밸리데이션 통과
    if (!errorMsg) {
      setTextInputOpen(false);
      setInitialLoad(false);
    } else {
      moimeToast({
        message: errorMsg, // 메시지 커스터마이징
        onClickEnabled: false, // onClick 활성화
        duration: 3000, // 지속 시간 설정
        id: 'moim-title-validation-toast', // 고유 ID 설정
      });
    }
  };

  const handleChkModalClose = () => {
    setChkModalOpen(false);
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
    setMoimReviseRes?.(''); // 초기화
    if (userData) {
      setOwnerInfo({
        userId: userData.id,
        nickname: userData.nickname,
        profileImageUrl: userData.profile,
        isOwner: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // 초기 한번만 실행해줘야, 기존 초대된 유저들도 삭제 가능
  useEffect(() => {
    if (mode === 'revise' && participants?.length) {
      setSelectedFriends((prevSelectedFriends) => [
        ...new Set([
          ...prevSelectedFriends,
          ...participants.map((participant) => participant.userId),
        ]),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocationSelect = (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => {
    handleChange('location', location); // 장소 데이터 변경
  };

  const handleTimeSelect = (time: string) => {
    setTimeData(`${time}`);
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

  const mutation = useMutation({
    mutationFn: createMoim,
    onSuccess: () => {
      // 성공 시 처리할 로직
      // setSignUpSuccess(true); // 모임 생성 성공 시 성공 상태 설정
      setMoimCreateRes('success');
      setChkModalOpen(true);
    },
    onError: (error) => {
      console.log(error, '모임 생성 에러 로그');
      // 실패 시 처리할 로직
      setMoimCreateRes('fail');
      setChkModalOpen(true);
      setModalErrMsg('일시적인 오류로 모임 생성에 실패하였습니다.');
    },
  });

  const mutationRevise = useMutation<void, Error, ReviseGatheringParams>({
    mutationFn: ({ gatheringData, moimId }) =>
      reviseMoim(gatheringData, moimId),
    onSuccess: () => {
      // 성공 시 처리할 로직
      setMoimReviseRes?.('success');
      setChkModalOpen(true);
    },
    onError: (error) => {
      console.log(error, '모임 수정 에러 로그');
      // 실패 시 처리할 로직
      setMoimReviseRes?.('fail');
      setChkModalOpen(true);
      setModalErrMsg('일시적인 오류로 모임 수정에 실패하였습니다.');
    },
  });

  const handleMoimCreateBtn = () => {
    // 최종 검증
    const errorMsg = textInputValidation(gatheringData.title, 'withEmoji');
    // 밸리데이션 통과
    if (errorMsg) {
      setMoimCreateRes('fail');
      setChkModalOpen(true);
      setModalErrMsg(errorMsg);
      return;
    }

    // 모임생성 전 한번더 검증
    if (participantDataList.length > 10) {
      setMoimCreateRes('fail');
      setChkModalOpen(true);
      setModalErrMsg('모임 생성이 가능한 최대 인원은 11명입니다');
      return;
    }

    // 현재 시간과 비교하여 과거 시간인지 확인
    const currentTime = new Date();
    const selectedDateTime = new Date(
      `${gatheringData.startedAt.slice(0, 4)}-${gatheringData.startedAt.slice(4, 6)}-${gatheringData.startedAt.slice(6, 8)}T${timeData.slice(0, 2)}:${timeData.slice(2, 4)}:00`
    );

    if (selectedDateTime <= currentTime) {
      setMoimCreateRes('fail');
      setChkModalOpen(true);
      setModalErrMsg('현재 시간보다 과거 시간으로 모임을 생성할 수 없습니다.');
      return;
    }

    const updatedGatheringData = {
      ...gatheringData,
      startedAt: `${gatheringData.startedAt.slice(0, 8)}${timeData}00`,
      participantIds: [
        ...participantDataList.map((participant) => participant.userId),
        // userData?.id, // 항상 userId 추가
      ],
    };

    // 모임수정
    if (moimId && mode === 'revise') {
      mutationRevise.mutate({
        gatheringData: updatedGatheringData,
        moimId: moimId, // moimId도 함께 전달
      });
      // 모임생성
    } else {
      mutation.mutate(updatedGatheringData);
    }
  };

  const textInputBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (initialLoad && mode !== 'revise') {
      onPopBridge();
    } else {
      setTextInputOpen(false);
    }
  };

  const renderCreateMoimChkModal = (chkStatus: string, modalErrMsg: string) => {
    if (chkStatus === 'success') {
      return (
        <Modal>
          <ModalContents
            title={
              mode === 'revise' ? '모임을 수정했어요.' : '모임을 생성했어요!'
            }
            description="모임 시작 전까지 친구들을 꼭 초대해주세요."
            firstButton={mode === 'revise' ? '확인' : '메인 화면으로 가기'}
            onClickFirstButton={() => {
              mode === 'revise' ? setReviseView?.(false) : onPopBridge();
            }}
          />
        </Modal>
      );
    } else if (chkStatus === 'fail') {
      return (
        <Modal>
          <ModalContents
            title={
              mode === 'revise'
                ? '모임 수정에 실패했어요.'
                : '모임 생성에 실패했어요.'
            }
            description={modalErrMsg}
            firstButton="확인"
            onClickFirstButton={handleChkModalClose}
          />
        </Modal>
      );
    }
  };

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
          onClickNextButton={() => checkTextInputValid(gatheringData.title)}
        />
        <div className={cn('wrap_text_input')}>
          <TextInput
            value={gatheringData.title} // 현재 제목을 입력 필드에 표시
            onChange={(value: string) => handleChange('title', value)} // 제목 변경 처리
          />
        </div>
      </>
    );
  };

  // 모임 생성 메인 화면
  const renderCreateMain = () => {
    const { title, location, startedAt } = gatheringData;
    return (
      <>
        <BackNavigation
          classNameForIconType="close_type"
          blindText="이전으로"
          isButton={true}
          onClick={() => {
            mode === 'revise' ? setReviseView?.(false) : onPopBridge();
          }}
        />
        {mode === 'revise' ? (
          <GatheringTitle
            title={title || '제목 없는 모임'}
            description="모임 시작까지 설레는 마음으로 기다려요"
            hasEditButton={true}
            onClickEditButton={handleTextInputOpen}
            onClickUpcomingButton={handleUpcomingTitleBtn}
            mode={mode}
            classNameForPage="upcoming_page"
          />
        ) : (
          <GatheringTitle
            title={title || '제목 없는 모임'}
            description="정보를 채우고 모임을 시작해보세요."
            hasEditButton={true}
            onClickEditButton={handleTextInputOpen}
          />
        )}
        <div className={cn('wrap_participant_list')}>
          <ParticipantList
            hasAddButton={true}
            mode="read"
            moimStart={mode === 'revise' ? true : false}
            participantData={participantDataList}
            onClickAddButton={handleInviteFriendLayer}
            owner={ownerInfo}
          />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs
            gatheringData={gatheringData}
            onChange={handleChange}
            onPlaceSelect={handleLocationSelect}
            onTimeSelect={handleTimeSelect}
            timeData={timeData}
            mode="update"
          />
        </div>
        <div className={cn('wrap_create_button')}>
          {/* Markup todo: 모임 생성하기 버튼 상단에 버튼 색상으로 선 생기는 이슈 검토하기 */}
          <div className={cn('inner')}>
            {/* todo: 날짜, 시간, 장소 입력된 경우, disabled={false} 토글 부탁드려요 */}
            <button
              type="button"
              className={cn('create_button')}
              disabled={!(title && location.name && startedAt)}
              onClick={handleMoimCreateBtn}
            >
              {mode === 'revise' ? <>저장</> : <>모임 생성하기</>}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={cn('create_gathering')}>
      {textInputOpen && renderTextInput()}
      {!textInputOpen && !inviteFriendOpen && renderCreateMain()}
      {!textInputOpen && inviteFriendOpen && (
        // 친구 초대 공통으로 사용해야해서 컴포넌트화 진행
        <InviteFriends
          moimStatus="CREATED"
          moimStart={mode === 'revise' ? true : false}
          participantData={participantDataList}
          setParticipantDataList={setParticipantDataList}
          selectedFriends={selectedFriends}
          setSelectedFriends={setSelectedFriends}
          setLayerOpen={setInviteFriendOpen}
          ownerId={userData.id}
        />
      )}
      {chkModalOpen &&
        renderCreateMoimChkModal(
          mode === 'revise' && moimReviseRes ? moimReviseRes : moimCreateRes,
          modalErrMsg
        )}
    </div>
  );
};

export default CreateGathering;
