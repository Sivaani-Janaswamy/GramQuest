import { FaStar, FaThumbsUp } from 'react-icons/fa';

const PostActionButton = ({ type, active, count, onClick }) => {
  const Icon = type === 'star' ? FaStar : FaThumbsUp;
  const baseClass = `flex items-center hover:scale-105 transition`;
  const activeClass = type === 'star' ? 'text-yellow-700' : 'text-blue-700';
  const inactiveClass = type === 'star' ? 'text-yellow-500' : 'text-blue-500';
  const label = type === 'star' ? 'Stars' : 'Upvotes';

  return (
    <button onClick={onClick} className={`${baseClass} ${active ? activeClass : inactiveClass}`}>
      <Icon className="mr-2" />
      <span>{count || 0} {label}</span>
    </button>
  );
};

export default PostActionButton;