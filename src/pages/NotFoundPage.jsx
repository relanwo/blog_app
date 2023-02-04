import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      This page does not exist. Go to the
      {' '}
      <Link to="/articles">home page</Link>
      .
    </div>
  );
}

export default NotFoundPage;
