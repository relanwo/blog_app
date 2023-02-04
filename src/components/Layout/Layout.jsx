import { Layout as AntdLayout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import style from './Layout.module.scss';
import { logOut } from '../../store/user-slice';

const { Header, Content } = AntdLayout;

function Layout() {
  const dispatch = useDispatch();
  const { username, image } = useSelector((state) => state.user);

  const auth = useSelector((state) => state.user.isAuth);

  const header = auth
    ? (
      <div className={style.wrapper}>
        <Link to="/new-article">
          <Button className={style['green-btn']}>Create article</Button>
        </Link>
        <div className={style['profile-wrapper']}>
          <Link to="/profile" className={style.username}>
            <p>{username}</p>
          </Link>
          <img className={style.avatar} alt="avatar" src={image} />
        </div>
        <Button
          className={style['log-out']}
          onClick={() => dispatch(logOut())}
        >
          Log Out
        </Button>
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
          <Button className={style['green-btn']}>
            Sign Up

          </Button>
        </Link>
      </div>
    );

  return (
    <>
      <Header className={style.header}>
        <Link to="/articles" className={style.logo}>
          Realworld Blog
        </Link>
        {header}
      </Header>
      <Content className={style.content}>
        <Outlet />
      </Content>
    </>
  );
}

export default Layout;
