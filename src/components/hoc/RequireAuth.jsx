import { useLocation, Navigate } from "react-router";
import { useSelector } from 'react-redux';

const RequireAuth = ({children}) => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth)
  
  if (!isAuth) {
    return <Navigate to='/sign-in' state={{from: location}}/>
  }
  return children
};

export default RequireAuth