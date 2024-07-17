import classnames from 'classnames/bind';
import styles from './scrollPhotoList.module.scss';
import ArrowLeft24X24 from '../../../../assets/svg/arrow/ArrowLeft24X24';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import PhotoCard from './PhotoCard/PhotoCard';

const cn = classnames.bind(styles);

interface Props {
  hiddenTitle?: boolean;
  isMiniPhotoCard?: boolean;
}

const ScrollPhotoList = ({
  hiddenTitle = false,
  isMiniPhotoCard = false,
}: Props) => {
  return (
    <div
      className={cn('scroll_photo_list', {
        is_mini_photo_card: isMiniPhotoCard,
      })}
    >
      {!hiddenTitle && (
        <div className={cn('title_area')}>
          <div className={cn('main_title')}>
            <strong className={cn('title')}>순간 모음</strong>
            <button type="button" className={cn('button')}>
              <ArrowLeft24X24 className={cn('arrow_icon')} />
              <span className={cn('blind')}>더보기</span>
            </button>
          </div>
          <div className={cn('description')}>10장의 사진</div>
        </div>
      )}
      <HorizontalScrollWrapper>
        <ul className={cn('photo_list')}>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
          <li className={cn('item')}>
            <PhotoCard />
          </li>
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ScrollPhotoList;
