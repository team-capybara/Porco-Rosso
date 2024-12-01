import classnames from 'classnames/bind';
import styles from './participantSmallList.module.scss';
import { IParticipants } from '../../types';

const cn = classnames.bind(styles);

interface Props {
  participantData: Array<IParticipants>; //친구목록 데이터
  owner?: IParticipants; //모임장 정보
}

const ParticipantSmallList = (props: Props) => {
  //모임 수정에서 삭제버튼 클릭 시 수행할 함수
  const { participantData, owner } = props;

  return (
    <>
      <ul className={cn('participant_small_list')}>
        {owner && (
          <li className={cn('item')} key={'participangtSmallData-owner'}>
            <img src={owner.profileImageUrl} alt="" className={cn('image')} />
          </li>
        )}
        {participantData?.slice(0, 3).map((participantData) => {
          return (
            <li
              className={cn('item')}
              key={`participantSmallData-${participantData.userId}`}
            >
              <img
                src={participantData.profileImageUrl}
                alt=""
                className={cn('image')}
              />
            </li>
          );
        })}
        {participantData?.length > 3 && (
          <li className={cn('item')}>
            <span className={cn('text')}>+{participantData.length - 3}</span>
          </li>
        )}
      </ul>
    </>
  );
};

export default ParticipantSmallList;
