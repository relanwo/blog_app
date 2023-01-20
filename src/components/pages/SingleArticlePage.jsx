/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

function SingleArticlePage() {
	console.log('useParams', useParams());
	const { slug } = useParams();

	const articles = useSelector((state) => {
		if (state.articles.articles) {
			const { articles } = state.articles.articles;
			return articles;
		} else {
			return [];
		}
	});

	// let element
	useEffect(() => {}, []);
	const element =
		Array.isArray(articles) && articles.find((res) => res.slug === slug);

	const params = useMemo(() => {
		return element;
	}, [element]);

	console.log('params', params);
	return (
		<>
			<Post data={params} showBody={true} />
			{/*  */}
		</>
	);
	// return <h2>{slug}</h2>
}

export default SingleArticlePage;
