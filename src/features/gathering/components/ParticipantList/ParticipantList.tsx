import classnames from 'classnames/bind';
import styles from './participantList.module.scss';
import IconPlus24X24 from '../../../../assets/svg/icon/IconPlus24X24';
import IconCrown14X11 from '../../../../assets/svg/icon/IconCrown14X11';
import HorizontalScrollWrapper from '../../../../common/components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import IconX12X12 from '../../../../assets/svg/icon/IconX12X12';

const cn = classnames.bind(styles);

interface Props {
  title?: string;
}

const ParticipantList = ({ title = '' }: Props) => {
  return (
    <div className={cn('participant_list')}>
      {/* todo: 페이지에 따라 title 분기 부탁드립니다. */}
      <strong className={cn('title')}>{title} 4명</strong>
      <HorizontalScrollWrapper classNameForView="participant_list">
        <ul className={cn('people_list')}>
          <li className={cn('item')}>
            {/* todo: 버튼 클릭시, 친구추가 모달 노출됩니다.(작업 전) */}
            <button type="button" className={cn('button')}>
              <span className={cn('plus_icon')}>
                <IconPlus24X24 className={cn('icon')} />
              </span>
              {/* todo: "추가하기" 텍스트 노출되는지 아닌지 확인 필요 */}
              <span className={cn('text')}>추가하기</span>
            </button>
          </li>
          <li className={cn('item')}>
            {/* todo: 버튼 클릭시, 유저 프로필 모달 노출됩니다.(작업 전) */}
            <button type="button" className={cn('button')}>
              <div className={cn('thumbnail_area')}>
                <div className={cn('thumbnail')}>
                  <img
                    src="src/assets/png/test_image.png"
                    alt=""
                    className={cn('image')}
                  />
                </div>
                {/* todo: 방장인 경우, 'div.crown_icon' 노출 부탁드립니다. */}
                <div className={cn('crown_icon')}>
                  <IconCrown14X11 className={cn('icon')} />
                  <span className={cn('blind')}>방장</span>
                </div>
              </div>
              <div className={cn('text')}>나</div>
            </button>
            {/* todo: 친구 삭제 버튼입니다 */}
            <button type="button" className={cn('delete_button')}>
              <IconX12X12 className={cn('icon')} />
            </button>
          </li>
          <li className={cn('item')}>
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
          </li>
          <li className={cn('item')}>
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
          </li>
          <li className={cn('item')}>
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
          </li>
          <li className={cn('item')}>
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
          </li>
          <li className={cn('item')}>
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
          </li>
        </ul>
      </HorizontalScrollWrapper>
    </div>
  );
};

export default ParticipantList;
