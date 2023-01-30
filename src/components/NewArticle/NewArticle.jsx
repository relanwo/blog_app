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
import {setCreatedTag, deleteTag, postNewArticle, setTagChange} from '../../store/article-slice'

function SignIn() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  // console.log(location)

  const isAuth = useSelector((state) => state.user.isAuth)
  const storeTags = useSelector((state) => state.articles.tags)
  console.log('storeTags',storeTags)

  const [value, setValue] = useState('');

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
  };

  const addTag = (value) => {
    // console.log(e)
    const id = uniqid()
    const item = { id, content: value }
    dispatch(setCreatedTag(item))
    setValue('')
  }
  const deleteTag = (id) => dispatch(deleteTag(id))
	// 	const newData = JSON.stringify(
	// 		// [...articles.tags].filter((el) => el.id !== id)
	// 	)
	// 	// localStorage.setItem('tags', newData)
	// }
  let tags
  if (storeTags !== undefined) {
    tags = storeTags.map((el, id) => {
      // if (storeTags.length === 0) {
      //   return []
      // }
        return (
          <li className={style['tag']} key={el.id}>
          <input className={style['tags-input']} 
            defaultValue={el.content} 
            value={value} 
            onChange={onChange}
            // onChange={(e) =>
            //   dispatch(setCreatedTag({ id: el.id, content: e.target.value }))
            // }
          />
          <Button 
            className={style['delete-button']} 
            // onClick={(id) => console.log('delete el', id)}
            // onClick={(el.id) => deleteTag(el.id)}
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

  // const createTag = () => {
	// 	const id = uniqid()
	// 	const item = { id, content: '' }
	// 	dispatch(setCreatedTag(item))
	// 	// const newData = JSON.stringify([...articles.tags, item])
	// 	// localStorage.setItem('tags', newData)
	// }

	// const deleteTag = (id) => {
	// 	// dispatch(setDeletedTag(id))
	// 	const newData = JSON.stringify(
	// 		// [...articles.tags].filter((el) => el.id !== id)
	// 	)
	// 	// localStorage.setItem('tags', newData)
	// }

	// const tags = articles.tags.map((el, i) => {
	// 	return (
	// 		<div className='tags' key={el.id}>
	// 			<input
	// 				// className={classes['input-tag']}
	// 				onChange={(e) =>
	// 					// dispatch(setTagChange({ id: el.id, content: e.target.value }))
  //           console.log(e)
  //         }
	// 				placeholder='Tag'
	// 				// defaultValue={articles.tags[i].content}
	// 			/>
	// 			<button
	// 				type='button'
	// 				// className={
	// 					// articles.tags.length === 1
	// 						// ? `${classes['tag-button-delete']} ${classes['inactive']}`
	// 						// : classes['tag-button-delete']
	// 				// }
	// 				onClick={(e) =>
  //           console.log(e)
	// 					// e.target.className == classes['tag-button-delete']
	// 					// 	? deleteTag(el.id)
	// 					// 	: null
	// 				}
	// 			>
	// 				delete
	// 			</button>
	// 		</div>
	// 	)
	// })

	return (
    <>
    {/* {fromPage} */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={style['form']}
      >
      <p className={style['title']}>Create new article</p>
        <label className={style['wrapper']}>
          Title
          <input
            {...register("title", {
              required: "Title field can't be blank",
              // pattern: {
              //   value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
              //   message: "Email is not valid"
              // }
            })}
            className={style['input']} placeholder="Title"
            style={{border: errors.title ? '1px solid red' : '' }}
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
          />
        </label>
        <div>
          {errors.description && <p className={style['error']}>{errors.description.message}</p>}
        </div>

        <label className={style['wrapper']}>
          Text
          <textarea 
            {...register("text", {
              required: "Text field can't be blank"
            })}
            rows={11}
            className={style['input']} placeholder="Text"
            style={{border: errors.text ? '1px solid red' : '' }}
          ></textarea >
        </label>
        <div>
          {errors.text && <p className={style['error']}>{errors.text.message}</p>}
        </div>

        <label className={style['wrapper']}>
          Tags
        </label>
        <ul className={style['tag-wrapper']}>
          {tags}
            
         <li className={style['tag']}>
          <input className={style['tags-input']} 
            value={value} 
            onChange={onChange}
            {...register("tag", {
              required: "At least one tag is required"
            })}
          />
          <Button 
            className={style['delete-button']} 
            onClick={() => console.log('delete')}
            >Delete</Button>
          <Button 
            className={style['add-button']} 
             onClick={() => addTag(value)}
            >Add Tag</Button>
         </li>
         <div>
          {errors.tag && <p className={style['error']}>{errors.tag.message}</p>}
          </div>
        {/* {storeTags.map((item, index) => (
          <li key={item.id} className={style['tagwrapper']}>
            <input
              // {...register(`${name}.${index}.tagName`, { required })}
              // className={errors[name]?.[index]?.tagName && styles.inputError}
              className={style['tags-input']}
            />
            <div className={style['buttonwrapper']}>
              <Button 
                // className={styles.button} 
                className={style['delete-button']} 
                ghost danger 
                // onClick={() => remove(index)}
                >
                Delete
              </Button>
              {/* {storeTags.length - 1 === index && (
                <Button 
                  // className={styles.button} 
                  className={style['add-button']} 
                  ghost type="primary" 
                  // onClick={() => append({})}
                  >
                  Add tag
                </Button>
              // )} */}
            {/* </div> */}
          {/* </li> */}
        {/* ))} */}
        </ul>

          {/* <textarea 
            {...register("text", {
              // required: "Password field can't be blank"
            })}
            className={style['input']} placeholder="Text"
            style={{border: errors.text ? '1px solid red' : '' }}
          ></textarea > */}
        {/* <div>
          {errors.description && <p className={style['error']}>{errors.password.message}</p>}
        </div> */}

        <button className={style['button']}
          type="submit"
          disabled={!isValid}
        >
          Send
        </button>

      {/* {error!==null && <Alert className={'error'} message={error} type="error" showIcon />} */}

      </form>
    </>
	);
}

export default SignIn;
