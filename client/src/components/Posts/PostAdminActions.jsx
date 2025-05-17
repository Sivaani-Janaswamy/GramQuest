const PostAdminActions = ({ onEditClick, onDeleteClick }) => (
  <>
    <button
      onClick={onEditClick}
      className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200"
    >
      Edit
    </button>

    <button
      onClick={onDeleteClick}
      className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
    >
      Delete
    </button>
  </>
);

export default PostAdminActions;