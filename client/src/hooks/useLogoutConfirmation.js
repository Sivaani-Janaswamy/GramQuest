import { useState, useCallback } from 'react';

const useLogoutConfirmation = (onLogout) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    setShowModal(false);
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  const cancelAction = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    showModal,
    handleLogoutClick,
    confirmLogout,
    cancelAction,
  };
};

export default useLogoutConfirmation;
