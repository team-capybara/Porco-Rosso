import classnames from 'classnames/bind';
import style from './deleteUser.module.scss';

const cn = classnames.bind(style);

const DeleteUser = () => {
  return (
    <div className={cn('delete_user')}>
      <strong className={cn('title')}>계정 삭제</strong>
      <div className={cn('user_profile')}>
        <div className={cn('thumbnail')}>
          <img
            src="src/assets/png/test_image.png"
            alt=""
            className={cn('image')}
          />
        </div>
        <strong className={cn('nickname')}>
          dksakdaskdsakdksakdsakdsakdkasdksakdkds
        </strong>
        <div className={cn('email')}>social@apple.com</div>
        <p className={cn('description')}>
          계정 삭제시 사용자는 탈퇴 처리되며,
          <br />
          모든 데이터는 복구할 수 없어요.
        </p>
      </div>
      <ul className={cn('caution_list')}>
        <li className={cn('item')}>
          친구, 모임, 통계 등 모든 데이터는 삭제돼요.
        </li>
        <li className={cn('item')}>친구의 과거 통계에서는 삭제되지 않아요.</li>
        <li className={cn('item')}>
          동일한 소셜 계정으로 가입해도 이전 데이터는 복구되지 않아요.
        </li>
      </ul>
      <div className={cn('wrap_condition')}>
        <div className={cn('button_area')}>
          {/* todo: 버튼 선택된 경우, selected 클래스 활성화 및 span.blind 노출 부탁드립니다. */}
          <button type="button" className={cn('button', { selected: true })}>
            <span className={cn('blind')}>선택됨</span>
          </button>
          <div className={cn('text')}>
            안내사항을 모두 확인했으며, 이에 동의해요.
          </div>
        </div>
      </div>
      <div className={cn('wrap_delete_button')}>
        <div className={cn('inner')}>
          <button type="button" className={cn('delete_button')}>
            계정 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
