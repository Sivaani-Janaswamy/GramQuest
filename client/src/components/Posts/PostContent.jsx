const PostContent = ({ post, isEditing, editedPost, setEditedPost, showTitle = true }) => (
  <div>
    {isEditing ? (
      <>
        {showTitle && (
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost(prev => ({ ...prev, title: e.target.value }))}
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
        )}
        <textarea
          value={editedPost.body}
          onChange={(e) => setEditedPost(prev => ({ ...prev, body: e.target.value }))}
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
      </>
    ) : (
      <>
        {showTitle && <h4 className="text-lg font-semibold mb-3 text-gray-900">{post.title}</h4>}
        <p className="text-gray-700 mb-4">{post.body}</p>
        {post.attachments?.length > 0 && (
          <div className="text-teal-600 font-medium">Attachment added</div>
        )}
      </>
    )}
  </div>
);


export default PostContent;
