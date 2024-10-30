import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './upcomingGathering.module.scss';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
// import IconExport24X24 from '../../assets/svg/icon/IconExport24X24';
import { useLocation } from 'react-router-dom';
import { getmoimId } from '../../common/utils/queryString';
import {
  getGatheringInfo,
  rejectMoim,
  removeMoim,
} from '../../api/service/gatheringApi';
import { IGatheringInfo, ModalContentsProps } from '../gathering/types/index';
import { getUserInfoId } from '../../common/utils/userInfo';
import { onPopBridge } from '../../bridge/gatheringBridge';
import { calculateRemainingTime } from '../../common/utils/timeUtils';
import CreateGathering from './CreateGathering';
import Modal from '../../common/components/Modal/Modal';
import ModalContents from '../../common/components/Modal/ModalContents';
import { getMoimStatus } from '../../api/service/gatheringApi';
import { useNavigate } from 'react-router-dom';

const cn = classnames.bind(styles);

const UpcomingGathering = () => {
  const navigate = useNavigate();
  const [moimId] = useState<number>(getmoimId(useLocation()));
  const [userId, setUserId] = useState<number>();
  const [remainingTime, setRemainingTime] = useState<string>('00:00:00');
  const [reviseView, setReviseView] = useState<boolean>(false);
  const [timerComplete, setTimerComplete] = useState<boolean>(false);
  const [moimReviseRes, setMoimReviseRes] = useState<string>('');
  const [warningShow, setWarningShow] = useState<boolean>(false);

  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();
  const [modal, setModal] = useState<ModalContentsProps | null>(null);

  const checkMoimUpcomingStatus = async () => {
    const status = await getMoimStatus(moimId);
    console.log(status, 'status 체크');
    if (status == 'CREATED') return;
    else if (status === 'FAILED') {
      let current = 5;
      const timerId = setInterval(function () {
        if (current == 0) {
          clearInterval(timerId);
          onPopBridge();
        }
        setModal({
          title:
            '혼자서 모임을 시작할 수 없어 모임 생성에 실패했어요. 다시 시작하고 싶다면 새로운 모임을 만들어주세요.',
          description: '5초 이내 자동으로 메인화면으로 이동합니다.',
          firstButton: current.toString(),
          onClickFirstButton: () => {},
        });
        current--;
      }, 1000);
    } else {
      let current = 5;
      const timerId = setInterval(function () {
        if (current == 0) {
          clearInterval(timerId);
          navigate(`/ongoing-gathering?moimId=${moimId}`);
        }
        setModal({
          title: '모임이 시작되었습니다.',
          description: ' 5초 이내 자동으로 입장됩니다',
          firstButton: current.toString(),
          onClickFirstButton: () => {},
        });
        current--;
      }, 1000);
    }
  };

  useEffect(() => {
    checkMoimUpcomingStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (remainingTime === '00:00:00' && timerComplete) {
      if (gatheringInfoData?.participants?.length === 0) {
        setModal({
          title:
            '혼자서 모임을 시작할 수 없어 모임 생성에 실패했어요. 다시 시작하고 싶다면 새로운 모임을 만들어주세요.',
          description: '5초 이내 자동으로 메인화면으로 이동합니다.',
          firstButton: '메인으로 가기',
          onClickFirstButton: () => {
            onPopBridge();
          },
        });
        // 5초 후 자동 입장 처리
        setTimeout(() => {
          onPopBridge();
        }, 5000);
      } else {
        setModal({
          title: '모임이 시작되었습니다.',
          description: '5초 이내 자동으로 입장됩니다.',
          firstButton: '입장하기',
          onClickFirstButton: () => {
            navigate(`/ongoing-gathering?moimId=${moimId}`); // 페이지 이동
          },
        });
        // 5초 후 자동 입장 처리
        setTimeout(() => {
          navigate(`/ongoing-gathering?moimId=${moimId}`);
        }, 5000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

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
    return timeData;
  };

  useEffect(() => {
    // 실패했으면 굳이 재 로딩 안해도됨
    if (moimReviseRes === 'fail') return;
    setGatheringInfoDataFunc();
    setUserIdFromCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moimReviseRes]);

  const isUserAndOwner = userId === gatheringInfoData?.owner.userId;
  const isParticipant = userId !== gatheringInfoData?.owner.userId;

  const handleUpcomingTitleBtn = (mode: string) => {
    // 읽기 모드에서 오너
    if (isUserAndOwner && mode === 'readonly') {
      console.log('읽기 모드에서 오너');
      setReviseView(true);
    }
    // 읽기 모드에서 방원
    if (isParticipant && mode === 'readonly') {
      console.log('읽기 모드에서 방원');
      setModal({
        title: '모임을 나가시겠어요?',
        description: '일정에서 모임이 사라집니다.',
        firstButton: '취소',
        secondButton: '나가기',
        onClickFirstButton: () => {
          setModal(null);
        },
        onClickSecondButton: () => {
          rejectMoim(moimId);
          setModal(null);
          onPopBridge();
        },
      });
    }

    // 수정 모드
    if (isUserAndOwner && mode === 'revise') {
      console.log('수정 모드일때 삭제 누름');
      setModal({
        title: '모임을 삭제해요.',
        description: '모임을 삭제하면 복구할 수 없어요.',
        firstButton: '취소',
        secondButton: '삭제',
        onClickFirstButton: () => {
          setModal(null);
        },
        onClickSecondButton: () => {
          removeMoim(moimId);
          setModal(null);
          onPopBridge();
        },
      });
    }
  };

  useEffect(() => {
    if (gatheringInfoData?.startedAt && !reviseView) {
      const timer = setInterval(() => {
        setRemainingTime(calculateRemainingTime(gatheringInfoData.startedAt));
      }, 1000);
      setTimerComplete(true);
      return () => clearInterval(timer);
    }
  }, [gatheringInfoData?.startedAt, reviseView]);

  useEffect(() => {
    const participants = gatheringInfoData?.participants;
    if (participants?.length === 0) {
      setWarningShow(true);
    } else {
      setWarningShow(false);
    }
  }, [gatheringInfoData?.participants]);

  const renderSingleAlertWarning = () => {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#ff4d4f',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        }}
      >
        친구를 초대해야 모임이 시작되요.
      </div>
    );
  };

  const renderUpcomingMain = () => {
    // 방장이랑, 방원 구분
    if (!gatheringInfoData) return null;
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
          hasEditButton={false}
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
            {/* 딥링크 스펙아웃 */}
            {/* <button type="button" className={cn('share_button')}>
              <IconExport24X24 className={cn('icon')} />
              <span className={cn('blind')}>공유하기</span>
            </button> */}
          </div>
        </div>
        {warningShow && renderSingleAlertWarning()}
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
              handleUpcomingTitleBtn={handleUpcomingTitleBtn}
              moimId={moimId}
              moimReviseRes={moimReviseRes}
              setMoimReviseRes={setMoimReviseRes}
              setReviseView={setReviseView}
              participants={gatheringInfoData.participants}
            />
          )}
        </div>
      ) : (
        <>데이터 불러오는데에 문제가 발생했습니다.</>
      )}
      {modal && (
        <Modal>
          <ModalContents
            title={modal.title}
            description={modal.description}
            firstButton={modal.firstButton}
            secondButton={modal.secondButton}
            onClickFirstButton={modal.onClickFirstButton}
            onClickSecondButton={modal.onClickSecondButton}
          />
        </Modal>
      )}
    </>
  );
};

export default UpcomingGathering;
