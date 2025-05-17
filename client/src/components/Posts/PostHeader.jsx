import userPlaceholder from '../../assets/user.png';

const PostHeader = ({ user }) => (
  <div className="flex items-center mb-4">
    <img
      src={user?.profilePic && user.profilePic !== "https://via.placeholder.com/100"
        ? user.profilePic
        : userPlaceholder}
      alt={user?.name || 'User'}
      className="w-12 h-12 rounded-full mr-4"
    />
    <div>
      <p className="font-semibold text-gray-900">{user?.name || 'Unknown'}</p>
      <p className="text-sm text-gray-600">{user?.email || 'N/A'}</p>
    </div>
  </div>
);

export default PostHeader;
