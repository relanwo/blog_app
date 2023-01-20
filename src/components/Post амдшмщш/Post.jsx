/* eslint-disable no-unused-vars */
import style from './Post.module.scss';
import { Card, Layout } from 'antd';
// console.log(style)
import { format } from 'date-fns';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { changeSlug } from '../../store/article-slice';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const { Header, Content, Sider } = Layout;

export default function Post({ data, showBody }) {
	console.log(showBody);
	const dispatch = useDispatch();

	const {
		slug,
		// id, price, carrier, segments,
		title,
		description,
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

	return (
		<div className={style['card']}>
			<div className={style['header-wrapper']}>
				<Content className={style['content']}>
					<Header>
						<Link to={`/articles/${slug}`} className={style['title-link']}>
							<h5 className={style['title']}>{title}</h5>
						</Link>
						<span className={style['likes']}>{favoritesCount}</span>
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
					<div>
						<p className={style['username']}>{username}</p>
						<p className={style['createdAt']}>{dateFormater(createdAt)}</p>
					</div>
					<img className={style['avatar']} alt="avatar" src={image} />
				</Sider>
			</div>
			{showBody ? (
				<ReactMarkdown className={style['body']}>{body}</ReactMarkdown>
			) : null}
		</div>
	);
}
