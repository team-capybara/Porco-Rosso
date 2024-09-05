import { Routes, Route } from 'react-router-dom';
import SocialLogin from '../features/auth/SocialLogin';
import NewProfile from '../features/auth/NewProfile';
import UpcomingGathering from '../features/gathering/UpcomingGathering';
import OngoingGathering from '../features/gathering/OngoingGathering';
import EndedGathering from '../features/gathering/EndedGathering';
import Share from '../features/gathering/Share';
import MypagePage from '../features/mypage/MypagePage';
import NotificationPage from '../features/notification/NotificationPage';
import StatisticsPage from '../features/statistics/StatisticsPage';
import OauthRedirectHandler from '../features/auth/OauthRedirectHandler';
import CreateGathering from '../features/gathering/CreateGathering';
import ErrorPage from '../features/error/ErrorPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SocialLogin />} />
      <Route path="/signup" element={<NewProfile />} />
      <Route path="/redirect-handler" element={<OauthRedirectHandler />} />
      <Route path="/create-gathering" element={<CreateGathering />} />
      <Route path="/upcoming-gathering" element={<UpcomingGathering />} />
      <Route path="/ongoing-gathering" element={<OngoingGathering />} />
      <Route path="/ended-gathering" element={<EndedGathering />} />
      <Route path="/share" element={<Share />} />
      <Route path="/mypage" element={<MypagePage />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
