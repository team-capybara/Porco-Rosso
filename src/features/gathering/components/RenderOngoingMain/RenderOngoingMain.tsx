import classnames from 'classnames/bind';
import styles from '../../ongoingGathering.module.scss';
import { getDateFromDatetime } from '../../../../common/utils/dateUtils';
import GatheringTitle from '../GatheringTitle/GatheringTitle';
import BackNavigation from '../../../auth/components/signup/BackNavigation';
import ParticipantList from '../ParticipantList/ParticipantList';
import ScrollPhotoList from '../PhotoList/ScrollPhotoList';
import RouteMap from '../RouteMap/RouteMap';
import { useEffect, useState } from 'react';
import {
  IGatheringInfo,
  ModalContentsProps,
  moimStatusType,
} from '../../types';
import {
  finishMoim,
  getGatheringInfo,
} from '../../../../api/service/gatheringApi';
import { getUserInfoId } from '../../../../common/utils/userInfo';
import { onPopBridge } from '../../../../bridge/gatheringBridge';
import InviteFriends from '../InviteFriend/InviteFriends';
import { useNavigate } from 'react-router-dom';

const cn = classnames.bind(styles);

interface RenderOngoingMainProps {
  moimId: number;
  moimStatus: moimStatusType;
  setModal?: React.Dispatch<React.SetStateAction<ModalContentsProps | null>>;
  checkMoimOngoingStatus?: () => void;
  arrowButtonClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  inviteFriendOpen?: boolean;
  setInviteFriendOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const RenderOngoingMain = (props: RenderOngoingMainProps) => {
  const {
    moimId,
    moimStatus,
    setModal = () => {},
    checkMoimOngoingStatus = () => {},
    inviteFriendOpen,
    setInviteFriendOpen,
    arrowButtonClickHandler,
  } = props;
  const navigate = useNavigate();
  // const [leaveModal, setModal] = useState<boolean>(false);
  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();
  const [userId, setUserId] = useState<number>();
  // const [inviteFriendOpen, setInviteFriendOpen] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]); // 선택된 친구 ID 관리
  const [isFriendAddSuccess, setIsFriendAddSuccess] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (gatheringInfoData?.participants) {
      setSelectedFriends(
        gatheringInfoData.participants.map((participant) => participant.userId)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteFriendOpen]);

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

  useEffect(() => {
    // checkMoimOngoingStatus();
    console.log('다시불러오기');
    setGatheringInfoDataFunc();
    setUserIdFromCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFriendAddSuccess]);

  const isUserAndOwner = userId === gatheringInfoData?.owner.userId;

  const handleInviteFriendLayer = (type: string) => {
    if (type === 'open') {
      console.log('오픈');
      setInviteFriendOpen?.(true);
    }
    if (type === 'close') {
      setInviteFriendOpen?.(false);
    }
    return '';
  };

  return (
    <>
      {gatheringInfoData ? (
        <>
          {!inviteFriendOpen && (
            <>
              <BackNavigation
                classNameForIconType="close_type"
                blindText="메인으로 이동"
                isButton={true}
                onClick={() => {
                  onPopBridge();
                }}
              />
              <div className={cn('wrap_gathering_title')}>
                <GatheringTitle
                  title={gatheringInfoData?.title}
                  description={getDateFromDatetime(
                    gatheringInfoData?.startedAt
                  )}
                  hasRefreshButton={
                    moimStatus === 'ONGOING' && isRefresh === false
                      ? true
                      : false
                  }
                  // hasShareButton={moimStatus === 'COMPLETED' ? true : false}
                  onClickRefreshButton={() => {
                    checkMoimOngoingStatus();
                    setGatheringInfoDataFunc();
                    setIsRefresh(true);
                    setTimeout(() => {
                      setIsRefresh(false); // 0.5 초 동안 버튼 안 보이게 처리
                    }, 500);
                  }}
                  // onClickShareButton={() => shareMemory()}
                />
              </div>
              <section className={cn('section')}>
                <ParticipantList
                  hasAddButton={isUserAndOwner ? true : false}
                  mode="read"
                  moimStart={true}
                  owner={gatheringInfoData?.owner}
                  participantData={gatheringInfoData?.participants}
                  onClickAddButton={handleInviteFriendLayer}
                />
              </section>
              <section className={cn('section')}>
                <ScrollPhotoList
                  moimeId={String(moimId)}
                  hiddenTitle={false}
                  isMiniPhotoCard={false}
                  isJustImg={false}
                  arrowButtonClickHandler={arrowButtonClickHandler}
                  isRefresh={isRefresh}
                />
              </section>
              <section className={cn('section')}>
                <RouteMap
                  locationSummary={gatheringInfoData?.location}
                  moimId={moimId}
                  isRefresh={isRefresh}
                />
              </section>
              {moimStatus === 'ONGOING' &&
                userId === gatheringInfoData?.owner.userId && (
                  <div className={cn('button_area')}>
                    <button
                      type="button"
                      className={cn('end_button')}
                      onClick={() => {
                        setModal({
                          title: '모임을 종료하시겠어요?',
                          description: '모임이 종료되고 베스트 컷을 선정해요.',
                          firstButton: '취소',
                          secondButton: '종료',
                          onClickFirstButton: () => {
                            setModal(null);
                          },
                          onClickSecondButton: () => {
                            finishMoim(moimId)
                              .then(() => {
                                setModal(null);
                                navigate(`/ended-gathering?moimId=${moimId}`); // ended-gathering 이동
                              })
                              .catch(() => {
                                console.error('모임 종료 실패');
                                // 토스트 팝업 요망
                              });
                          },
                        });
                      }}
                    >
                      모임 종료
                    </button>
                  </div>
                )}
            </>
          )}
          {inviteFriendOpen && (
            // 친구 초대 공통으로 사용해야해서 컴포넌트화 진행
            <InviteFriends
              moimStatus="ONGOING"
              moimStart={true}
              participantData={gatheringInfoData?.participants}
              selectedFriends={selectedFriends}
              setSelectedFriends={setSelectedFriends}
              setLayerOpen={setInviteFriendOpen}
              isUserAndOwner={isUserAndOwner}
              moimId={moimId}
              ownerId={userId ? userId : null}
              setFriendAddSuccess={setIsFriendAddSuccess}
            />
          )}
        </>
      ) : (
        <>데이터 불러오는데에 문제가 발생했습니다. </>
      )}
    </>
  );
};

export default RenderOngoingMain;
