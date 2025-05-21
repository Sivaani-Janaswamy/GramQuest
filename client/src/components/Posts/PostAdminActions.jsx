import React from 'react';
import { Edit, Trash2 } from 'lucide-react'; // Import Lucide icons

const PostAdminActions = ({ onEditClick, onDeleteClick }) => (
  <div className="flex gap-3"> {/* Use a div for consistent spacing */}
    <button
      onClick={onEditClick}
      className="flex items-center justify-center p-1.5 rounded-full
                 text-gray-500 hover:bg-gray-100 hover:text-gray-700
                 transition duration-200 ease-in-out"
      aria-label="Edit post"
    >
      <Edit className="w-4 h-4" /> {/* Edit icon */}
    </button>

    <button
      onClick={onDeleteClick}
      className="flex items-center justify-center p-1.5 rounded-full
                 text-red-500 hover:bg-red-50 hover:text-red-600
                 transition duration-200 ease-in-out"
      aria-label="Delete post"
    >
      <Trash2 className="w-4 h-4" /> {/* Delete icon */}
    </button>
  </div>
);

export default PostAdminActions;