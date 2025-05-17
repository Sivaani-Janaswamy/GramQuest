const usePostActions = (postId, refreshPosts) => {
  const isLoggedIn = () => !!localStorage.getItem('token');

  const handleAction = async (type, active, setHasActive) => {
    if (!isLoggedIn()) return alert('Login required');

    const method = active ? 'DELETE' : 'PUT';
    const url = `http://localhost:3000/api/posts/${postId}/${type}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed');

      refreshPosts();
      setHasActive(!active);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Delete failed');
      refreshPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (editedPost) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(editedPost),
        }
      );
      if (!res.ok) throw new Error('Failed to update');
      refreshPosts();
      return true; 
    } catch (e) {
      alert(e.message);
      return false; 
    }
  };

  return { handleAction, handleDelete, handleUpdate };
};

export default usePostActions;