import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SocialLogin from '../features/auth/SocialLogin';
import NewProfile from '../features/auth/NewProfile';
import UpcomingGathering from '../features/gathering/UpcomingGathering';
import OngoingGathering from '../features/gathering/OngoingGathering';
import EndedGathering from '../features/gathering/EndedGathering';
import PicturePick from '../features/gathering/PicturePick';
import Share from '../features/gathering/Share';
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
