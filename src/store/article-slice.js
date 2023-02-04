import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (arr, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?offset=${(arr[0] - 1) * arr[1]}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const postNewArticle = createAsyncThunk(
  'user/postNewArticle',
  async (arr, { rejectWithValue, dispatch }) => {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ article: arr }),
    });
    if (response.status === 403) {
      return rejectWithValue('You put wrong data');
    }
    if (response.status === 422) {
      return rejectWithValue('Some server error. Please, try again.');
    }
    const data = await response.json();
    if (!localStorage.getItem('token')) localStorage.setItem('token', data.user.token);
    return data;
  },
);

export const editArticle = createAsyncThunk(
  'user/postNewArticle',
  async (arr, { rejectWithValue, dispatch }) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${arr[0]}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ article: arr[1] }),
    });
    if (response.status === 403) {
      return rejectWithValue('You put wrong data');
    }
    if (response.status === 422) {
      return rejectWithValue('Some server error. Please, try again.');
    }
    const data = await response.json();
    if (!localStorage.getItem('token')) localStorage.setItem('token', data.user.token);
    return data;
  },
);

export const deleteArticle = createAsyncThunk(
  'user/deleteArticle',
  async (slug, { rejectWithValue, dispatch }) => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 401) {
      return rejectWithValue('Unauthorized');
    }
    if (response.status === 422) {
      return rejectWithValue('Some server error. Please, try again.');
    }
    const data = await response.json();
    return data;
  },
);

export const getArticleData = createAsyncThunk(
  'user/getArticleData',
  async (slug, { rejectWithValue, dispatch }) => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        method: 'GET',
      },
    );
    if (response.status === 422) {
      return rejectWithValue('Some server error. Please, try again.');
    }
    const data = await response.json();
    return data;
  },
);

export const deleteLike = createAsyncThunk(
  'user/deleteLike',
  async (slug, { rejectWithValue, dispatch }) => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 422) {
      return rejectWithValue('Some server error. Please, try again.');
    }
    if (response.status === 401) {
      return rejectWithValue('Unauthorized.');
    }
    const data = await response.json();
    return data;
  },
);
export const postLike = createAsyncThunk(
  'user/postLike',
  async (slug, { rejectWithValue, dispatch }) => {
    const response = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 422) {
      return rejectWithValue('Some server error. Please, try again.');
    }
    if (response.status === 401) {
      return rejectWithValue('Unauthorized.');
    }
    const data = await response.json();
    return data;
  },
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
    changePage(state, action) {
      state.page = action.payload;
    },
    setCreatedTag(state, action) {
      state.article.tagList.push(action.payload);
    },
    deleteChosenTag(state, action) {
      state.article.tagList = state.article.tagList.filter((el, i) => i !== action.payload);
    },
    changeChosenTag(state, action) {
      const ind = state.article.tagList.findIndex((el) => el.id === action.payload[0]);
      state.article.tagList.splice(ind, 1, action.payload[1]);
    },
    clearArticle(state, action) {
      state.article = [];
    },
    clearTagsList(state, action) {
      state.tagList = [''];
    },
  },
  extraReducers: {
    [postNewArticle.pending]: (state, action) => {
      state.status = 'loading';
    },
    [postNewArticle.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.article = action.payload;
    },
    [postNewArticle.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchArticles.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles = action.payload;
      sessionStorage.setItem('articles', JSON.stringify(action.payload));
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [getArticleData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.article = action.payload.article;
    },
    [deleteLike.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles.articles = state.articles.articles.map((el) => {
        if (el.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return el;
      });
    },
    [postLike.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.articles.articles = state.articles.articles.map((el) => {
        if (el.slug === action.payload.article.slug) {
          return action.payload.article;
        }
        return el;
      });
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
