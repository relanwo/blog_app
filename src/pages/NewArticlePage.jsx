/* eslint-disable no-unused-vars */
import {Form, Input, TextArea, TagList, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NewArticle from '../components/NewArticle'

const NewArticlePage = () => {
  // const articleData = useSelector((state) => state.articles.article);  
  return (<NewArticle />)
};

export default NewArticlePage