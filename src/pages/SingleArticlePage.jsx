import Post from '../components/Post/Post';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

function SingleArticlePage() {
	const { slug } = useParams();

	const articles = useSelector((state) => {
		if (state.articles.articles) {
			const { articles } = state.articles.articles;
			return articles;
		} else {
			return [];
		}
	});

	useEffect(() => {}, []);
	const element =
		Array.isArray(articles) && articles.find((res) => res.slug === slug);

	const params = useMemo(() => {
		return element;
	}, [element]);

	return (<Post data={params} showBody={true} />);
}

export default SingleArticlePage;
