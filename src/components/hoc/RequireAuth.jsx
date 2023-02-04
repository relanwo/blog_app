import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

function RequireAuth({ children }) {
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
