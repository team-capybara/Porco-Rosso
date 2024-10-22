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
import { IGatheringInfo } from '../gathering/types/index';
import { getUserInfoId } from '../../common/utils/userInfo';
import { onPopBridge } from '../../bridge/gatheringBridge';
import { calculateRemainingTime } from '../../common/utils/timeUtils';
import CreateGathering from './CreateGathering';

const cn = classnames.bind(styles);

const UpcomingGathering = () => {
  // const navigate = useNavigate();
  const [moimId] = useState<number>(getmoimId(useLocation()));
  // const [moimId] = useState<number>(108);
  const [userId, setUserId] = useState<number>();
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');
  console.log(userId, 'userId');
  const [reviseView, setReviseView] = useState<boolean>(false);

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
    const timeData = gatheringData.startedAt.slice(8, 12);
    console.log(timeData, '뭔가 이상한데');
    return timeData;
  };

  useEffect(() => {
    setGatheringInfoDataFunc();
    setUserIdFromCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      {gatheringInfoData ? (
        <div className={cn('upcoming_gathering')}>
          {!reviseView && renderUpcomingMain()}
          {reviseView && (
            <CreateGathering
              mode="revise"
              initialData={transformGatheringInfoData(gatheringInfoData)}
              initialTimeData={extractTimeData(gatheringInfoData)} //
            />
          )}
        </div>
      ) : (
        <>데이터 불러오는데에 문제가 발생했습니다.</>
      )}
    </>
  );
};

export default UpcomingGathering;
