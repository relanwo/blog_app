/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from 'react';
import style from './App.module.scss';
import { Layout as AntdLayout, Button, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import PostsList from '../PostsList/PostsList';
import CustomPagination from '../CustomPagination/CustomPagination';
import Post from '../Post/Post';
import SingleArticlePage from '../pages/SingleArticlePage';

import { Routes, Route, Link, Redirect } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../Layout/Layout';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
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
