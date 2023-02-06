import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/article-slice';

import Post from '../Post/Post';

export default function PostsList() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => {
    if (state.articles.articles) {
      // eslint-disable-next-line no-shadow
      const { articles } = state.articles.articles;
      return articles;
    }
    return [];
  });
  const elements = Array.isArray(articles)
    ? articles.map((res) => (
      <Post key={res.slug} data={res} />))
    : null;

  const page = useSelector((state) => state.articles.page);
  const pageSize = useSelector((state) => state.articles.pageSize);

  const memoArr = useMemo(() => [page, pageSize], [page, pageSize]);

  useEffect(() => {
    dispatch(fetchArticles(memoArr));
  }, [dispatch, memoArr]);

  return (elements);
}
