import PostList from './PostList';
import {Filter, SearchBar} from '../common';
import usePostFilters from '../../hooks/usePostFilters'; // Import the hook

const RecentPosts = ({ posts, isPostTab, refreshPosts }) => {
  const { filteredPosts, handleFilterChange, handleSearchChange } = usePostFilters(posts);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6 space-x-3">
        <SearchBar onSearchChange={handleSearchChange} />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <PostList posts={filteredPosts} isPostTab={isPostTab} refreshPosts={refreshPosts} />
    </div>
  );
};

export default RecentPosts;