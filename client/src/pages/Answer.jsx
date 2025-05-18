import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useAuthRedirect';
import {RecentPosts} from '../components/Posts';
import {Sidebar} from '../components/common';
import useFetchPosts from '../hooks/useFetchPosts'; 

const Answer = () => {
  const navigate = useNavigate();
  useAuthRedirect(navigate);
  const { posts, refreshPosts, loading, error } = useFetchPosts();

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading posts...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-500">Error loading posts: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-0">
      <div className="container space-y-8">
        {/* Main Content and Sidebar Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 🠖 Move Sidebar First */}
          <Sidebar />

          <div className="flex-1">
            {/* Recent Posts */}
            <RecentPosts posts={posts} isPostTab={false} refreshPosts={refreshPosts} /> {/* Pass refreshPosts */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;