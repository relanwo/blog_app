import { Layout, Spin, Alert } from 'antd';
import { useSelector } from 'react-redux';

import PostsList from '../components/PostsList/PostsList';
import CustomPagination from '../components/CustomPagination/CustomPagination';

const { Footer } = Layout;

function MainPage() {
	const { status, error } = useSelector((state) => state.articles);

	return (
		<>
			{status === 'loading' && <Spin className={'spin'} size={'large'} />}
			{error ? (
				<Alert className={'error'} message={error} type="error" showIcon />
			) : (
				<>
					<PostsList />
					<Footer className={'footer'}>
						<CustomPagination />
					</Footer>{' '}
				</>
			)}
		</>
	);
}

export default MainPage;
