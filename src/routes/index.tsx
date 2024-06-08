import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialLogin from '../features/auth/SocialLogin';
import NewProfile from '../features/auth/NewProfile';
import UpcomingGathering from '../features/gatering/UpcomingGathering';
import OngoingGathering from '../features/gatering/OngoingGathering';
import EndedGathering from '../features/gatering/EndedGathering';
import PicturePick from '../features/gatering/PicturePick';
import Share from '../features/gatering/Share';
import MypagePage from '../features/mypage/MypagePage';
import NotificationPage from '../features/notification/NotificationPage';
import StatisticsPage from '../features/statistics/StatisticsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SocialLogin />} />
      <Route path="/signup" element={<NewProfile />} />
      <Route path="/upcoming-gathering" element={<UpcomingGathering />} />
      <Route path="/ongoing-gathering" element={<OngoingGathering />} />
      <Route path="/ended-gathering" element={<EndedGathering />} />
      <Route path="/picture-pick" element={<PicturePick />} />
      <Route path="/share" element={<Share />} />
      <Route path="/mypage" element={<MypagePage />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
    </Routes>
  );
};

export default AppRoutes;
