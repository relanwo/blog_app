/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
	'articles/fetchArticles',
	async function (arr, { rejectWithValue }) {
		try {
			const response = await fetch(
				`https://blog.kata.academy/api/articles?offset=${(arr[0] - 1) * arr[1]}`
			);
			if (!response.ok) {
				throw new Error('Server Error');
			}
			const data = response.json();
			// console.log('state', state)
			return data;
		} catch (error) {
			console.log('error.message', error.message);
			return rejectWithValue(error.message);
		}
	}
);

export const postNewArticle = createAsyncThunk(
	'user/postNewArticle',
	async function (arr, { rejectWithValue, dispatch }) {
		const response = await fetch('https://blog.kata.academy/api/articles', {
			method: 'POST',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ article: arr }),
		});
		console.log('response', response);
		if (response.status === 403) {
			return rejectWithValue('You put wrong data');
		}
		if (response.status === 422) {
			return rejectWithValue('Some server error. Please, try again.');
		}
		const data = await response.json();
		console.log('data', data);
		if (!localStorage.getItem('token'))
			localStorage.setItem('token', data.user.token);
		// dispatch(setUser(data.user))
		return data;
	}
);

export const deleteArticle = createAsyncThunk(
	'user/deleteArticle',
	async function (slug, { rejectWithValue, dispatch }) {
		const response = await fetch(
			`https://blog.kata.academy/api/articles/${slug}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				// body: JSON.stringify({ article: arr }),
			}
		);
		console.log('response', response);
		if (response.status === 401) {
			return rejectWithValue('Unauthorized');
		}
		if (response.status === 422) {
			return rejectWithValue('Some server error. Please, try again.');
		}
		const data = await response.json();
		console.log('data', data);
		// dispatch(setUser(data.user))
		return data;
	}
);

export const getArticleData = createAsyncThunk(
	'user/getArticleData',
	async function (slug, { rejectWithValue, dispatch }) {
		const response = await fetch(
			`https://blog.kata.academy/api/articles/${slug}`,
			{
				method: 'GET',
				// headers: {
				// 	Authorization: `Token ${localStorage.getItem('token')}`,
				// 	'Content-Type': 'application/json;charset=utf-8',
				// },
				// body: JSON.stringify({ article: arr }),
			}
		);
		console.log('response', response);
		if (response.status === 422) {
			return rejectWithValue('Some server error. Please, try again.');
		}
		const data = await response.json();
		console.log('data', data);
		// dispatch(setUser(data.user))
		return data;
	}
);

