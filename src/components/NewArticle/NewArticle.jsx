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
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import {loginUser} from '../../store/user-slice'
import uniqid from 'uniqid';
import {setCreatedTag, deleteChosenTag, postNewArticle, setTagChange, getArticleData} from '../../store/article-slice'

function NewArticle() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const editOrNewParam = location.pathname
  useEffect(() => {
    if (editOrNewParam !== '/new-article') {
      dispatch(getArticleData(editOrNewParam.slice(10, -5)))
    }
  }, [dispatch, editOrNewParam])
  // const article = useSelector((state) => state.user.article)
  const article = useSelector((state) => {
		// console.log('articles state>', state.articles.articles);
		if (state.articles.article) {
			const { article } = state.articles.article;
			return article;
		} else {
			return [];
		}
	});
  console.log('editOrNewParam', editOrNewParam)

  // const isAuth = useSelector((state) => state.user.isAuth)
  const storeTags = useSelector((state) => state.articles.tagList)
  console.log('storeTags',storeTags)

  const [value, setValue] = useState('');

  // const onChange = (event) => console.log(event.target.value);
  const onChange = (event) => setValue(event.target.value);

  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    watch, 
    reset, //очистит поля ввода после отправки
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange"
   });

  const onSubmit = data => {
    if (storeTags !== []) {
      data.tagList = storeTags.map((el) => {
        return el.content
      }) 
    } else {
      data.tagList = []
    }
    // const {rep_password, ...clearData} = data
    console.log(data)
    dispatch(postNewArticle(data));
    // if (data) navigate('/')
    // isAuth && navigate(fromPage)
    // navigate(a)
    // alert(JSON.stringify(data))
    // reset()
    navigate('/', {replace: true})
  };

  const addTag = (value) => {
    // console.log(e)
    const id = uniqid()
    const item = { id, content: value }
    dispatch(setCreatedTag(item))
    setValue('')
  }
  const deleteTag = (id) => dispatch(deleteChosenTag(id))
	// 	const newData = JSON.stringify(
	// 		// [...articles.tags].filter((el) => el.id !== id)
	// 	)
	// 	// localStorage.setItem('tags', newData)
	// }
  console.log(article.tagList)
  // const mapTags = (arrOfTags) => {
  //   if (arrOfTags !== undefined) {
  //     arrOfTags.map((el, i) => {
  //       return (
  //         <li className={style['tag']} key={el.id}>
  //         <input className={style['tags-input']} 
  //           defaultValue={el.content} 
  //           // value={value} 
  //           // onChange={onChange}
  //           onChange={(e) =>
  //             dispatch(setCreatedTag({ id: el.id, content: e.target.value }))
  //           }
  //         />
  //         <Button 
  //           className={style['delete-button']} 
  //           onClick={() => deleteTag(el.id)}
  //           >Delete</Button>
  //         </li>
  //       );
  //     })
  //   }
  // }

  let tags
  if (storeTags !== undefined) {
    tags = storeTags.map((el, i) => {
      // if (storeTags.length === 0) {
      //   return ()
      // }
        return (
          <li className={style['tag']} key={el.id}>
          <input className={style['tags-input']} 
            defaultValue={el.content} 
            // value={value} 
            // onChange={onChange}
            onChange={(e) =>
              dispatch(setCreatedTag({ id: el.id, content: e.target.value }))
            }
          />
          <Button 
            className={style['delete-button']} 
            // onClick={() => console.log('delete el', el.id)}
            onClick={() => deleteTag(el.id)}
            >Delete</Button>
          {/* <Button 
            className={style['add-button']} 
             onClick={() => addTag(value)}
            >Add Tag</Button> */}
         </li>
        );
      // }
    })
  }

	return (
    <>
    {/* {fromPage} */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={style['form']}
      >
      <p className={style['title']}>
        {editOrNewParam === '/new-article'
          ? 'Create new article'
          : 'Edit article'}
        {/* // Create new article */}
      </p>
        <label className={style['wrapper']}>
          Title
          <input
            {...register("title", {
              required: "Title field can't be blank",
            })}
            className={style['input']} placeholder="Title"
            style={{border: errors.title ? '1px solid red' : '' }}
            value={editOrNewParam !== '/new-article' && article.title !==undefined ? article.title : ''}
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
            value={editOrNewParam !== '/new-article' && article.description ? article.description : ''}
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
            value={editOrNewParam !== '/new-article' && article.body ? article.body : ''}
          ></textarea >
        </label>
        <div>
          {errors.body && <p className={style['error']}>{errors.body.message}</p>}
        </div>

        <label className={style['wrapper']}>
          Tags
        </label>
        <ul className={style['tag-wrapper']}
          {...register("tags", {
            required: "At least one tag is required"
          })}>
          {tags}
          {/* {editOrNewParam !== '/new-article'
            ? mapTags(article.tagList)
            : mapTags(storeTags)
          } */}
            
         <li className={style['tag']}>
          <input className={style['tags-input']} 
            value={value} 
            onChange={onChange}
          />
          <Button 
            className={style['delete-button']} 
            // onClick={() => console.log('delete')}
            >Delete</Button>
          <Button 
            className={style['add-button']} 
             onClick={() => addTag(value)}
            >Add Tag</Button>
         </li>
         <div>
          {errors.tag && <p className={style['error']}>{errors.tag.message}</p>}
          </div>
        </ul>

        <button className={style['button']}
          type="submit"
          disabled={!isValid}
        >
          Send
        </button>

      </form>
    </>
	);
}

export default NewArticle;
