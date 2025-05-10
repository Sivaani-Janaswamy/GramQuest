import { useEffect } from 'react';

const useAuthRedirect = (navigate) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuthRedirect;
