/* eslint-disable no-unused-vars */
import {Form, Input, TextArea, TagList, Button} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {setCreatedTag, deleteChosenTag, clearArticle, postNewArticle, setTagChange, getArticleData, clearTagsList, changeChosenTag} from '../store/article-slice'
import { useDispatch, useSelector } from 'react-redux';
import NewArticle from '../components/NewArticle'

const EditArticlePage = () => {
  // const articleData = sessionStorage.getItem('artilcle')
  const dispatch = useDispatch();
  
  const location = useLocation();
  const editOrNewParam = location.pathname
  // useEffect(async () => {
  // // if (editOrNewParam !== '/new-article') {
    // let articleData;
    // async function fetchData() {
    //   const resp = await dispatch(getArticleData(editOrNewParam.slice(10, -5)))
    //   // eslint-disable-next-line react-hooks/rules-of-hooks
    //   articleData = useSelector((state) => state.articles.article); 
    // }
    // fetchData()
  //   // }
  // }, [dispatch, editOrNewParam])
  useEffect(() => {
    dispatch(getArticleData(editOrNewParam.slice(10, -5)))
  }, [dispatch, editOrNewParam])

	const articleData = useSelector((state) => {
		// console.log('articles state>', state.articles.articles);
		if (state.articles.article) {
			// const { article } = state.articles.article;
      // console.log('article', state.articles.article)
			return state.articles.article;
		} else {
			return [];
		}
	});

  if (articleData) {
    sessionStorage.setItem("title", articleData.title)
    sessionStorage.setItem("description", articleData.description)
    sessionStorage.setItem("body", articleData.body)
    articleData.tagList !== [] 
      && sessionStorage.setItem("tagList", JSON.stringify(articleData.tagList))
    // sessionStorage.setItem("tagList", JSON.stringify(fields))
  }

  // const articleData = useSelector((state) => state.articles.article);  

  // const articleData = useSelector((state) => {
  //   if (state.articles.article) {
  //     const { article } = state.articles.article;
  //     return article;
  //   } else {
  //     return [];
  //   }
  // });

  return (<NewArticle articleData={articleData}/>)
};

export default EditArticlePage