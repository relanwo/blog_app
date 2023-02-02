/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './NewArticle.module.scss';
import { Button, Form, Input, message, Space, Title, Alert } from 'antd';
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import {loginUser} from '../../store/user-slice'
import uniqid from 'uniqid';
import {setCreatedTag, deleteChosenTag, clearArticle, postNewArticle, setTagChange, getArticleData, clearTagsList, changeChosenTag, editArticle} from '../../store/article-slice'
import storage from 'redux-persist/lib/storage';

function NewArticle({articleData}) {
  const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const editOrNewParam = location.pathname

  const storeTags = useSelector((state) => state.articles.tagList)

  const [value, setValue] = useState('');

  // const onChange = (event) => setValue(event.target.value);
  const onChange = (field, event) => sessionStorage.setItem(field, event.target.value)
  // const onChange = (field, event) => sessionStorage.setItem(field, sessionStorage.getItem(...field, event.target.value))

  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    watch, 
    control,
    reset, //очистит поля ввода после отправки
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange",
    // defaultValues: {tags: [{ghgj}]}
    defaultValues: {
      tags: [{name: ''}]
    }
   });
   const { fields, append, update, remove } = useFieldArray({
    name: 'tags',
    control
   })


  const onSubmit = async (data) => {
    if (articleData) {
      data.tagList = JSON.parse(sessionStorage.getItem("tagList"))
      data.tags = []
      console.log('edited data', data)
      await dispatch(editArticle([articleData.slug, data])).then(() => {
        navigate(`/articles/${articleData.slug}`)
        dispatch(clearTagsList())
        dispatch(clearArticle())
    })
    } else {
      sessionStorage.setItem("tagList", JSON.stringify(fields))
      // console.log('register', )
      data.tagList = JSON.parse(sessionStorage.getItem("tagList")).map((el) => el?.name !== undefined && el.name)
      console.log('data',data)
      await dispatch(postNewArticle(data)).then(() => {
          navigate('/articles')
          dispatch(clearTagsList())
          dispatch(clearArticle())
      })
    }
  };

  const handleTagAdd = (index) => {
    dispatch(setCreatedTag(''))

    // const a = JSON.parse(sessionStorage.getItem('tagList'))
    // a.push('')
    // sessionStorage.setItem('tagList', JSON.stringify(a))
    // console.log('sessionStorage.getItem',sessionStorage.getItem('tagList'))
  }

  const handleTagRemove = (index) => {
    // console.log('handleTagRemove index',index)
    // if (articleData) {
    //   articleData.tagList.filter((el, i) => i !== index)
    // } else {
      dispatch(deleteChosenTag(index))
    // }
  }

  const fghjghjhgvhhj = useSelector((state) => state.articles.article)
  const handleInputChange = (e, index) => {
    // console.log('state taglist', fghjghjhgvhhj)
    let newData
    if (storeTags) {
      const params = [index, e.target.value]
      dispatch(changeChosenTag(params))
      // newData = JSON.stringify([...storeTags])
      newData = e.target.value
    } else {
      articleData.tagList[index] = e.target.value
    }
    console.log('NEW DATA', newData)
		sessionStorage.setItem('tagList', newData)
  }

  console.log('articleData', articleData)


	return (
    <>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={style['form']}
      >
      <p className={style['title']}>
        {editOrNewParam === '/new-article'
          ? 'Create new article'
          : 'Edit article'}
      </p>
        <label className={style['wrapper']}>
          Title
          <input
            {...register("title", {
              required: "Title field can't be blank",
              // defaultValue: articleData && sessionStorage.getItem("title")
            })}
            className={style['input']} placeholder="Title"
            style={{border: errors.title ? '1px solid red' : '' }}
            onChange={(e) => onChange("title", e)}
            defaultValue={articleData ? sessionStorage.getItem("title") : ''}
          />
        </label>
        <div>
          {errors.title && <p className={style['error']}>{errors.title.message || "Some error"}</p>}
        </div>

        <label className={style['wrapper']}>
          Short description
          <input
            {...register("description", {
              required: "Short description field can't be blank"
            })}
            className={style['input']} placeholder="Description"
            style={{border: errors.description ? '1px solid red' : '' }}
            onChange={(e) => onChange("description", e)}
            defaultValue={articleData ? sessionStorage.getItem("description")  : ''}
          />
        </label>
        <div>
          {errors.description && <p className={style['error']}>{errors.description.message}</p>}
        </div>

        <label className={style['wrapper']}>
          Text
          <textarea 
            {...register("body", {
              required: "Text field can't be blank"
            })}
            rows={11}
            className={style['input']} placeholder="Text"
            style={{border: errors.body ? '1px solid red' : '' }}
            onChange={(e) => onChange("body", e)}
            defaultValue={articleData ? sessionStorage.getItem("body")  : ''}
          />
        </label>
        <div>
          {errors.body && <p className={style['error']}>{errors.body.message}</p>}
        </div>

        <label className={style['wrapper']}>
          Tags
        </label>
        <ul className={style['tag-wrapper']}
          >

          {(!articleData?.tagList ? fields : []).map((singleTag, index) => {
            return (
            <li className={style['tag']} key={singleTag?.id ? singleTag.id : index}>
              <input 
                {...register(`tags.${index}.name`)}
                className={style['tags-input']} 
                placeholder='Tag'
              />
              {(fields && fields.length) > 1 &&
                <Button 
                  type='button'
                  className={style['delete-button']} 
                  // onClick={() => handleTagRemove(index)}
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              }

              {(fields && fields.length)  - 1 === index &&
                <Button 
                  type='button'
                  className={style['add-button']} 
                  // onClick={() => handleTagAdd(index)}
                  onClick={() => append()}
                >
                  Add Tag
                </Button>
              }
            </li>
          )})}


          {(articleData.tagList !== undefined ? articleData.tagList : []).map((singleTag, index) => {
            return (
            <li className={style['tag']} key={index}>
              <input 
                className={style['tags-input']} 
                placeholder='Tag'
                defaultValue={singleTag}
                onChange={(e) => handleInputChange(e, index)}
              />
              {(articleData?.tagList !== undefined ? JSON.parse(sessionStorage.getItem("tagList")) : storeTags).length > 1 &&
                <Button 
                  className={style['delete-button']} 
                  onClick={() => handleTagRemove(index)}
                >
                  Delete
                </Button>
              }

              {(articleData?.tagList !== undefined ? articleData.tagList : storeTags).length - 1 === index &&
                <Button 
                  className={style['add-button']} 
                  onClick={() => handleTagAdd(index)}
                >
                  Add Tag
                </Button>
              }
            </li>
          )})}
         <div>
          {errors.tag && <p className={style['error']}>{errors.tag.message}</p>}
          </div>
        </ul>

        <button 
          type="submit"
          className={
            isValid
              ? style['button']
              : `${style['button']} ${style['inactive']}`
          }
        >
          Send
        </button>

      </form>
    </>
	);
}

export default NewArticle;
