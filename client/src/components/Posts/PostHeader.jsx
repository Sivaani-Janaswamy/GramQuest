import { UserRound } from 'lucide-react'; // Optional fallback icon
import userPlaceholder from '../../assets/user.png';

const PostHeader = ({ user }) => (
  <div className="flex items-center gap-4 mb-6">
    <img
      src={user?.profilePic && user.profilePic !== "https://via.placeholder.com/100"
        ? user.profilePic
        : userPlaceholder}
      alt={user?.name || 'User'}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div>
      <p className="text-gray-900 font-medium text-base">{user?.name || 'Unknown'}</p>
      <p className="text-gray-500 text-sm">{user?.email || 'N/A'}</p>
    </div>
  </div>
);

export default PostHeader;
