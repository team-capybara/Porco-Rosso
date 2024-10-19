import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './upcomingGathering.module.scss';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import { UpcomingGatheringProps } from './types/index';
import IconExport24X24 from '../../assets/svg/icon/IconExport24X24';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getmoimId } from '../../common/utils/queryString';
import { getGatheringInfo } from '../../api/service/gatheringApi';
import { IGatheringInfo } from '../gathering/types/index';
import { getUserInfoId } from '../../common/utils/userInfo';
import { onPopBridge } from '../../bridge/gatheringBridge';

const cn = classnames.bind(styles);

const UpcomingGathering = (props: UpcomingGatheringProps) => {
  // const navigate = useNavigate();
  // const [moimId] = useState<number>(getmoimId(useLocation()));
  const [moimId] = useState<number>(84);
  const [userId, setUserId] = useState<number>();
  console.log(userId, 'userId');

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

  useEffect(() => {
    console.log('다시불러오기');
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
          <ParticipantList hasAddButton={false} mode="read" moimStart={false} />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs
            gatheringData={transformGatheringInfoData(gatheringInfoData)}
            onChange={() => {}}
            onPlaceSelect={() => {}}
            onTimeSelect={() => {}}
            timeData={''}
          />
        </div>
        <div className={cn('wrap_timer_button')}>
          <div className={cn('inner')}>
            <button type="button" className={cn('timer_button')}>
              시작까지 00:00:00
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
          title="호남 향우회 레쓰고"
          description="모임 시작까지 설레는 마음으로 기다려요"
          classNameForPage="upcoming_page"
          hasEditButton={true}
          mode="revise"
          onClickUpcomingButton={handleUpcomingTitleBtn}
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList hasAddButton={true} mode="read" moimStart={false} />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs
            gatheringData={{
              title: '호남 향우회 레쓰고',
              participantIds: [],
              startedAt: '',
              location: {
                name: '스타벅스 신용산점',
                latitude: 0,
                longitude: 0,
              },
            }}
            onChange={() => {}}
            onPlaceSelect={() => {}}
            onTimeSelect={() => {}}
            timeData={''}
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

  console.log(props);

  return (
    <div className={cn('upcoming_gathering')}>
      {renderUpcomingMain()}
      {renderReviseUpcoming()}
    </div>
  );
};

export default UpcomingGathering;
