/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './routeMap.module.scss';
import { getMapLngLat } from '../../../../api/service/gatheringApi';

const cn = classnames.bind(styles);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, isFetching, data, isError, error } = getMapLngLat(
    props.moimId
  );

  useEffect(() => {
    mapInstance.current = new kakao.maps.Map(mapContainer.current!, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
    });
    console.log(mapInstance.current);
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    if (!isLoading && data) {
      settingBounds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const settingBounds = () => {
    const bounds = new kakao.maps.LatLngBounds();
    console.log(data);
    data?.data.data.forEach(
      (point: { latitude: number; logtitude: number }) => {
        // MapMarker
        bounds.extend(new kakao.maps.LatLng(point.latitude, point.logtitude));
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(point.latitude, point.logtitude),
          // image: markerImage, // 마커이미지 설정 필요
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
          style={{ width: '100%', height: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default RouteMap;
