import classnames from 'classnames/bind';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import PhotoList from './components/PhotoList/PhotoList';
import styles from './endedGathering.module.scss';
import ScrollPhotoList from './components/PhotoList/ScrollPhotoList';
import PhotoCard from './components/PhotoList/PhotoCard/PhotoCard';

const cn = classnames.bind(styles);

const EndedGathering = () => {
  const renderEndedGathering = () => {
    return (
      <>
        <BackNavigation
          classNameForIconType="arrow_type"
          blindText="메인으로"
        />
        <div className={cn('wrap_gathering_title')}>
          <GatheringTitle
            title="모임이 종료되었어요"
            description={
              <>
                좋아요를 많이 받은 10개의 사진만
                <br />
                모임이 끝나도 볼 수 있어요!
              </>
            }
            hasRefreshButton={true}
          />
        </div>
        <div className={cn('wrap_photo_list')}>
          <PhotoList />
        </div>
      </>
    );
  };

  const renderEndedDetail = () => {
    return (
      <>
        {/* todo: 디자인 확인 후, 아이콘 타입 변경 필요할 수 있음 */}
        <BackNavigation
          classNameForIconType="close_type"
          blindText="이전으로"
        />
        <div className={cn('wrap_gathering_title')}>
          <GatheringTitle
            title="모이미 제목인데요오오오ㅗ오 ㅇ ㄹㄴㅇㄴㄹ ㄴㅇ ㄹㅇㄴ ㄹㅇㄴ"
            description="2024년 5월 3일"
          />
        </div>
        <div className={cn('wrap_photo_card')}>
          <PhotoCard />
        </div>
        <div className={cn('wrap_scroll_photo_list')}>
          <ScrollPhotoList hiddenTitle={true} isMiniPhotoCard={true} />
        </div>
      </>
    );
  };

  return (
    <div className={cn('ended_gathering')}>
      {false && renderEndedGathering()}
      {true && renderEndedDetail()}
      <div className={cn('button_area')}>
        <div className={cn('button_inner')}>
          {/* todo: 버튼 활성화 시, disabled={false} 토글 부탁드립니다. */}
          {/* 승현 todo: 버튼 활성화 시, 디자인 확인 후 작업 필요 */}
          <button type="button" className={cn('button')} disabled={true}>
            00 : 09 : 20
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndedGathering;
