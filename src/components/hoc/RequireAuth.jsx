/* eslint-disable no-unused-vars */
import reactMarkdown from "react-markdown";
import { useLocation, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

const RequireAuth = ({children}) => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth)
  
  // useEffect(() => {
    if (!isAuth) {
      return <Navigate to='/sign-in' state={{from: location}}/>
    }
    return children
  // }, [children, isAuth, location])
    

  // const store = useSelector((state) => state)

  // const navigate = useNavigate();

  // const fromPage = location.state.from
  // console.log(location)

  // const fromPage = location.state?.from
  // signin(user, ()=> navigate(fromPage, {replace: true}))

  // const fromPage = location.state || '/'

  // if (!auth) {
  //   return <Navigate to='/sign-in' 
  //   state={{from: location.pathname}}
  //   // state={{from: location}}
  //   />
  // } 
  // else {
  //   // return <Navigate to={children} replace/>
  //   // navigate(fromPage, {replace: true})
  //   // // navigate(fromPage)
  //   // <Navigate to={fromPage}/>
  //   return children
  // }

  // if (auth) {
  //   return children
  // } else {
  //   return <Navigate to='/sign-in' 
  //   // state={{from: location.pathname}}
  // //   // state={{from: location}}
  //   />
  // }

  // return (isAuth ? children : <Navigate to='/sign-in' state={{from: location}}/>) 
};

export default RequireAuth