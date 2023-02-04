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
		if (state.articles.article) {
			return state.articles.article;
		} else {
			return [];
		}
	});

  // const func = async () => {
  //   if (articleData !== undefined) {
  //     const a = await sessionStorage.setItem("title", articleData.title)
  //       const b = await (sessionStorage.setItem("description", articleData.description))
  //       const c = await (sessionStorage.setItem("body", articleData.body))
  //       const d = await (sessionStorage.setItem("tagList", JSON.stringify(articleData.tagList)))
  //     // }))
  //     //  &&
  //     // articleData.tagList !== [] 
  //       // && 
  //     // sessionStorage.setItem("tagList", JSON.stringify(fields))
  //     // return a;
  //   }
  // }

  // if (articleData &&
  //   (sessionStorage.getItem("title") === articleData.title &&
  //   sessionStorage.getItem("description") === articleData.description &&
  //   sessionStorage.setItem("body") === articleData.body
  //   // articleData.tagList !== [] 
  //     && sessionStorage.setItem("tagList") === JSON.stringify(articleData.tagList))) {
  //   // sessionStorage.setItem("tagList", JSON.stringify(fields))
  //   return (<NewArticle articleData={articleData}/>)
  // }  

  return (<NewArticle articleData={articleData}/>)
  // return (func() && <NewArticle articleData={articleData}/>)
};

export default EditArticlePage