export const deleteLike = createAsyncThunk(
	'user/deleteLike',
	async function (slug, { rejectWithValue, dispatch }) {
		const response = await fetch(
			`https://blog.kata.academy/api/articles/${slug}/favorite`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				// body: JSON.stringify({ article: arr }),
			}
		);
		console.log('response', response);
		if (response.status === 422) {
			return rejectWithValue('Some server error. Please, try again.');
		}
		if (response.status === 401) {
			return rejectWithValue('Unauthorized.');
		}
		const data = await response.json();
		console.log('data', data);
		// dispatch(setUser(data.user))
		return data;
	}
);
export const postLike = createAsyncThunk(
	'user/postLike',
	async function (slug, { rejectWithValue, dispatch }) {
		const response = await fetch(
			`https://blog.kata.academy/api/articles/${slug}/favorite`,
			{
				method: 'POST',
				headers: {
					Authorization: `Token ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				// body: JSON.stringify({ article: arr }),
			}
		);
		console.log('response', response);
		if (response.status === 422) {
			return rejectWithValue('Some server error. Please, try again.');
		}
		if (response.status === 401) {
			return rejectWithValue('Unauthorized.');
		}
		const data = await response.json();
		console.log('data', data);
		// dispatch(setUser(data.user))
		return data;
	}
);

const articleSlice = createSlice({
	name: 'articles',
	initialState: {
		articles: [],
		status: null,
		error: null,
		page: 1,
		pageSize: 20,
		tagList: [''],

		article: null,
	},
	reducers: {
		// getArticles(state, action) {
		//   console.log('articleSlice STATE >',state);
		//   console.log('articleSlice ACTION >',action)

		//   //
		//   state.articles.push(action.payload)
		// },
		changePage(state, action) {
			// console.log('paginationSlice STATE >',state);
			console.log('changePage ACTION >', action);

			state.page = action.payload;
		},
		setCreatedTag(state, action) {
			console.log('setCreatedTag ACTION >', action);

			state.article.tagList.push(action.payload);
			// state.tagList.push(action.payload);
		},
		deleteChosenTag(state, action) {
			console.log('deleteChosenTag ACTION >', action);

			state.article.tagList = state.article.tagList.filter((el, i) => i !== action.payload);
			// state.tagList = state.tagList.filter((el, i) => i !== action.payload);

			console.log('tagList', state.tagList);
		},
		changeChosenTag(state, action) {
			console.log('changeChosenTag ACTION >', action.payload);

			// const ind = state.tagList.findIndex((el) => el.id === action.payload[0]);
			// state.tagList.splice(ind, 1, action.payload[1]);
      const ind = state.article.tagList.findIndex((el) => el.id === action.payload[0]);
			state.article.tagList.splice(ind, 1, action.payload[1]);

			console.log('tagList', state.tagList);
		},
    clearArticle(state, action) {
			// console.log('paginationSlice STATE >',state);
			console.log('deleteChosenTag ACTION >', action);

			state.article = [];
		},
		clearTagsList(state, action) {
			// console.log('paginationSlice STATE >',state);
			console.log('deleteChosenTag ACTION >', action);

			state.tagList = [''];
		},
	},
	extraReducers: {
		[postNewArticle.pending]: (state, action) => {
			console.log('postNewArticle.pending');
			state.status = 'loading';
		},
		[postNewArticle.fulfilled]: (state, action) => {
			console.log('postNewArticle.fulfilled');
			state.status = 'resolved';
			state.article = action.payload;
		},
		[postNewArticle.rejected]: (state, action) => {
			console.log('postNewArticle.rejected');

			state.status = 'rejected';
			state.error = action.payload;
		},
		[fetchArticles.pending]: (state, action) => {
			console.log('fetchArticles.pending');
			state.status = 'loading';
			// state.articles = []
		},
		[fetchArticles.fulfilled]: (state, action) => {
			console.log('fetchArticles.fulfilled');
			state.status = 'resolved';
			state.articles = action.payload;
		},
		[fetchArticles.rejected]: (state, action) => {
			console.log('fetchArticles.rejected');

			state.status = 'rejected';
			state.error = action.payload;
			// state.articles = []
		},
		[getArticleData.fulfilled]: (state, action) => {
			console.log('fetchArticles.fulfilled');
			state.status = 'resolved';
			state.article = action.payload.article;
		},


		[deleteLike.fulfilled]: (state, action) => {
			console.log('deleteLike.fulfilled');
			console.log('deleteLike ACTION', action);
			state.status = 'resolved';
			state.article = action.payload.article;
			// state.article.favorited = action.payload.article.favorited;
			console.log('state.article', state.article);
		},
		[postLike.fulfilled]: (state, action) => {
			console.log('postLike.fulfilled');
			console.log('postLike ACTION', action);
			state.status = 'resolved';
			state.articles = state.articles.map((el) => {
				if (el.slug === action.payload.article.slug) {
					return action.payload.article;
				}
				return el;
			});
			// state.article = action.payload.article;
			// state.article.favorited = true;
			// state.article.favorited = action.payload.article.favorited;
			console.log('state.article', state.article);
		},
	},
});

export const {
	changePage,
	changeSlug,
	setCreatedTag,
	deleteChosenTag,
	changeChosenTag,
  clearArticle,
	clearTagsList,
} = articleSlice.actions;

export default articleSlice.reducer;
