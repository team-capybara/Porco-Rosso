import LocationList from './LocationList';

const LocationSearchInput = () => {
  // 장소 수정 화살표 누를 시 나오는 모달
  console.log('LocationSearchInput');
  return (
    <div>
      {/* 장소 검색 input */}
      <input></input>
      {/* 장소 검색 결과 */}
      <LocationList></LocationList>
    </div>
  );
};

export default LocationSearchInput;
