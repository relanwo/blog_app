import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function() {
    const response = await fetch('https://blog.kata.academy/api/articles?offset='); //offset - это перепрыг на pagesize. то есть равен pagesize*page
    const data = response.json();
    // console.log('state', state)
    return data;
  }
)

const articleSlice = createSlice({
  name: 'articles', 
  initialState: {
    articles: [],
    status: null,
    error: null
  },
  reducers: {
    getArticles(state, action) {
      console.log('articleSlice STATE >',state);
      console.log('articleSlice ACTION >',action)

      // state.articles.push(action.payload)
    }
  },
  extraReducers: {
    [fetchArticles.pending]: (state, action) => {
      console.log('fetchArticles.pending')
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      console.log('fetchArticles.fulfilled')
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: (state, action) => {
      console.log('fetchArticles.rejected')

      state.status = false;
    },
  }
})

export const { getArticles } = articleSlice.actions;

export default articleSlice.reducer;