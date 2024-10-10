import classnames from 'classnames/bind';
import styles from './participantList.module.scss';
import IconPlus24X24 from '../../../../assets/svg/icon/IconPlus24X24';
import IconCrown14X11 from '../../../../assets/svg/icon/IconCrown14X11';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import { IParticipants } from '../../types';
import IconX12X12 from '../../../../assets/svg/icon/IconX12X12';

const cn = classnames.bind(styles);

interface Props {
  hasAddButton: boolean; // 추가하기 버튼 유무
  mode: 'read' | 'update'; //친구목록 모드 (확인, 수정)
  moimStart: boolean; //모임 시작 여부
  owner?: IParticipants; //모임장 정보
  participantData?: Array<IParticipants>; //친구목록 데이터
  onClickAddButton?: (type: string) => void;
  onClickDeleteButton?: (type: number) => void;
}

const ParticipantList = (props: Props) => {
  //모임 수정에서 삭제버튼 클릭 시 수행할 함수
  const { onClickAddButton, participantData, onClickDeleteButton } = props;
  console.log(participantData, 'participantData');
  return (
    <div className={cn('participant_list')}>
      {/* todo: 페이지에 따라 title 분기 부탁드립니다. */}
      <strong className={cn('title')}>
        {props.moimStart ? '참여한' : '모일'} 친구{' '}
        {props.participantData ? props.participantData?.length + 1 : 0}명
      </strong>
      {/* <HorizontalScrollWrapper>  //  */}
      <HorizontalScrollWrapper>
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
                {/* "추가하기" 텍스트 노출 X */}
                {/* <span className={cn('text')}>추가하기</span> */}
              </button>
            </li>
          )}
          {props.owner && (
            <li key={props.owner.userId} className={cn('item')}>
              {/* todo: 버튼 클릭시, 유저 프로필 모달 노출됩니다.(작업 전) */}
              <button type="button" className={cn('button')}>
                <div className={cn('thumbnail_area')}>
                  <div className={cn('thumbnail')}>
                    <img
                      src={
                        props.owner.profileImageUrl ??
                        'src/assets/png/test_image.png'
                      }
                      alt=""
                      className={cn('image')}
                    />
                  </div>
                  <div className={cn('crown_icon')}>
                    <IconCrown14X11 className={cn('icon')} />
                    <span className={cn('blind')}>방장</span>
                  </div>
                </div>
                <div className={cn('text')}>{props.owner.nickname}</div>
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
                  </div>
                  {props.mode == 'update' && (
                    <button
                      type="button"
                      className={cn('delete_button')}
                      onClick={() => onClickDeleteButton?.(data.userId)}
                    >
                      <IconX12X12 className={cn('icon')} />
                    </button>
                  )}
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
              <button type="button" className={cn('delete_button')}>
                <IconX12X12 className={cn('icon')} />
              </button>
              <div className={cn('text')}>맥주사랑이린</div>
            </button>
          </li> */}
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ParticipantList;
