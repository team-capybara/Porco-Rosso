import React from 'react';
import classnames from 'classnames/bind';
import styles from './routeMap.module.scss';

const cn = classnames.bind(styles);

const RouteMap = () => {
  return (
    <div className={cn('route_map')}>
      <div className={cn('title_area')}>
        <strong className={cn('title')}>장소</strong>
        <div className={cn('description')}>강남구 근처</div>
      </div>
      <div className={cn('map_area')}>지도 작업 부탁드립니다.</div>
    </div>
  );
};

export default RouteMap;
