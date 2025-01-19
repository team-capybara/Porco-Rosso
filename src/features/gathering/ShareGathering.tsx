import classnames from 'classnames/bind';
import styles from './shareGathering.module.scss';
import { IGatheringInfo, memoryType, Photo } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import IconUsers16X16 from '../../assets/svg/icon/IconUsers16X16';
import IconTimer16X16 from '../../assets/svg/icon/IconTimer16X16';
import { useEffect, useState } from 'react';
import {
  getGatheringInfo,
  getSelectedPhotos,
} from '../../api/service/gatheringApi';
import RouteMap from './components/RouteMap/RouteMap';
import {
  calculateElapsedTime,
  getDateFromDatetime,
  getDayString,
} from '../../common/utils/dateUtils';
import ParticipantSmallList from './components/ParticipantSmallLIst/ParticipantSmallList';
import ScrollPhotoTop10List from './components/PhotoList/ScrollPhotoTop10List';
import ShareModal from '../../common/components/Modal/ShareModal';
import PhotoCard from './components/PhotoList/PhotoCard/PhotoCard';

const cn = classnames.bind(styles);

interface ShareProps {
  moimId: number;
  setRenderComponent: React.Dispatch<React.SetStateAction<memoryType>>;
}

const ShareGathering = (props: ShareProps) => {
  const { moimId, setRenderComponent } = props;
  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();
  const [elapsedHours, setElapsedHours] = useState<string>('');
  const [elapsedMinutes, setElapsedMinutes] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 모임 상세 정보 가져오기
  const setGatheringInfoDataFunc = async () => {
    const response: IGatheringInfo = await getGatheringInfo(moimId);
    setGatheringInfoData(response);
  };

  const setSelectedPhotoDataFunc = async () => {
    const response: Photo[] = await getSelectedPhotos(moimId);
    setSelectedPhoto(response);
  };

  const renderGridArea = () => {
    return (
      <div className={cn('grid_area')}>
        <div className={cn('grid_item')}>
          <strong className={cn('title')}>
            <IconUsers16X16 className={cn('icon')} />
            참여인원
          </strong>
          {gatheringInfoData !== undefined && (
            <ParticipantSmallList
              participantData={gatheringInfoData.participants}
              owner={gatheringInfoData.owner}
            ></ParticipantSmallList>
          )}
        </div>
        <div className={cn('grid_item')}>
          <strong className={cn('title')}>
            <IconTimer16X16 className={cn('icon')} />총 모인 시간
          </strong>
          <strong className={cn('total_time')}>
            <span className={cn('number')}>{elapsedHours}</span>시간{' '}
            <span className={cn('number')}>{elapsedMinutes}</span>분
          </strong>
        </div>
        {/* todo: 지도 작업 부탁드립니다. */}
        <div className={cn('grid_item')}>
          <RouteMap
            locationSummary={gatheringInfoData?.location}
            moimId={moimId}
            isRefresh={false}
            classNameForPage="share_gathering"
          />
        </div>
        <div className={cn('grid_item')}>
          <strong className={cn('days')}>
            {getDayString(gatheringInfoData?.startedAt)}
          </strong>
          <strong className={cn('date')}>
            {getDateFromDatetime(gatheringInfoData?.startedAt).slice(6)}
          </strong>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (gatheringInfoData === undefined) return;
    const { hours, minutes } = calculateElapsedTime(
      gatheringInfoData?.startedAt,
      gatheringInfoData?.finishedAt
    );
    setElapsedHours(hours);
    setElapsedMinutes(minutes);
  }, [gatheringInfoData]);

  useEffect(() => {
    setGatheringInfoDataFunc();
    setSelectedPhotoDataFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('share_gathering')}>
      <BackNavigation
        classNameForIconType="close_type"
        blindText="이전으로"
        isButton={true}
        onClick={(e) => {
          e.preventDefault();
          setRenderComponent('Memory');
        }}
      />
      <GatheringTitle
        title={gatheringInfoData?.title}
        description={getDateFromDatetime(gatheringInfoData?.startedAt)}
        hasDownloadButton={true}
        onClickDownloadButton={() => setModalShow(true)}
        classNameForPage="share_page"
      />
      {/* todo: 스크롤 이미지 없는 경우, div.wrap_scroll_photo_list 미노출 부탁드립니다. */}
      <div className={cn('wrap_scroll_photo_list')}>
        {/* todo: 데이터 임의로 넣었는데, 수정부탁드립니다. */}
        <ScrollPhotoTop10List
          data={selectedPhoto}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      {gatheringInfoData !== undefined && renderGridArea()}
      {/* todo: 공유하기 모달 */}
      {modalShow && (
        <ShareModal setModalShow={setModalShow}>
          <div className={cn('inner_modal')}>
            {gatheringInfoData?.title && (
              <strong className={cn('moime_title')}>
                {gatheringInfoData.title}
              </strong>
            )}
            {gatheringInfoData?.startedAt && (
              <p className={cn('moime_date')}>
                {getDateFromDatetime(gatheringInfoData?.startedAt)}
              </p>
            )}
            <div className={cn('wrap_photo_card')}>
              <PhotoCard
                profileUrl={selectedPhoto[currentIndex].uploaderProfile}
                photoUrl={selectedPhoto[currentIndex].url}
                photoId={selectedPhoto[currentIndex].photoId}
                likes={selectedPhoto[currentIndex].likes}
                liked={selectedPhoto[currentIndex].liked}
                likeButtonEnabled={false}
                onClickHandler={undefined}
                isJustImg={false}
              />
            </div>
            {renderGridArea()}
          </div>
        </ShareModal>
      )}
    </div>
  );
};

export default ShareGathering;
