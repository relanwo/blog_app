/* eslint-disable no-unused-vars */
import style from './post.module.scss';
import { Card, Layout } from 'antd';
// console.log(style)
import { format } from 'date-fns';
import uniqid from 'uniqid';

const { Header, Content, Sider } = Layout;

export default function Post({ data }) {
	const {
		// id, price, carrier, segments,
		title,
		description,
		favoritesCount,
		tagList,
		createdAt,
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
			<Content className={style['content']}>
				<Header>
					<h5 className={style['title']}>{title}</h5>
					<span className={style['likes']}>{favoritesCount}</span>
					{/* <br/> */}
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
	);
}
