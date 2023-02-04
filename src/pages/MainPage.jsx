import { Alert, Layout, Spin } from 'antd';
import { useSelector } from 'react-redux';

import CustomPagination from '../components/CustomPagination/CustomPagination';
import PostsList from '../components/PostsList/PostsList';

const { Footer } = Layout;

function MainPage() {
  const { status, error } = useSelector((state) => state.articles);

  return (
    <>
      {status === 'loading' && <Spin className="spin" size="large" />}
      {error ? (
        <Alert className="error" message={error} type="error" showIcon />
      ) : (
        <>
          <PostsList />
          <Footer className="footer">
            <CustomPagination />
          </Footer>
          {' '}
        </>
      )}
    </>
  );
}

export default MainPage;
