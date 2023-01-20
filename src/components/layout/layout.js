/* eslint-disable no-unused-vars */
import style from './layout.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { Layout as AntdLayout, Button, Spin, Alert } from 'antd';
const { Header, Content, Footer } = AntdLayout;

function Layout() {
	return (
		<>
			<Header className={style['header']}>
				<Link to="/articles" className={style['logo']}>
					Realworld Blog
				</Link>
				<div className={style['sign-wrapper']}>
          <Link to="/sign-in">
            <Button className={style['sign-in']} type="link">
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up">
					  <Button className={style['sign-up']}>Sign Up</Button>
          </Link>
				</div>
			</Header>
			<Content className={style['content']}>
        <Outlet />
			</Content>
		</>
	);
}

export default Layout;
