import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function(arr, {rejectWithValue}) {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?offset=${(arr[0]-1)*arr[1]}`);
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = response.json();
      // console.log('state', state)
      return data;
    } catch (error) {
      console.log('error.message', error.message)
      return rejectWithValue(error.message)
    }
  }
)

const articleSlice = createSlice({
  name: 'articles', 
  initialState: {
    articles: [],
    status: null,
    error: null,
    page: 1,
    pageSize: 20,
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
      console.log('changePage ACTION >',action)

      state.page = action.payload
    },
    // changeSlug(state, action) {
    //   console.log('changeSlug ACTION >',action)

    //   state.chosenSlug = action.payload
    // }
  },
  extraReducers: {
    [fetchArticles.pending]: (state, action) => {
      console.log('fetchArticles.pending')
      // console.log('ACTION', action)
      state.status = 'loading';
      // state.articles = []
    },
    [fetchArticles.fulfilled]: (state, action) => {
      console.log('fetchArticles.fulfilled')
      console.log('ACTION', action)
      state.status = 'resolved';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: (state, action) => {
      console.log('fetchArticles.rejected')
      console.log('ACTION', action)

      state.status = 'rejected';
      state.error = action.payload;
      // state.articles = []
    },
  }
})

export const { changePage, changeSlug } = articleSlice.actions;

export default articleSlice.reducer;