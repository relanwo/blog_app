/* eslint-disable no-unused-vars */
import style from './app.module.scss';
import { Layout, Pagination, Card, Button } from 'antd';
import PostsList from '../posts-list/posts-list';
import CustomPagination from '../custom-pagination/custom-pagination';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function App() {
	return (
		<Router>
			<div className={style['app']}>
				<Header className={style['header']}>
					<p className={style['logo']}>Realworld Blog</p>

					<div className={style['sign-wrapper']}>
						<Button className={style['sign-in']} type="link">
							Sign In
						</Button>
						<Button className={style['sign-up']}>Sign Up</Button>
					</div>
				</Header>
				<Content className={style['content']}></Content>
					<PostsList />
					<Footer className={style['footer']}>
						<CustomPagination />
					</Footer>
				</Content>
			</div>
		</Router>
	);
}

export default App;
