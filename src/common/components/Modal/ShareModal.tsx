import { ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './shareModal.module.scss';
import html2canvas from 'html2canvas';
import moimeImg from '../../../assets/png/text_moime.png';

const cn = classnames.bind(styles);

interface Props {
  children: ReactNode;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal = ({ children, setModalShow }: Props) => {
  const screenshotRef = useRef(null);

  const handleDownloadImage = async () => {
    const element = screenshotRef.current;
    const canvas = await html2canvas(element as unknown as HTMLElement, {
      scale: 2, // 화질 개선
      backgroundColor: 'none',
      logging: true,
      useCORS: true, //to enable cross origin perms
    });

    let data = canvas.toDataURL('image/jpeg');
    data = data.replace('data:image/jpeg;base64,', '');

    // 앱으로 url 전달
    if (window.kmpJsBridge !== undefined) {
      window.kmpJsBridge.callNative(
        'onDownloadEndingImage',
        JSON.stringify({ image: data }),
        function (data: string) {
          console.log(data);
          setModalShow(false);
        }
      );

      setTimeout(() => {
        setModalShow(false);
      }, 2000);
    } else {
      // 로컬 테스트용
      const link = document.createElement('a');
      const localData = canvas.toDataURL('image/jpeg');

      if (typeof link.download === 'string') {
        link.href = localData;
        console.log('');
        link.download = 'image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(localData);
      }
      setModalShow(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      handleDownloadImage();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('share_modal')}>
      <div className={cn('inner')}>
        <div className={cn('capture_area')} ref={screenshotRef}>
          {children}
          <div className={cn('moime')}>
            <img
              className={cn('moime_text_img')}
              src={moimeImg}
              alt="모이미 로고"
            ></img>
            <span className={cn('blind')}>MOIME</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
