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
  memoryType,
  ModalContentsProps,
  moimStatusType,
  ongoingType,
} from '../../types';
import { getGatheringInfo } from '../../../../api/service/gatheringApi';
import { getUserInfoId } from '../../../../common/utils/userInfo';
import { onPopBridge } from '../../../../bridge/gatheringBridge';
import InviteFriends from '../InviteFriend/InviteFriends';

const cn = classnames.bind(styles);

interface RenderOngoingMainProps {
  moimId: number;
  moimStatus: moimStatusType;
  setModal?: React.Dispatch<React.SetStateAction<ModalContentsProps | null>>;
  checkMoimOngoingStatus?: () => void;
  // 추후 두 개 합쳐도 될듯
  setRenderOngoingComponent?: React.Dispatch<React.SetStateAction<ongoingType>>;
  setRenderMemoryComponent?: React.Dispatch<React.SetStateAction<memoryType>>;
  inviteFriendOpen?: boolean;
  setInviteFriendOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const RenderOngoingMain = (props: RenderOngoingMainProps) => {
  const {
    moimId,
    moimStatus,
    setModal = () => {},
    checkMoimOngoingStatus = () => {},
    setRenderOngoingComponent,
    inviteFriendOpen,
    setInviteFriendOpen,
    // setRenderMemoryComponent,
  } = props;
  // const [leaveModal, setModal] = useState<boolean>(false);
  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();
  const [userId, setUserId] = useState<number>();
  // const [inviteFriendOpen, setInviteFriendOpen] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]); // 선택된 친구 ID 관리
  const [isFriendAddSuccess, setIsFriendAddSuccess] = useState<boolean>(false);

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
                  hasRefreshButton={moimStatus === 'ONGOING' ? true : false}
                  // hasShareButton={moimStatus === 'COMPLETED' ? true : false}
                  onClickRefreshButton={() => {
                    checkMoimOngoingStatus();
                    setGatheringInfoDataFunc();
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
                  moimeId={'1'}
                  hiddenTitle={false}
                  isMiniPhotoCard={true}
                  setRenderComponent={setRenderOngoingComponent}
                />
              </section>
              <section className={cn('section')}>
                <RouteMap
                  locationSummary={gatheringInfoData?.location}
                  moimId={moimId}
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
                            // TODO : 종료 api 호출
                            onPopBridge();
                            setModal(null);
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
        <>
          <section className={cn('section')}>
            <ScrollPhotoList
              moimeId={'1'}
              hiddenTitle={false}
              isMiniPhotoCard={true}
              setRenderComponent={setRenderOngoingComponent}
            />
          </section>
        </>
        // <>데이터 불러오는데에 문제가 발생했습니다. </>
      )}
    </>
  );
};

export default RenderOngoingMain;
