import { useSelector } from "react-redux";

export function useAuth() {
  const {
    username,
    email,
    password,
    id
  } = useSelector(state => state.user);

  return {
    isAuth: !!email,
    username,
    email,
    password,
    id
  }
}