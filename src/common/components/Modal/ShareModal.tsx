import { ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './shareModal.module.scss';
import html2canvas from 'html2canvas';
import moimeImg from '../../../assets/png/text_moime_raw.png';
import { fetchConvertImgToBase64 } from '../../../api/service/photoApi';

const cn = classnames.bind(styles);

interface Props {
  children: ReactNode;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal = ({ children, setModalShow }: Props) => {
  const screenshotRef = useRef<HTMLDivElement | null>(null);

  const convertEllipsesToImgs = (element: HTMLDivElement) => {
    const svgElement = element.querySelector('#map')?.querySelector('svg');
    const ellipses = svgElement!.querySelectorAll('ellipse');

    ellipses.forEach((ellipse: SVGEllipseElement, idx) => {
      // SVG의 속성을 읽어 HTML 스타일로 변환
      const cx = parseFloat(ellipse.getAttribute('cx') ?? '0');
      const cy = parseFloat(ellipse.getAttribute('cy') ?? '0');
      const rx = parseFloat(ellipse.getAttribute('rx') ?? '0');
      const ry = parseFloat(ellipse.getAttribute('ry') ?? '0');

      const topDivRect = element.getBoundingClientRect();
      const svgRect = svgElement!.getBoundingClientRect();

      // 새로운 img 생성
      const img = document.createElement('img');
      img.src = '/src/assets/png/map_ellipse_img.png';
      img.className = `ellipse-img-${idx}`;
      img.alt = 'map ellipse Image';

      // img의 스타일 설정
      img.style.position = 'absolute'; // 절대 위치
      img.style.left = `${svgRect.left - topDivRect.left + cx - 1}px`; // 최상위 div 기준 좌표
      img.style.top = `${svgRect.top - topDivRect.top + cy + 6}px`;
      img.style.width = `${rx * 2}px`; // ellipse 너비
      img.style.height = `${ry * 2}px`; // ellipse 높이
      img.style.zIndex = '10';

      // SVG 부모 요소에 추가
      element!.appendChild(img);

      // 원래 ellipse 제거
      ellipse.remove();
    });
  };

  const handleDownloadImage = async () => {
    const element: HTMLDivElement = screenshotRef.current!;

    // 지도 점 변환(svg to Image) 작업
    convertEllipsesToImgs(element);

    // 맵 이미지 base64 전환 작업
    const imgLst = Array.from(element!.querySelectorAll('img'));

    const kakaoMapImages = imgLst.filter((img) =>
      img.src.includes('daumcdn.net')
    );

    for (const img of kakaoMapImages) {
      try {
        const base64Data: string = await fetchConvertImgToBase64(img.src);
        img.src = `data:image/png;base64,${base64Data}`;
      } catch (error) {
        console.error('Error replacing Kakao Map image with base64:', error);
      }
    }

    const canvas = await html2canvas(element as unknown as HTMLElement, {
      scale: 4, // 화질 개선
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
    }, 1000);
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
