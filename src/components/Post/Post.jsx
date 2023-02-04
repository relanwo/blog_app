/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
import { Button, Layout, Popconfirm } from 'antd';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import style from './Post.module.scss';
import { deleteArticle, deleteLike, postLike } from '../../store/article-slice';

const { Header, Content, Sider } = Layout;

export default function Post({ data, showBody }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storageUsername = useSelector((state) => state.user.username);

  const {
    slug,
    title,
    description,
    favorited,
    favoritesCount,
    tagList,
    createdAt,
    body,
  } = data;
  const { username, image } = data.author;

  const dateFormater = (item) => format(
    new Date(item.slice(0, 4), item.slice(5, 6), item.slice(8, 10)),
    'MMMM d, y',
  );
  const confirm = () => {
    dispatch(deleteArticle(slug));
    navigate('/', { replace: true });
  };

  const likePost = (idx) => {
    favorited
      ? dispatch(deleteLike(idx))
      : dispatch(postLike(idx));
  };

  return (
    <div className={style.card}>
      <div className={style['header-wrapper']}>
        <Content className={style.content}>
          <Header>
            <Link to={`/articles/${slug}`} className={style['title-link']}>
              <h5 className={style.title}>{title}</h5>
            </Link>
            <span
              className={
                favorited
                  ? `${style.likes} ${style.liked}`
                  : style.likes
              }
              onClick={() => likePost(slug)}
            >
              {favoritesCount}
            </span>
            <div className={style['tag-list']}>
              {tagList.map((tag) => (
                <span className={style.tag} key={uniqid()}>
                  {tag}
                </span>
              ))}
            </div>
          </Header>
          <p className={style.description}>{description}</p>
        </Content>
        <Sider className={style.sider}>
          <div className={style['sider-children']}>
            <div className={style['wrapper-profile']}>
              <div>
                <p className={style.username}>{username}</p>
                <p className={style.createdAt}>{dateFormater(createdAt)}</p>
              </div>
              <img className={style.avatar} alt="avatar" src={image} />
            </div>
            {showBody && username === storageUsername ? (
              <div className={style['wrapper-buttons']}>
                <Popconfirm
                  title="Are you sure delete this task?"
                  okText="Yes"
                  cancelText="No"
                  placement="right"
                  onConfirm={confirm}
                >
                  <Button className={style['red-btn']}>Delete</Button>
                </Popconfirm>
                <Button
                  className={style['green-btn']}
                  onClick={() => navigate(`/articles/${slug}/edit`)}
                >
                  Edit

                </Button>
              </div>
            ) : null}
          </div>
        </Sider>
      </div>
      {showBody ? (
        <ReactMarkdown className={style.body}>{body}</ReactMarkdown>
      ) : null}
    </div>
  );
}
