import classnames from 'classnames/bind';
import styles from './participantList.module.scss';
import IconPlus24X24 from '../../../../assets/svg/icon/IconPlus24X24';
import IconCrown14X11 from '../../../../assets/svg/icon/IconCrown14X11';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import { IParticipants } from '../../types';
// import IconX12X12 from '../../../../assets/svg/icon/IconX12X12';

const cn = classnames.bind(styles);

interface Props {
  hasAddButton: boolean; // 추가하기 버튼 유무
  mode: 'read' | 'update'; //친구목록 모드 (확인, 수정)
  moimStart: boolean; //모임 시작 여부
  participantData?: Array<IParticipants>; //친구목록 데이터
  onClickAddButton?: (type: string) => void;
}

const ParticipantList = (props: Props) => {
  const { onClickAddButton, participantData } = props;
  console.log(participantData, 'participantData');
  return (
    <div className={cn('participant_list')}>
      {/* todo: 페이지에 따라 title 분기 부탁드립니다. */}
      <strong className={cn('title')}>
        {props.moimStart ? '참여한' : '모일'} 친구{' '}
        {props.participantData?.length ?? 0}명
      </strong>
      {/* <HorizontalScrollWrapper>  //  */}
      <HorizontalScrollWrapper classNameForView="participant_list">
        <ul className={cn('people_list')}>
          {props.hasAddButton && (
            <li className={cn('item')}>
              {/* todo: 버튼 클릭시, 친구추가 모달 노출됩니다.(작업 전) */}
              <button
                type="button"
                className={cn('button')}
                onClick={() => onClickAddButton?.('open')}
              >
                <span className={cn('plus_icon')}>
                  <IconPlus24X24 className={cn('icon')} />
                </span>
                {/* todo: "추가하기" 텍스트 노출되는지 아닌지 확인 필요 */}
                <span className={cn('text')}>추가하기</span>
              </button>
            </li>
          )}
          {props.participantData?.map((data: IParticipants) => {
            return (
              <li key={data.userId} className={cn('item')}>
                {/* todo: 버튼 클릭시, 유저 프로필 모달 노출됩니다.(작업 전) */}
                <button type="button" className={cn('button')}>
                  <div className={cn('thumbnail_area')}>
                    <div className={cn('thumbnail')}>
                      <img
                        src={
                          data.profileImageUrl ??
                          'src/assets/png/test_image.png'
                        }
                        alt=""
                        className={cn('image')}
                      />
                    </div>
                    {data.isOwner && ( //방장인 경우
                      <div className={cn('crown_icon')}>
                        <IconCrown14X11 className={cn('icon')} />
                        <span className={cn('blind')}>방장</span>
                      </div>
                    )}
                  </div>
                  <div className={cn('text')}>{data.nickname}</div>
                </button>
              </li>
            );
          })}
          {/* <li className={cn('item')}>
            <button type="button" className={cn('button')}>
              <div className={cn('thumbnail_area')}>
                <div className={cn('thumbnail')}>
                  <img
                    src="src/assets/png/test_image.png"
                    alt=""
                    className={cn('image')}
                  />
                </div>
                <div className={cn('crown_icon')}>
                  <IconCrown14X11 className={cn('icon')} />
                  <span className={cn('blind')}>방장</span>
                </div>
              </div>
              <div className={cn('text')}>나</div>
            </button>
            {/* todo: 친구 삭제 버튼입니다 */}
          {/* <button type="button" className={cn('delete_button')}>
              <IconX12X12 className={cn('icon')} />
            </button>
          </li> */}
          {/* <li className={cn('item')}>
            <button type="button" className={cn('button')}>
              <div className={cn('thumbnail_area')}>
                <div className={cn('thumbnail')}>
                  <img
                    src="src/assets/png/test_image.png"
                    alt=""
                    className={cn('image')}
                  />
                </div>
              </div>
              <div className={cn('text')}>맥주사랑이린</div>
            </button>
          </li> */}
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ParticipantList;
