import classnames from 'classnames/bind';
import styles from './endedGathering.module.scss';
import RenderEndedGathering from './components/PhotoList/RenderEndedGathering/RenderEndedGathering';
import RenderEndedDetail from './components/PhotoList/RenderEndedDetail/RenderEndedDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { IGatheringInfo, ModalContentsProps, ongoingType } from './types';
import { getmoimId } from '../../common/utils/queryString';
import {
  getGatheringInfo,
  getMoimStatus,
} from '../../api/service/gatheringApi';
import Modal from '../../common/components/Modal/Modal';
import ModalContents from '../../common/components/Modal/ModalContents';

const cn = classnames.bind(styles);

function parseDateString(dateString: string): Date {
  // 문자열을 'YYYY-MM-DDTHH:mm:ss' 형식으로 변환
  const formattedString = dateString.replace(
    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
    '$1-$2-$3T$4:$5:$6'
  );
  // Date 객체 생성
  return new Date(formattedString);
}
function getSecondsDifference(dateString: string): number {
  const parsedDate: Date = parseDateString(dateString); // 입력된 날짜를 Date 객체로 변환
  parsedDate.setMinutes(parsedDate.getMinutes() + 10); // 투표종료시간 : 모임종료시간 + 10분
  const currentDate: Date = new Date(); // 현재 시간을 가져옴
  // 밀리초 단위로 차이를 계산한 뒤 초 단위로 변환
  const differenceInSeconds = Math.floor(
    (parsedDate.getTime() - currentDate.getTime()) / 1000
  );
  return differenceInSeconds;
}

const EndedGathering = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [renderComponent, setRenderComponent] =
    useState<ongoingType>('PhotoList');
  const [gatheringInfoData, setGatheringInfoData] = useState<IGatheringInfo>();
  const [moimId] = useState<number>(getmoimId(useLocation()));
  const [modal, setModal] = useState<ModalContentsProps | null>(null);

  const remainTime = useRef<number>(600);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [finish, setFinish] = useState<boolean>(false);

  // 모임 상세 정보 가져오기
  const setGatheringInfoDataFunc = async () => {
    const response: IGatheringInfo = await getGatheringInfo(moimId);
    setGatheringInfoData(response);
  };

  // 진행 중 모임 때 상태 확인 후 모임종료로 redirect 하는 로직 추가
  const checkMoimOngoingStatus = async () => {
    const status = await getMoimStatus(moimId);
    if (status == 'FINISHED') return;
    else {
      let current = 5;
      const timerId = setInterval(function () {
        if (current == 0) {
          clearInterval(timerId);
          navigate(`/memory-gathering?moimId=${moimId}`);
        }
        setModal({
          title: '베스트 사진 선정이 끝났어요.',
          description: '5초 뒤에 자동으로 추억으로 이동해요.',
          firstButton: '확인',
          onClickFirstButton: () => {
            navigate(`/memory-gathering?moimId=${moimId}`);
          },
        });
        current--;
      }, 1000);
    }
  };

  useEffect(() => {
    // 쿼리스트링에 선택된 사진이 바뀔 때 photodetail로 변경
    if (renderComponent === 'PhotoDetail') return;

    const searchParams = new URLSearchParams(location.search);
    const selectedPhotoId = searchParams.get('selectedPhotoId');

    if (selectedPhotoId !== null && selectedPhotoId !== '-1') {
      setRenderComponent('PhotoDetail');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // location.search를 의존성으로 설정

  useEffect(() => {
    checkMoimOngoingStatus();
    setGatheringInfoDataFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gatheringInfoData === null || gatheringInfoData === undefined) return;
    if (gatheringInfoData.finishedAt === null) return;
    remainTime.current = getSecondsDifference(gatheringInfoData.finishedAt);
  }, [gatheringInfoData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMin(Math.floor(remainTime.current / 60));
      setSec(remainTime.current % 60);
      remainTime.current -= 1;
      if (remainTime.current <= 0) {
        setFinish(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    moimId >= 0 && (
      <>
        <div className={cn('ended_gathering')}>
          {renderComponent === 'PhotoList' && (
            <RenderEndedGathering moimId={String(moimId)} />
          )}
          {renderComponent === 'PhotoDetail' && (
            <RenderEndedDetail
              moimId={String(moimId)}
              setRenderComponent={setRenderComponent}
            />
          )}
          <div className={cn('button_area')}>
            <div className={cn('button_inner')}>
              {finish ? (
                <button
                  type="button"
                  className={cn('button')}
                  disabled={!finish}
                  onClick={() => {
                    navigate(`/memory-gathering?moimId=${moimId}`);
                  }}
                >
                  추억보러가기
                </button>
              ) : (
                <button
                  type="button"
                  className={cn('button')}
                  disabled={finish}
                >
                  00 : {String(min).padStart(2, '0')} : {sec}
                </button>
              )}
            </div>
          </div>
        </div>
        {modal && (
          <Modal>
            <ModalContents
              title={modal.title}
              description={modal.description}
              firstButton={modal.firstButton}
              secondButton={modal.secondButton}
              onClickFirstButton={modal.onClickFirstButton}
              onClickSecondButton={modal.onClickSecondButton}
            />
          </Modal>
        )}
      </>
    )
  );
};

export default EndedGathering;
