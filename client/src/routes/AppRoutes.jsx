import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Profile from '../pages/Profile';
import Post from '../pages/Post';
import Answer from '../pages/Answer';
import GSpace from '../pages/GSpace';
import CreateGSpace from '../pages/CreateGSpace';
import CommunityPage from '../pages/Community';
import Quest from '../pages/Quest';
import PostDetailPage from '../pages/PostDetailPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/post" element={<Post />} />
    <Route path="/answer" element={<Answer />} />
    <Route path="/gspaces" element={<GSpace />} />
    <Route path="/gspace/create" element={<CreateGSpace />} />
    <Route path="/gspace/:id" element={<CommunityPage />} />
    <Route path="/quests" element={<Quest />} />
    <Route path="/posts/:postId" element={<PostDetailPage />} />
  </Routes>
);

export default AppRoutes;