/* eslint-disable no-unused-vars */
import style from './Layout.module.scss';
import { Link, Outlet } from 'react-router-dom';
import { Layout as AntdLayout, Button, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {logOut} from '../../store/user-slice'
const { Header, Content, Footer } = AntdLayout;

function Layout() {
  const dispatch = useDispatch();
  const { username, image } = useSelector((state) => state.user);

  // const isAuth = localStorage.getItem('token');
  const auth = useSelector((state) => state.user.isAuth)

  const header = auth 
    ? (
      <div className={style['wrapper']}>
        <Link 
        // to="/create-article"
        >
          <Button className={style['green-btn']}>Create article</Button>
        </Link>
        <div className={style['profile']}>
          <Link to="/profile">
            <p className={style['username']}>{username}</p>
          </Link>
					<img className={style['avatar']} alt="avatar" src={image} />
        </div>
        <Link 
        // to="/create-article"
        >
          <Button className={style['log-out']}
                  onClick={() => dispatch(logOut())}
                  // onClick={() => console.log('click')}
          >Log Out</Button>
        </Link>
      </div>
    )
    : (
      <div className={style['sign-wrapper']}>
      <Link to="/sign-in">
        <Button className={style['sign-in']} type="link">
          Sign In
        </Button>
      </Link>
      <Link to="/sign-up">
        <Button className={style['green-btn']} 
        >Sign Up</Button>
      </Link>
    </div>
    )

	return (
		<>
			<Header className={style['header']}>
				<Link to="/articles" className={style['logo']}>
					Realworld Blog
				</Link>
        {header}
				{/* <div className={style['sign-wrapper']}>
          <Link to="/sign-in">
            <Button className={style['sign-in']} type="link">
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up">
					  <Button className={style['sign-up']}>Sign Up</Button>
          </Link>
				</div> */}
			</Header>
			<Content className={style['content']}>
        <Outlet />
			</Content>
		</>
	);
}

export default Layout;
