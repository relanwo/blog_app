/* eslint-disable no-unused-vars */
// import { Button, Alert, Spin } from 'antd';
// import style from './posts-list.module.scss';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/articleSlice';
// import {useParams }
// import uniqid from 'uniqid';
import {
	useParams,
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom';

import Post from '../post/post';

export default function PostsList() {
	const { slug } = useParams();

	const dispatch = useDispatch();

	const articles = useSelector((state) => {
		console.log('articles state>', state.articles.articles);
		if (state.articles.articles) {
			const { articles } = state.articles.articles;
			return articles;
		} else {
			return [];
		}
	});
	// console.log(Array.isArray(articles));
	// let elements;
	// if (articles) {
	const elements = Array.isArray(articles)
		? articles.map((res) => (
				// <Link key={res.slug} to={`/articles/${res.slug}`}>
					<Post key={res.slug} data={res} />
				// </Link>
		  ))
		: null;
	// }

	const page = useSelector((state) => state.articles.page);
	const pageSize = useSelector((state) => state.articles.pageSize);
	// eslint-disable-next-line react-hooks/exhaustive-deps

	const memoArr = useMemo(() => {
		return [page, pageSize];
	}, [page, pageSize]);

	// console.log(arr)
	useEffect(() => {
		dispatch(fetchArticles(memoArr));
	}, [dispatch, memoArr]);

	return (
		<>
			{elements}
			{/* <Post /> */}
		</>
	);
}
