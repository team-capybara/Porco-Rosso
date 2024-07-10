import { CreateGatheringProps } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import TextInput from './components/GatheringInput/TextInput';

const CreateGathering = (props: CreateGatheringProps) => {
  console.log(props);
  return (
    <div>
      <h1>Create Gathering Page</h1>
      {/* 모임생성 수정 페이지 */}
      <BackNavigation
        classNameForIconType="arrow_type"
        blindText="이전 페이지"
      />
      <GatheringTitle title="순간 모음" description="42장의 사진" />
      {/* 모임명 수정 페이지 노출/비노출 */}
      {true && <TextInput></TextInput>}
      <ParticipantList />
      <GatheringInfoInputs></GatheringInfoInputs>
      <button>버튼도 공통화 될듯</button>
    </div>
  );
};

export default CreateGathering;
