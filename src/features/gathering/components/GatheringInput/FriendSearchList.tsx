import classnames from 'classnames/bind';
import styles from './friendSearchList.module.scss';

const cn = classnames.bind(styles);

import FriendCard from './FriendCard';

const FriendSearchList = () => {
  // 친구 검색 결과 리스트
  console.log('FriendSearchList');
  return (
    <ul className={cn('friend_search_list')}>
      <li className={cn('item')}>
        <FriendCard />
      </li>
      <li className={cn('item')}>
        <FriendCard />
      </li>
      <li className={cn('item')}>
        <FriendCard />
      </li>
      <li className={cn('item')}>
        <FriendCard />
      </li>
      <li className={cn('item')}>
        <FriendCard />
      </li>
      <li className={cn('item')}>
        <FriendCard />
      </li>
    </ul>
  );
};

export default FriendSearchList;
