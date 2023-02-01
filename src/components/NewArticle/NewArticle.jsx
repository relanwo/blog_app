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
import {setCreatedTag, deleteChosenTag, clearArticle, postNewArticle, setTagChange, getArticleData, clearTagsList, changeChosenTag} from '../../store/article-slice'
import storage from 'redux-persist/lib/storage';

function NewArticle({articleData}) {
  const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const editOrNewParam = location.pathname
  // useEffect(() => {
  //   if (editOrNewParam !== '/new-article') {
  //     dispatch(getArticleData(editOrNewParam.slice(10, -5)))
  //   }
  // }, [dispatch, editOrNewParam])

  // const article = useSelector((state) => {
	// 	if (state.articles.article) {
	// 		const { article } = state.articles.article;
	// 		return article;
	// 	} else {
	// 		return [];
	// 	}
	// });
  // console.log('article.tagList',article.tagList)
  // console.log('editOrNewParam', editOrNewParam)

  const storeTags = useSelector((state) => state.articles.tagList)

  const [value, setValue] = useState('');

  // const onChange = (event) => setValue(event.target.value);
  const onChange = (field, event) => sessionStorage.setItem(field, event.target.value)
  // const onChange = (field, event) => sessionStorage.setItem(field, sessionStorage.getItem(...field, event.target.value))

  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    watch, 
    reset, //очистит поля ввода после отправки
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange"
   });

  // const onSubmit = data => {
  //   console.log('submit')
  //   if (storeTags !== []) {
  //     data.tagList = storeTags.map((el) => {
  //       return el.content
  //     }) 
  //   } else {
  //     data.tagList = []
  //   }
  //   // const {rep_password, ...clearData} = data
  //   console.log('data',data)
  //   dispatch(postNewArticle(data));
  //   dispatch(clearTagsList())
  //   sessionStorage.clear()
  //   // if (data) navigate('/')
  //   // isAuth && navigate(fromPage)
  //   // navigate(a)
  //   // alert(JSON.stringify(data))
  //   // reset()
  //   navigate('/', {replace: true})
  // };
  const onSubmit = async (data) => {
    data.tagList = JSON.parse(sessionStorage.getItem("tagList"))
    // data.taglist =  JSON.parse(data.taglist)
    // data.taglist.map((item) => {
    //   if (item.match(/("|,|\n)/)) {
    //     item = item.replace(/"/g, '""')
    //     item = `"${item}"`
    //   }
    //   return item;
    // })
      // el.replace("'","\""))
    console.log('data',data)
    await dispatch(postNewArticle(data)).then(() => {
			// if (!sessionStorage.getItem('tagList')) {
				navigate('/articles')
				dispatch(clearTagsList())
				dispatch(clearArticle())
        
			// }
		})
  };

  // const addTag = (value) => {
  //   // const id = uniqid()
  //   // const item = { id, content: value }
  //   // dispatch(setCreatedTag(item))
  //   dispatch(setCreatedTag(value))
  //   setValue('')
  // }
  // const deleteTag = (id) => dispatch(deleteChosenTag(id))
	// // 	const newData = JSON.stringify(
	// // 		// [...articles.tags].filter((el) => el.id !== id)
	// // 	)
	// // 	// localStorage.setItem('tags', newData)
	// // }
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

  // let tags
  // // if (storeTags !== undefined) {
  //   tags = storeTags.map((el, i) => {
  //     //   return ()
  //     // if (storeTags.length >= 0) {
  //       return (
  //         <div className={style['tag']} key={el.id}>
  //           <input 
  //             className={style['tags-input']} 
  //             placeholder='Tag'
  //             defaultValue={el.content} 
  //             // value={value} 
  //             // onChange={onChange}
  //             onChange={(e) =>
  //               dispatch(setCreatedTag({ id: el.id, content: e.target.value }))
  //             }
  //           />
  //           <Button 
  //             // className={style['delete-button']} 
  //             // onClick={() => deleteTag(el.id)}
  //             className={
  //               storeTags.length === 1
  //                 ? `${style['delete-button']} ${style['inactive']}`
  //                 : style['delete-button']
  //             }
  //             onClick={(e) =>
  //               e.target.className === style['delete-button']
  //                 ? deleteTag(el.id)
  //                 : null
  //             }
  //           >
  //             Delete
  //           </Button>
  //           {/* <Button 
  //             className={style['add-button']} 
  //             onClick={() => addTag(value)}
  //             >Add Tag</Button> */}
  //        </div>
  //       );
  //     // }
  //   })
  // // }

  const handleTagAdd = (index) => {
    dispatch(setCreatedTag(''))
    // console.log('handleTagAdd index',index)
    // sessionStorage.setItem(`tag ${index}`,)
  }

  const handleTagRemove = (index) => {
    // console.log('handleTagRemove index',index)
    dispatch(deleteChosenTag(index))
  }

  const handleInputChange = (e, index) => {
    // const {name, value} = e.target
    // storeTags[index] = value
    // storeTags[index][name]
    const params = [index, e.target.value]
    dispatch(changeChosenTag(params))
    // sessionStorage.setItem(`tags`, [...sessionStorage.getItem(`tags`), e.target.value])
    // data.tags.push(e.target.value)
    let newData
    if (storeTags) {
      newData = JSON.stringify([...storeTags])
    } else {
      newData = JSON.parse(sessionStorage.getItem("tagList"))
    }
    console.log('NEW DATA', newData)
		sessionStorage.setItem('tagList', newData)
  }

  console.log('articleData', articleData)
  if (articleData) {
    sessionStorage.setItem("title", articleData.title)
    sessionStorage.setItem("description", articleData.description)
    sessionStorage.setItem("body", articleData.body)
    articleData.tagList !== [] 
      && sessionStorage.setItem("tagList", JSON.stringify(articleData.tagList))
      // : [""]
  }
  // let arrayOfTags
  // articleData ? arrayOfTags=articleData.tagList : arrayOfTags=storeTags
  // console.log('arrayOfTags', arrayOfTags)
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
              // defaultValue: articleData && sessionStorage.getItem("title")
            })}
            className={style['input']} placeholder="Title"
            style={{border: errors.title ? '1px solid red' : '' }}
            // value={editOrNewParam !== '/new-article' && article.title !==undefined ? article.title : sessionStorage.getItem("title")}
            onChange={(e) => onChange("title", e)}
            // value={articleData && sessionStorage.getItem("title")}
            defaultValue={articleData ? sessionStorage.getItem("title") : ''}
            // value={rticleData.title}
            // onChange={onChange}
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
            // value={editOrNewParam !== '/new-article' && article.description ? article.description : sessionStorage.getItem("description")}
            // value={sessionStorage.getItem("description")}
            onChange={(e) => onChange("description", e)}
            // value={articleData && articleData.description}
            // value={articleData && sessionStorage.getItem("description")}
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
            // value={articleData && articleData.body}
            // value={articleData && sessionStorage.getItem("body")}
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
          // {...register("tags", {
          //   required: "At least one tag is required"
          // })}
          >
          {(articleData.tagList ? JSON.parse(sessionStorage.getItem("tagList")) : storeTags).map((singleService, index) => {
            // tags.push(singleService)
            return (
            <li className={style['tag']} key={index}>
              <input 
                className={style['tags-input']} 
                placeholder='Tag'
                value={storeTags && singleService}
                defaultValue={articleData && singleService}
                // onChange={(e) => onChange(index, e)}
                onChange={(e) => handleInputChange(e, index)}
                // className={
                //   (index === 0) 
                //     ? {(storeTags.length === 1)
                //         ? style['tags-input']
                //         : `${style['tags-input']} ${style['input-disable']}`
                //       }
                //     : style['tags-input']
                // }
                // className={
                //   (index === 0 && value!=='') 
                //     // ? style['tags-input']
                //     ? `${style['tags-input']} ${style['input-disable']}`
                //     : style['tags-input']
                // }
                // defaultValue={el.content} 
                // value={value} 
                // onChange={onChange}
                // onChange={(e) =>
                //   dispatch(setCreatedTag({ id: el.id, content: e.target.value }))
                // }
                // value={editOrNewParam !== '/new-article' ? storeTags[i] : sessionStorage.getItem("tag")}
                // onChange={(e) => onChange("tag", e)}
              />
              {(articleData.tagList ? JSON.parse(sessionStorage.getItem("tagList")) : storeTags).length > 1 &&
                <Button 
                  className={style['delete-button']} 
                  // onClick={() => deleteTag(el.id)}
                  // className={
                  //   storeTags.length === 1
                  //     ? `${style['delete-button']} ${style['inactive']}`
                  //     : style['delete-button']
                  // }
                  // onClick={(e) =>
                  //   e.target.className === style['delete-button']
                  //     // ? deleteTag(el.id)
                  //     // : null
                  // }
                  onClick={() => handleTagRemove(index)}
                >
                  Delete
                </Button>
              }

              {(articleData.tagList ? JSON.parse(sessionStorage.getItem("tagList")) : storeTags).length - 1 === index &&
                <Button 
                  className={style['add-button']} 
                  // onClick={(value) => addTag(value)}
                  onClick={() => handleTagAdd(index)}
                >
                  Add Tag
                </Button>
              }
            </li>
          )})}

          {/* {tags} */}
          {/* {editOrNewParam !== '/new-article'
            ? mapTags(article.tagList)
            : mapTags(storeTags)
          } */}
            
         {/* <li className={style['tag']}>
          <input className={style['tags-input']} 
            value={value} 
            onChange={onChange}
          />
          <Button 
            className={style['delete-button']} 
            // onClick={() => console.log('delete')}
            >Delete</Button> */}

          {/* {storeTags.map((el, i) => {
            return (
                <li className={style['tag']} key={el.id}>
                  <input 
                    className={style['tags-input']} 
                    placeholder='Tag'
                    defaultValue={el.content} 
                    // value={value} 
                    // onChange={onChange}
                    // onChange={(e) =>
                    //   dispatch(setCreatedTag({ id: el.id, content: e.target.value }))
                    // }
                    value={editOrNewParam !== '/new-article' ? storeTags[i] : sessionStorage.getItem("tag")}
                    onChange={(e) => onChange("tag", e)}
                  />

                  <Button 
                    // className={style['delete-button']} 
                    // onClick={() => deleteTag(el.id)}
                    className={
                      storeTags.length === 1
                        ? `${style['delete-button']} ${style['inactive']}`
                        : style['delete-button']
                    }
                    onClick={(e) =>
                      e.target.className === style['delete-button']
                        ? deleteTag(el.id)
                        : null
                    }
                  >
                    Delete
                  </Button>

                  <Button 
                    className={style['add-button']} 
                    onClick={(value) => addTag(value)}
                  >
                    Add Tag
                  </Button>
                </li>
            );
          })}
          { storeTags.length === 0 && (
            <li className={style['tag']} key={uniqid()}>
            <input 
              className={style['tags-input']} 
              placeholder='Tag'
              // defaultValue={el.content} 
              // value={value} 
              // onChange={onChange}
              // onChange={(e) =>
              //   dispatch(setCreatedTag({ id: uniqid(), content: e.target.value }))
              // }
              value={editOrNewParam !== '/new-article' ? storeTags : sessionStorage.getItem("tag")}
              onChange={(e) => onChange(`tag`, e)}
            />
            <Button 
              className={style['add-button']} 
              onClick={() => addTag(sessionStorage.getItem("tag"))}
            >
              Add Tag
            </Button>
          </li> 
          )} */}
         <div>
          {errors.tag && <p className={style['error']}>{errors.tag.message}</p>}
          </div>
        </ul>

        <button 
          // className={style['button']}
          type="submit"
          // disabled={!isValid}
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
