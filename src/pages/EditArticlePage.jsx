import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getArticleData } from '../store/article-slice'
import { useDispatch, useSelector } from 'react-redux';
import NewArticle from '../components/NewArticle'

const EditArticlePage = () => {
  const dispatch = useDispatch();
  
  const location = useLocation();
  const editOrNewParam = location.pathname

  useEffect(() => {
    dispatch(getArticleData(editOrNewParam.slice(10, -5)))
  }, [dispatch, editOrNewParam])

	const articleData = useSelector((state) => {
		if (state.articles.article) {
			return state.articles.article;
		} else {
			return [];
		}
	});

  return (<NewArticle articleData={articleData}/>)
};

export default EditArticlePage