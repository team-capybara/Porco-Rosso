import classnames from 'classnames/bind';
import { CreateGatheringProps } from './types/index';
import BackNavigation from '../auth/components/signup/BackNavigation';
import TextInput from './components/GatheringInput/TextInput';
import styles from './createGathering.module.scss';
import GatheringTitle from './components/GatheringTitle/GatheringTitle';
import ParticipantList from './components/ParticipantList/ParticipantList';
import GatheringInfoInputs from './components/GatheringInput/GatheringInfoInputs';
import FriendSearchInput from './components/GatheringInput/FriendSearchInput';
import FriendSearchList from './components/GatheringInput/FriendSearchList';

const cn = classnames.bind(styles);

const CreateGathering = (props: CreateGatheringProps) => {
  // 모임 제목 입력
  const renderTextInput = () => {
    return (
      <>
        <BackNavigation classNameForIconType="close_type" hasNext={true} />
        <div className={cn('wrap_text_input')}>
          <TextInput />
        </div>
      </>
    );
  };

  // 모임 생성 메인 화면
  const renderCreateMain = () => {
    return (
      <>
        <BackNavigation classNameForIconType="close_type" />
        <GatheringTitle
          title="제목 없는 모임"
          description="정보를 채우고 모임을 시작해보세요."
          classNameForPage="create_page"
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList title="모일 친구" />
        </div>
        <div className={cn('wrap_gathiering_info_inputs')}>
          <GatheringInfoInputs />
        </div>
        <div className={cn('wrap_create_button')}>
          {/* Markup todo: 모임 생성하기 버튼 상단에 버튼 색상으로 선 생기는 이슈 검토하기 */}
          <div className={cn('inner')}>
            {/* todo: 날짜, 시간, 장소 입력된 경우, disabled={false} 토글 부탁드려요 */}
            <button
              type="button"
              className={cn('create_button')}
              disabled={false}
            >
              모임 생성하기
            </button>
          </div>
        </div>
      </>
    );
  };

  // 친구 초대 화면
  const renderInviteFriends = () => {
    return (
      <>
        <BackNavigation classNameForIconType="close_type" />
        <GatheringTitle
          title="함께 모일 친구"
          description="모임에 초대할 친구를 추가해보세요."
          classNameForPage="invite_friends"
        />
        <div className={cn('wrap_participant_list')}>
          <ParticipantList title="모일 친구" />
        </div>
        <div className={cn('wrap_friend_search_input')}>
          <strong className={cn('title')}>
            내친구
            <span className={cn('count')}>15명</span>
          </strong>
          <FriendSearchInput />
        </div>
        <FriendSearchList />
      </>
    );
  };

  console.log(props);
  return (
    <div className={cn('create_gathering')}>
      {renderTextInput()}
      {renderCreateMain()}
      {renderInviteFriends()}
    </div>
  );
};

export default CreateGathering;
