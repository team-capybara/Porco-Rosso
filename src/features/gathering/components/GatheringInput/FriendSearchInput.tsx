import LocationList from './LocationList';

const FriendSearchInput = () => {
  // 친구 추가 모달 작업 전이라고 했던 거 같은데 해당 컴포넌트로 작업하고, 공통화 하면 될 것 같아요
  console.log('LocationSearchInput');
  return (
    <div>
      {/* 친구 검색 input */}
      <input></input>
      {/* 장소 검색 결과 */}
      <LocationList></LocationList>
    </div>
  );
};

export default FriendSearchInput;
