import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './upcomingGathering.module.scss';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import IconExport24X24 from '../../assets/svg/icon/IconExport24X24';
import { useLocation } from 'react-router-dom';
import { getmoimId } from '../../common/utils/queryString';
import { getGatheringInfo } from '../../api/service/gatheringApi';
import {
  ChangeHandler,
  CreateGatheringData,
  IGatheringInfo,
} from '../gathering/types/index';
import { getUserInfoId } from '../../common/utils/userInfo';
import { onPopBridge } from '../../bridge/gatheringBridge';
import { calculateRemainingTime } from '../../common/utils/timeUtils';
import TextInput from './components/GatheringInput/TextInput';
import { textInputValidation } from '../../common/utils/authUtils';
import { useMoimeToast } from '../../common/utils/useMoimeToast';

const cn = classnames.bind(styles);

const UpcomingGathering = () => {
  const { moimeToast } = useMoimeToast();
  // const navigate = useNavigate();
  const [moimId] = useState<number>(getmoimId(useLocation()));
  const [textInputOpen, setTextInputOpen] = useState<boolean>(false);
  // const [moimId] = useState<number>(108);
  const [userId, setUserId] = useState<number>();
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');
  console.log(userId, 'userId');
  const [reviseView, setReviseView] = useState<boolean>(false);
  const [updateGatheringData, setUpdateGatheringData] =
    useState<CreateGatheringData>({
      title: '',
      participantIds: [],
      startedAt: '',
      location: { name: '', latitude: 0, longitude: 0 },
    });

  const [updateTimeData, setUpdateTimeData] = useState<string>('');

  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();
  // 모임 상세 정보 가져오기
  const setGatheringInfoDataFunc = async () => {
    const response: IGatheringInfo = await getGatheringInfo(moimId);
    setGatheringInfoData(response);
  };

  // 사용자 id 셋팅
  const setUserIdFromCookie = async () => {
    const id = await getUserInfoId();
    id && setUserId(Number(id));
  };

  const transformGatheringInfoData = (gatheringData: IGatheringInfo) => {
    return {
      title: gatheringData.title,
      participantIds: gatheringData.participants.map(
        (participant) => participant.userId
      ),
      startedAt: gatheringData.startedAt,
      location: {
        name: gatheringData.location.name,
        latitude: gatheringData.location.latitude,
        longitude: gatheringData.location.longitude,
      },
    };
  };

  const extractTimeData = (gatheringData: IGatheringInfo) => {
    const timeData = gatheringData.startedAt.slice(9, 13);
    return timeData;
  };

  useEffect(() => {
    setGatheringInfoDataFunc();
    setUserIdFromCookie();
    gatheringInfoData &&
      setUpdateGatheringData(transformGatheringInfoData(gatheringInfoData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatheringInfoData]);

  const isUserAndOwner = userId === gatheringInfoData?.owner.userId;
  const isParticipant = userId !== gatheringInfoData?.owner.userId;

  const handleUpcomingTitleBtn = (mode: string) => {
    // 읽기 모드에서 오너
    if (isUserAndOwner && mode === 'readonly') {
      alert('읽기 모드에서 오너');
      setReviseView(true);
    }
    // 읽기 모드에서 방원
    if (isParticipant && mode === 'readonly') {
      alert('읽기 모드에서 방원');
    }

    // 수정 모드
    if (isUserAndOwner && mode === 'revise') {
      alert('수정 모드일때 삭제 누름');
    }
  };

  useEffect(() => {
    if (gatheringInfoData?.startedAt) {
      const timer = setInterval(() => {
        setRemainingTime(calculateRemainingTime(gatheringInfoData.startedAt));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gatheringInfoData?.startedAt]);

  const textInputBackNavClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setTextInputOpen(false);
  };

  const checkTextInputValid = (input: string) => {
    const errorMsg = textInputValidation(input, 'withEmoji');
    // 밸리데이션 통과
    if (!errorMsg) {
      setTextInputOpen(false);
    } else {
      moimeToast({
        message: errorMsg, // 메시지 커스터마이징
        onClickEnabled: false, // onClick 활성화
        duration: 3000, // 지속 시간 설정
        id: 'moim-title-validation-toast', // 고유 ID 설정
      });
    }
  };

  const handleChange: ChangeHandler<CreateGatheringData> = (key, value) => {
    setUpdateGatheringData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleLocationSelect = (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => {
    handleChange('location', location); // 장소 데이터 변경
  };

  const handleTimeSelect = (time: string) => {
    setUpdateTimeData(`${time}00`);
  };

  const renderUpcomingMain = () => {
    // 방장이랑, 방원 구분
    if (!gatheringInfoData) return null;
    console.log(isParticipant, '머지');

    return (
      <>
        <BackNavigation
          classNameForIconType="close_type"
          blindText="이전으로"
          isButton={true}
          onClick={() => {
            onPopBridge();
          }}
        />
        {/* todo: title 변경 및 편집 수정버튼 동작 개발 작업 필요 */}
        <GatheringTitle
          title={gatheringInfoData?.title}
          description="모임 시작까지 설레는 마음으로 기다려요"
          classNameForPage="upcoming_page"
          isUserAndOwner={isUserAndOwner}
          isParticipant={isParticipant}
          onClickUpcomingButton={handleUpcomingTitleBtn}
          mode="readonly"
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList
            hasAddButton={false}
            mode="read"
            moimStart={true}
            owner={gatheringInfoData.owner}
            participantData={gatheringInfoData.participants}
          />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs
            gatheringData={transformGatheringInfoData(gatheringInfoData)}
            onChange={() => {}}
            onPlaceSelect={() => {}}
            onTimeSelect={() => {}}
            timeData={extractTimeData(gatheringInfoData)}
            mode="read"
          />
        </div>
        <div className={cn('wrap_timer_button')}>
          <div className={cn('inner')}>
            <button type="button" className={cn('timer_button')}>
              시작까지 {remainingTime}
            </button>
            <button type="button" className={cn('share_button')}>
              <IconExport24X24 className={cn('icon')} />
              <span className={cn('blind')}>공유하기</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderReviseUpcoming = () => {
    if (!gatheringInfoData) return null;
    const { title, location, startedAt } = updateGatheringData;
    console.log(location, startedAt);
    return (
      <>
        <BackNavigation
          classNameForIconType="close_type"
          blindText="이전으로"
          isButton={true}
          onClick={() => {
            onPopBridge();
          }}
        />
        {/* todo: title 변경 및 편집 수정버튼 동작 개발 작업 필요 */}
        <GatheringTitle
          title={title}
          description="모임 시작까지 설레는 마음으로 기다려요"
          classNameForPage="upcoming_page"
          hasEditButton={true}
          mode="revise"
          onClickUpcomingButton={handleUpcomingTitleBtn}
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList
            hasAddButton={true}
            mode="read"
            moimStart={true}
            owner={gatheringInfoData.owner}
            participantData={gatheringInfoData.participants}
          />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs
            gatheringData={transformGatheringInfoData(gatheringInfoData)}
            onChange={handleChange}
            onPlaceSelect={handleLocationSelect}
            onTimeSelect={handleTimeSelect}
            timeData={updateTimeData}
            mode="update"
          />
        </div>
        <div className={cn('wrap_save_button')}>
          <div className={cn('inner')}>
            {/* todo: 버튼 활성화된 경우 disabled={false} 적용부탁드립니다. */}
            <button type="button" className={cn('save_button')} disabled={true}>
              저장
            </button>
          </div>
        </div>
      </>
    );
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
          onClickNextButton={() =>
            checkTextInputValid(updateGatheringData.title)
          }
        />
        <div className={cn('wrap_text_input')}>
          <TextInput
            value={updateGatheringData.title} // 현재 제목을 입력 필드에 표시
            onChange={(value: string) => handleChange('title', value)} // 제목 변경 처리
          />
        </div>
      </>
    );
  };

  return (
    <div className={cn('upcoming_gathering')}>
      {!reviseView && renderUpcomingMain()}
      {reviseView && !textInputOpen && renderReviseUpcoming()}
      {reviseView && textInputOpen && renderTextInput()}
    </div>
  );
};

export default UpcomingGathering;
