/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from 'react';
import style from './app.module.scss';
import { Layout as AntdLayout, Button, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import PostsList from '../posts-list/posts-list';
import CustomPagination from '../custom-pagination/custom-pagination';
import Post from '../post/post';
import SingleArticlePage from '../pages/single-article-page';

import { Routes, Route, Link, Redirect } from 'react-router-dom';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import Layout from '../layout/layout';
import SignInPage from '../pages/sign-in-page';
import SignUpPage from '../pages/sign-up-page';
const { Header, Content, Footer } = AntdLayout;

function App() {
	return (
		<div className={style['app']}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path="articles" element={<MainPage />} />
					<Route path="articles/:slug" element={<SingleArticlePage />} />
					<Route path="sign-in" element={<SignInPage />} />
					<Route path="sign-up" element={<SignUpPage />} />
					{/* <Route path="profile " element={<MainPage />} /> */}
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
