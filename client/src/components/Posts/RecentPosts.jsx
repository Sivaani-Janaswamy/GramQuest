import PostList from './PostList';
import { SearchAndFilter } from '../common';
import usePostFilters from '../../hooks/usePostFilters'; // Import the hook

const RecentPosts = ({ posts, isPostTab, refreshPosts }) => {
  const { filteredPosts, handleFilterChange, handleSearchChange } = usePostFilters(posts);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6 space-x-3">
        <SearchAndFilter
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          isPostTab={isPostTab}
        />
      </div>

      <PostList posts={filteredPosts} isPostTab={isPostTab} refreshPosts={refreshPosts} />
    </div>
  );
};

export default RecentPosts;