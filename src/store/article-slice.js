import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
	'user/postUser',
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

const articleSlice = createSlice({
	name: 'articles',
	initialState: {
		articles: [],
		status: null,
		error: null,
		page: 1,
		pageSize: 20,
		tagList: [],
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
			// console.log('paginationSlice STATE >',state);
			console.log('setCreatedTag ACTION >', action);

			state.tags.push(action.payload);
			// state.tags += action.payload
			// state.tags = action.payload
		},
		deleteTag(state, action) {
			// console.log('paginationSlice STATE >',state);
			console.log('setCreatedTag ACTION >', action);

			state.tags.filter((el) => el.id !== action.payload);
			// state.tags += action.payload
			// state.tags = action.payload
		},
		// changeSlug(state, action) {
		//   console.log('changeSlug ACTION >',action)

		//   state.chosenSlug = action.payload
		// }
	},
	extraReducers: {
		[postNewArticle.pending]: (state, action) => {
			console.log('fetchArticles.pending');
			// console.log('ACTION', action)
			state.status = 'loading';
			// state.articles = []
		},
		[postNewArticle.fulfilled]: (state, action) => {
			console.log('fetchArticles.fulfilled');
			console.log('ACTION', action);
			state.status = 'resolved';
			state.articles = action.payload;
		},
		[postNewArticle.rejected]: (state, action) => {
			console.log('fetchArticles.rejected');
			console.log('ACTION', action);

			state.status = 'rejected';
			state.error = action.payload;
			// state.articles = []
		},
		[fetchArticles.pending]: (state, action) => {
			console.log('fetchArticles.pending');
			// console.log('ACTION', action)
			state.status = 'loading';
			// state.articles = []
		},
		[fetchArticles.fulfilled]: (state, action) => {
			console.log('fetchArticles.fulfilled');
			console.log('ACTION', action);
			state.status = 'resolved';
			state.articles = action.payload;
		},
		[fetchArticles.rejected]: (state, action) => {
			console.log('fetchArticles.rejected');
			console.log('ACTION', action);

			state.status = 'rejected';
			state.error = action.payload;
			// state.articles = []
		},
	},
});

export const { changePage, changeSlug, setCreatedTag, deleteTag } =
	articleSlice.actions;

export default articleSlice.reducer;
