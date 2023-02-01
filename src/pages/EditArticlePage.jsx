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
  //   async function fetchData() {
  //     const response = await dispatch(getArticleData(editOrNewParam.slice(10, -5)))
  //   }
  //   fetchData()
  //   // }
  // }, [dispatch, editOrNewParam])

  const articleData = useSelector((state) => state.articles.article);  
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