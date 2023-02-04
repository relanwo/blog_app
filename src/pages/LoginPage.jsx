import { useLocation, useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn/SignIn';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  return (<SignIn onSubmit={() => navigate(fromPage)} />);
}

export default LoginPage;
