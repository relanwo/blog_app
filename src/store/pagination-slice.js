/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchArticles = createAsyncThunk(
//   'articles/fetchArticles',
//   async function() {
//     const response = await fetch('https://blog.kata.academy/api/articles');
//     const data = response.json();
//     return data;
//   }
// )

const paginationSlice = createSlice({
  name: 'pagination', 
  initialState: {
    page: 1,
    pageSize: 5
  },
  reducers: {
    changePage(state, action) {
      // console.log('paginationSlice STATE >',state);
      console.log('paginationSlice ACTION >',action)

      state.page = action.payload
    }
  },
  // extraReducers: {
  //   [fetchArticles.pending]: (state, action) => {
  //     console.log('fetchArticles.pending')
  //     state.status = 'loading';
  //     state.error = null;
  //   },
  //   [fetchArticles.fulfilled]: (state, action) => {
  //     console.log('fetchArticles.fulfilled')
  //     state.status = 'resolved';
  //     state.articles = action.payload;
  //   },
  //   [fetchArticles.rejected]: (state, action) => {
  //     console.log('fetchArticles.rejected')

  //     state.status = false;
  //   },
  // }
})

export const { changePage } = paginationSlice.actions;

export default paginationSlice.reducer;