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
import {setCreatedTag, deleteChosenTag, postNewArticle, getArticleData, clearTagsList, changeChosenTag} from '../../store/article-slice'

function NewArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const articles = useSelector((state) => state.articles.articles)
  // const article = useSelector((state) => {
	// 	if (state.articles.article) {
	// 		const { article } = state.articles.article;
	// 		return article;
	// 	} else {
	// 		return [];
	// 	}
	// });

  // const storeTags = useSelector((state) => state.articles.tagList)

  const { 
    register, //для регистрации полей формы
    handleSubmit, // обёртка над нашим хэндлером отправки формы
    formState: { errors, isValid } // объект со всякими свойствами
   } = useForm({
    mode: "onChange"
   });

   useEffect(() => {
		if (!localStorage.getItem('tags')) {
			const id = uniqid()
			const item = { id, content: '' }
			dispatch(setCreatedTag(item))

			localStorage.setItem('tags', JSON.stringify([item]))
		} else {
			const tags = JSON.parse(localStorage.getItem('tags'))
			for (let i of tags) {
				dispatch(setCreatedTag(i))
			}
		}
	}, [dispatch])

  const onSubmit = async (data) => {
    console.log('data',data)
    await dispatch(postNewArticle(data)).then(() => {
			if (!localStorage.getItem('tags')) {
				navigate('/articles')
				dispatch(clearTagsList())
			}
		})
  };
	const createTag = () => {
		const id = uniqid()
		const item = { id, content: '' }
		dispatch(setCreatedTag(item))

		const newData = JSON.stringify([...articles.tagList, item])
		localStorage.setItem('tags', newData)
	}

	const deleteTag = (id) => {
		dispatch(deleteChosenTag(id))

		const newData = JSON.stringify(
			[...articles.tags].filter((el) => el.id !== id)
		)
		localStorage.setItem('tags', newData)
	}

  const tags = articles.tagList.map((el, i) => {
		return (
			<div className='tags' key={el.id}>
				<input
					// className={style['input-tag']}
					onChange={(e) =>
						dispatch(changeChosenTag({ id: el.id, content: e.target.value }))
					}
					placeholder='Tag'
				/>
				<button
					type='button'
					// className={
					// 	articles.tags.length === 1
					// 		? `${style['tag-button-delete']} ${style['inactive']}`
					// 		: style['tag-button-delete']
					// }
					onClick={(e) =>
						e.target.className === style['tag-button-delete']
							? deleteTag(el.id)
							: null
					}
				>
					delete
				</button>
			</div>
		)
	})
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style['new-article']}>
			<h1 className={style['title']}>Create new article</h1>
			<label className={style['label']}>Title</label>
			<input
				className={
					!errors.title
						? style['input']
						: `${style['input']} ${style['error']}`
				}
				{...register('title', {
					required: 'Enter article title',
				})}
				placeholder='Title'
			/>

			{errors.title && (
				<div className={style['error-message']}>{errors.title.message}</div>
			)}

			<label className={style['label']}>Short description</label>
			<input
				className={
					!errors.description
						? style['input']
						: `${style['input']} ${style['error']}`
				}
				{...register('description', {
					required: 'Enter description',
				})}
				placeholder='Title'
			/>

			{errors.description && (
				<div className={style['error-message']}>
					{errors.description.message}
				</div>
			)}

			<label className={style['label']}>Text</label>

			<textarea
				className={
					!errors.text
						? style['input']
						: `${style['input']} ${style['error']}`
				}
				rows={11}
				{...register('body', {
					required: 'Enter text',
				})}
				placeholder='Text'
			/>

			{errors.text && (
				<div className={style['error-message']}>{errors.text.message}</div>
			)}
			<label className={style['label']}>Tags</label>
			<div className={style['tags-wrapper']}>
				{tags}
				<button
					type='button'
					className={style['tag-button-add']}
					onClick={createTag}
				>
					Add tag
				</button>
			</div>

			<button
				className={
					isValid
						? style['button']
						: `${style['button']} ${style['inactive']}`
				}
			>
				Send
			</button>
		</form>
	)
}
export default NewArticle