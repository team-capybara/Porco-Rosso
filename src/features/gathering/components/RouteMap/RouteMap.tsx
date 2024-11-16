/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './routeMap.module.scss';
import { getMapLngLat } from '../../../../api/service/gatheringApi';
import { GatheringLocation, mapDataInfo } from '../../types';

const cn = classnames.bind(styles);

// ts에서 kakao 사용하기 위함
declare global {
  interface Window {
    kakao: any;
  }
  const kakao: any;
}

interface RouteMapProps {
  locationSummary?: GatheringLocation;
  moimId: number;
  isRefresh: boolean;
  classNameForPage?: '' | 'share_gathering';
}

const RouteMap = (props: RouteMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null); //map이 들어가야 할 DOM
  const mapInstance = useRef<any>(); //map 객체 kakao.maps.Map
  const [data, setData] = useState<mapDataInfo>({} as mapDataInfo);

  const getMapData = async () => {
    const response = await getMapLngLat(props.moimId);
    setData(response);
  };
  // 첫 렌더링 시 지도 생성
  useEffect(() => {
    getMapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.isRefresh) getMapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isRefresh]);

  // 지도
  useEffect(() => {
    console.log(data);
    // data가 없으면 리턴
    if (!data || !Object.keys(data).includes('locations')) return;
    // 이미 그려진 지도가 있으면 리턴
    // if (mapInstance.current) return; (새로고침을 위해 주석처리)
    mapInstance.current = new kakao.maps.Map(mapContainer.current!, {
      center: new kakao.maps.LatLng(
        props.locationSummary?.latitude,
        props.locationSummary?.longitude
      ), // 중심점 -> locationSummary 위경도로 초기화 (추후 변경 예정)
      draggable: false, // 드래그 막기
      zoomEnabled: false, // 줌 막기
      scrollWheel: false, // 마우스 휠, 모바일 터치 막기
      disableDoubleClick: false, // 더블클릭 막기
      disableDoubleClickZoom: false, //더블클릭 확대 막기
    });

    // 방문 좌표가 없으면 지도만 띄우고 리턴
    if (data.locations.length == 0) return;

    // bound 처리
    mapInstance.current.setBounds(
      new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(data.min.latitude, data.min.longitude),
        new kakao.maps.LatLng(data.max.latitude, data.max.longitude)
      )
    );

    // 원 반지름 계산을 위한 로직. 현재 bound에서 4px의 실제 m 거리 계산
    const mapProjection = mapInstance.current.getProjection();
    const pixel1 = new kakao.maps.Point(0, 4);
    const pixel2 = new kakao.maps.Point(0, 0);

    const point1 = mapProjection.coordsFromPoint(pixel1); // 위치 좌표에 해당하는 지도 좌표
    const point2 = mapProjection.coordsFromPoint(pixel2); // 위치 좌표에 해당하는 지도 좌표

    // 4px의 실제 m 계산
    const polyline = new kakao.maps.Polyline({
      map: mapInstance.current,
      path: [point2, point1],
    });

    // 점 그리기
    makeCircle(polyline.getLength());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 점 그리기
  const makeCircle = (distance: number) => {
    data?.locations.forEach(
      (point: { latitude: number; longitude: number }) => {
        // MapCircle
        const mapcircle = new kakao.maps.Circle({
          center: new kakao.maps.LatLng(point.latitude, point.longitude), // 원의 중심좌표 입니다
          radius: distance, // 미터 단위의 원의 반지름입니다
          strokeWeight: 0, // 선의 두께입니다
          fillColor: '#000', // 채우기 색깔입니다
          fillOpacity: 1, // 채우기 불투명도 입니다
        });
        mapcircle.setMap(mapInstance.current!);
      }
    );
  };

  return (
    <div className={cn('route_map', props.classNameForPage)}>
      <div className={cn('title_area')}>
        <strong className={cn('title')}>장소</strong>
        <div className={cn('description')}>{props.locationSummary?.name}</div>
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
