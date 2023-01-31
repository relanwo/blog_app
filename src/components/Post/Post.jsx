/* eslint-disable no-unused-vars */
import style from './Post.module.scss';
import { Card, Layout, Button, Popconfirm } from 'antd';
// console.log(style)
import { format } from 'date-fns';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { changeSlug } from '../../store/article-slice';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {deleteArticle} from '../../store/article-slice';

const { Header, Content, Sider } = Layout;

export default function Post({ data, showBody }) {
  const navigate = useNavigate();
	// console.log('showBody',showBody);
	const dispatch = useDispatch();
  const storageUsername = useSelector((state) => state.user.username)

	const {
		slug,
		// id, price, carrier, segments,
		title,
		description,
    favorited,
		favoritesCount,
		tagList,
		createdAt,
		body,
	} = data;
	const { username, image } = data.author;
  
	const dateFormater = (item) => {
		return format(
			new Date(item.slice(0, 4), item.slice(5, 6), item.slice(8, 10)),
			'MMMM d, y'
		);
	};
  const confirm = () => {
    console.log('confirm slug', slug)
    dispatch(deleteArticle(slug))
    navigate('/', {replace: true})
  }
  // const likePost = () => {
  //   console.log('favorited', favorited)
  //   favorited 
  //     ? dispatch(deleteLike(slug))
  //     : dispatch(postLike(slug))
  // }

	return (
		<div className={style['card']}>
			<div className={style['header-wrapper']}>
				<Content className={style['content']}>
					<Header>
						<Link to={`/articles/${slug}`} className={style['title-link']}>
							<h5 className={style['title']}>{title}</h5>
						</Link>
						<span 
              className={style['likes']}
              // onClick={()=>likePost()}
              onClick={()=>console.log('post like')}
            >
              {favoritesCount}
            </span>
						<div className={style['tag-list']}>
							{tagList.map((tag) => (
								<span className={style['tag']} key={uniqid()}>
									{tag}
								</span>
							))}
						</div>
					</Header>
					<p className={style['description']}>{description}</p>
				</Content>
				<Sider className={style['sider']}>
          <div className={style['sider-children']}>
            <div className={style['wrapper-profile']}>
              <div>
                <p className={style['username']}>{username}</p>
                <p className={style['createdAt']}>{dateFormater(createdAt)}</p>
              </div>
              <img className={style['avatar']} alt="avatar" src={image} />
            </div>
            {showBody && username === storageUsername ? (
              // <ReactMarkdown className={style['body']}>{body}</ReactMarkdown>
              <div className={style['wrapper-buttons']}>
              <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No" 
                placement={'right'}
                onConfirm={confirm}
              >
                <Button className={style['red-btn']}>Delete</Button>
              </Popconfirm>
              <Button 
                className={style['green-btn']}
                // onClick={navigate(`/articles/${slug}/edit`)}
                onClick={() => navigate(`/articles/${slug}/edit`)}
              >Edit</Button>
              </div>
            ) : null}
          </div>
				</Sider>
			</div>
			{showBody ? (
				<ReactMarkdown className={style['body']}>{body}</ReactMarkdown>
			) : null}
		</div>
	);
}
