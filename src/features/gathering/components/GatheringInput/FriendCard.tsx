import classnames from 'classnames/bind';
import styles from './friendCard.module.scss';

const cn = classnames.bind(styles);

const FriendCard = () => {
  // 친구 카드
  console.log('FriendCard');
  return (
    // todo: 버튼 선택된 경우, '.selected' 클래스 추가 및 선택됨 블라인드 텍스트 추가 부탁드립니다.
    <button type="button" className={cn('friend_card', { selected: true })}>
      <div className={cn('thumbnail')}>
        <img
          src="src/assets/png/test_image.png"
          alt=""
          className={cn('image')}
        />
      </div>
      <strong className={cn('nickname')}>닉네임입니다아아</strong>
      <div className={cn('mark')} />
      <span className="blind">선택됨</span>
    </button>
  );
};

export default FriendCard;
