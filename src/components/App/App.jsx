/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from 'react';
import style from './App.module.scss';
import { Layout as AntdLayout, Button, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import PostsList from '../PostsList/PostsList';
import CustomPagination from '../CustomPagination/CustomPagination';
import Post from '../Post/Post';
import SingleArticlePage from '../../pages/SingleArticlePage';

import { Routes, Route, Link, Redirect, Navigate } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Layout from '../Layout/Layout';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Profile from '../Profile/Profile';
import NewArticlePage from '../../pages/NewArticlePage'

import RequireAuth from '../hoc/RequireAuth';
import SignIn from '../SignIn/SignIn';

const { Header, Content, Footer } = AntdLayout;

function App() {
  // useEffect(() => {
  //   localStorage.clear(); //потоом буду удалять при логауте
	// }, []);
  const isAuth = useSelector((state) => state.user.isAuth)
	return (
		<div className={style['app']}>
			<Routes>
				<Route path="/" element={<Layout />}>
        {/* <Route index element={() => (!isAuth ? <SignIn /> : <Navigate to="/posts" />)<MainPage />} /> */}
        {/* <Route index element={<MainPage />} /> */}
        <Route index element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        } />
        <Route path="articles" element={<Navigate to='/' replace />} /> {/* чтобы не сохр /articles в истории посещений, добавляем replace */}
        {/* <Route path="articles" element={<MainPage />} /> */}
        <Route path="articles/:slug" element={<SingleArticlePage />} />
        <Route path="articles/:slug/edit" element={<NewArticlePage />} />
        {/* `/articles/${slug}/edit` */}
        {/* <Route path="sign-in" element={() => (!isAuth ? <SignIn /> : <Navigate to="/" />)} /> */}
        {/* <Route path="sign-in" element={<SignIn />} /> */}
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<RegisterPage />} />
        <Route path="profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path="new-article" element={<NewArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
