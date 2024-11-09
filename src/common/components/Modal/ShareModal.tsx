import { ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './shareModal.module.scss';
import html2canvas from 'html2canvas';

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
        () => {
          setModalShow(false);
        }
      );
    } else {
      // 로컬 테스트용
      const link = document.createElement('a');

      if (typeof link.download === 'string') {
        link.href = data;
        console.log('');
        link.download = 'image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
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
      <div className={cn('inner')} ref={screenshotRef}>
        {children}
        <div className={cn('moime')}>
          <span className={cn('blind')}>MOIME</span>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
