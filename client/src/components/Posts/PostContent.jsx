const PostContent = ({ post, isEditing, editedPost, setEditedPost, showTitle = true }) => (
  <div className="mb-6">
    {isEditing ? (
      <>
        {showTitle && (
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost(prev => ({ ...prev, title: e.target.value }))}
            className="w-full border border-gray-200 p-2 rounded-lg text-gray-900 text-base mb-3 bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
            placeholder="Post Title"
          />
        )}
        <textarea
          value={editedPost.body}
          onChange={(e) => setEditedPost(prev => ({ ...prev, body: e.target.value }))}
          className="w-full border border-gray-200 p-2 rounded-lg text-gray-900 text-base bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
          rows={5}
          placeholder="Write something..."
        />
      </>
    ) : (
      <>
        {showTitle && (
          <h4 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h4>
        )}
        <p className="text-gray-700 text-base leading-relaxed mb-4 whitespace-pre-wrap">
          {post.body}
        </p>
        {post.attachments?.length > 0 && (
          <div className="text-teal-600 font-medium text-sm">Attachment added</div>
        )}
      </>
    )}
  </div>
);

export default PostContent;
