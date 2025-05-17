import PostCard from './PostCard';

const PostList = ({ posts, isPostTab, refreshPosts }) => (
  <div className="space-y-6">
    {posts.map((post) => (
      <PostCard
        key={post._id}
        post={post}
        isPostTab={isPostTab}
        refreshPosts={refreshPosts}
      />
    ))}
  </div>
);

export default PostList;
