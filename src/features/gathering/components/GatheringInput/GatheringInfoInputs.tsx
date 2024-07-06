import LocationSearchInput from './LocationSearchInput';
import TimeInput from './TimeInput';
import CalendarInput from './CalendarInput';

const GatheringInfoInputs = () => {
  return (
    <div>
      {/* 날짜 */}
      <input></input>
      {/* 시간 */}
      <input></input>
      {/* 장소 */}
      <input></input>
      {true && <CalendarInput></CalendarInput>}
      {true && <TimeInput></TimeInput>}
      {true && <LocationSearchInput></LocationSearchInput>}
    </div>
  );
};

export default GatheringInfoInputs;
