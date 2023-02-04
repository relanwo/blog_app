import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NewArticle from '../components/NewArticle';
import { getArticleData } from '../store/article-slice';

function EditArticlePage() {
  const dispatch = useDispatch();

  const location = useLocation();
  const editOrNewParam = location.pathname;

  useEffect(() => {
    dispatch(getArticleData(editOrNewParam.slice(10, -5)));
  }, [dispatch, editOrNewParam]);

  const articleData = useSelector((state) => {
    if (state.articles.article) {
      return state.articles.article;
    }
    return [];
  });

  return (<NewArticle articleData={articleData} />);
}

export default EditArticlePage;
