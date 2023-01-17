/* eslint-disable no-unused-vars */
// import { Button, Alert, Spin } from 'antd';
// import style from './posts-list.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/articleSlice';
// import uniqid from 'uniqid';

import Post from '../post/post';

export default function PostsList() {
	const dispatch = useDispatch();

	const articles = useSelector((state) => {
		console.log('articles state>', state.articles.articles);
		const { articles, articlesCount } = state.articles.articles;
		if (articles) {
			return articles;
		}
	});
	console.log(Array.isArray(articles));
	// let elements;
	// if (articles) {
	  const elements = Array.isArray(articles) ? articles.map((res) => <Post key={res.slug} data={res} />) : null;
	// }

	useEffect(() => {
		dispatch(fetchArticles());
	}, [dispatch]);

	return (
		<>
			{elements}
			{/* <Post /> */}
		</>
	);
}
