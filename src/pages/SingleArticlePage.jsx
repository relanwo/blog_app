import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from '../components/Post/Post';

function SingleArticlePage() {
  const { slug } = useParams();

  const articles = useSelector((state) => {
    if (state.articles.articles) {
      // eslint-disable-next-line no-shadow
      const { articles } = state.articles.articles;
      return articles;
    }
    return [];
  });

  useEffect(() => {}, []);
  const element = Array.isArray(articles) && articles.find((res) => res.slug === slug);

  const params = useMemo(() => element, [element]);

  return (<Post data={params} showBody />);
}

export default SingleArticlePage;
