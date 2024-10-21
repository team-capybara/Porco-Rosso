import classnames from 'classnames/bind';
import styles from './shareGathering.module.scss';
import { ShareProps } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ScrollPhotoList from './components/PhotoList/ScrollPhotoList';
import IconUsers16X16 from '../../assets/svg/icon/IconUsers16X16';
import IconTimer16X16 from '../../assets/svg/icon/IconTimer16X16';

const cn = classnames.bind(styles);

const ShareGathering = (props: ShareProps) => {
  console.log(props);
  return (
    <div className={cn('share_gathering')}>
      <BackNavigation classNameForIconType="close_type" />
      <GatheringTitle
        title="호남 향우회 술 라쓰고"
        description="2024년 5월 24일"
        hasDownloadButton={true}
        classNameForPage="share_page"
      />
      <div className={cn('wrap_scroll_photo_list')}>
        {/* todo: 데이터 임의로 넣었는데, 수정부탁드립니다. */}
        <ScrollPhotoList
          hiddenTitle={true}
          isLargePhotoCard={true}
          moimeId=""
          isJustImg={false}
          isRefresh={false}
        />
      </div>
      <div className={cn('grid_area')}>
        <div className={cn('grid_item')}>
          <strong className={cn('title')}>
            <IconUsers16X16 className={cn('icon')} />
            참여인원
          </strong>
          <ul className={cn('profile_list')}>
            <li className={cn('item')}>
              <img
                src="src/assets/png/test_image.png"
                alt=""
                className={cn('image')}
              />
            </li>
            <li className={cn('item')}>
              <img
                src="src/assets/png/test_image.png"
                alt=""
                className={cn('image')}
              />
            </li>
            <li className={cn('item')}>
              <img
                src="src/assets/png/test_image.png"
                alt=""
                className={cn('image')}
              />
            </li>
            <li className={cn('item')}>
              <span className={cn('text')}>+2</span>
            </li>
          </ul>
        </div>
        <div className={cn('grid_item')}>
          <strong className={cn('title')}>
            <IconTimer16X16 className={cn('icon')} />총 모인 시간
          </strong>
          <strong className={cn('total_time')}>
            <span className={cn('number')}>1</span>시간{' '}
            <span className={cn('number')}>29</span>분
          </strong>
        </div>
        {/* todo: 지도 작업 부탁드립니다. */}
        <div className={cn('grid_item')}></div>
        <div className={cn('grid_item')}>
          <strong className={cn('days')}>수요일</strong>
          <strong className={cn('date')}>5월 24일</strong>
        </div>
      </div>
    </div>
  );
};

export default ShareGathering;
