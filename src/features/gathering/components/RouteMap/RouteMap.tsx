/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './routeMap.module.scss';
import { getMapLngLat } from '../../../../api/service/gatheringApi';
import circle from '../../../../assets/svg/icon/IconCircle8X8.svg';

const cn = classnames.bind(styles);

// ts에서 kakao 사용하기 위함
declare global {
  interface Window {
    kakao: any;
  }
  const kakao: any;
}

interface RouteMapProps {
  moimId: number;
}
const RouteMap = (props: RouteMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null); //map이 들어가야 할 DOM
  const mapInstance = useRef<any>(); //map 객체 kakao.maps.Map

  const { isLoading, data } = getMapLngLat(props.moimId);

  // 첫 렌더링 시 지도 생성
  useEffect(() => {
    mapInstance.current = new kakao.maps.Map(mapContainer.current!, {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 중심점 (추후 bound처리 때문에 의미X)
      draggable: false, // 드래그 막기
      zoomEnabled: false, // 줌 막기
    });
  }, []);

  // 데이터 로딩 끝나면 bound 처리
  useEffect(() => {
    if (!mapInstance.current) return;
    if (!isLoading && data) {
      settingBounds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // 방문 좌표에 맞게 bound 처리
  const settingBounds = () => {
    const bounds = new kakao.maps.LatLngBounds();
    data?.data.data.forEach(
      (point: { latitude: number; logtitude: number }) => {
        bounds.extend(new kakao.maps.LatLng(point.latitude, point.logtitude));
        // MapMarker
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(point.latitude, point.logtitude),
          image: new kakao.maps.MarkerImage(
            circle, //image url
            new kakao.maps.Size(8, 8), // image size
            {} // image option (ex. offset)
          ),
        });
        marker.setMap(mapInstance.current!);
      }
    );
    mapInstance.current!.setBounds(bounds);
  };

  return (
    <div className={cn('route_map')}>
      <div className={cn('title_area')}>
        <strong className={cn('title')}>장소</strong>
        <div className={cn('description')}>강남구 근처</div>
      </div>
      <div className={cn('map_area')}>
        <div
          id="map"
          ref={mapContainer}
          style={{ position: 'sticky', width: '100%', height: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default RouteMap;
