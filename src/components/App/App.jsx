import style from './App.module.scss';

import SingleArticlePage from '../../pages/SingleArticlePage';

import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Layout from '../Layout/Layout';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import Profile from '../Profile/Profile';
import NewArticlePage from '../../pages/NewArticlePage'
import EditArticlePage from '../../pages/EditArticlePage'

import RequireAuth from '../hoc/RequireAuth';

function App() {
	return (
		<div className={style['app']}>
			<Routes>
				<Route path="/" element={<Layout />}>
        <Route index element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        } />
        <Route path="articles" element={<Navigate to='/' replace />} /> 
        <Route path="articles/:slug" element={<SingleArticlePage />} />
        <Route path="articles/:slug/edit" element={<EditArticlePage />} />
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
