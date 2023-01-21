/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from 'react';
// import style from './app.module.scss';
import { Layout, Button, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import PostsList from '../PostsList/PostsList';
import CustomPagination from '../CustomPagination/CustomPagination';
import Post from '../Post/Post';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function MainPage() {
	const { status, error } = useSelector((state) => state.articles);

	return (
		<>
      {/* <Redirect to="/sign-in"/> */}
			{status === 'loading' && <Spin className={'spin'} size={'large'} />}
			{/* {error && <h2>{error}</h2>} */}
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
