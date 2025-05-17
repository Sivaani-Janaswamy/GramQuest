const PostEditActions = ({ onSaveClick, onCancelClick }) => (
  <>
    <button
      onClick={onSaveClick}
      className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200"
    >
      Save
    </button>

    <button
      onClick={onCancelClick}
      className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
    >
      Cancel
    </button>
  </>
);

export default PostEditActions;