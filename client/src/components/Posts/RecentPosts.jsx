import PostList from './PostList';
import { SearchAndFilter } from '../common';
import usePostFilters from '../../hooks/usePostFilters';

const RecentPosts = ({ posts, isPostTab, refreshPosts }) => {
  const { filteredPosts, handleFilterChange, handleSearchChange } = usePostFilters(posts);

  return (
    <div className="max-w-4xl space-y-8 px-4 sm:px-6">
      <SearchAndFilter
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        isPostTab={isPostTab}
      />
      <PostList posts={filteredPosts} isPostTab={isPostTab} refreshPosts={refreshPosts} />
    </div>
  );
};

export default RecentPosts;