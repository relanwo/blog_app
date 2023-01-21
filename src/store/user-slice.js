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

// export const postUser = createAsyncThunk(
//     'user/postUser',
//     async function([]) {
//       await fetch(
//         'https://blog.kata.academy/api/users',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//           },
//           body: JSON.stringify({ value: rate }),
//         }
//       )
//     }
// ) 



const userSlice = createSlice({
  name: 'user', 
  initialState: {
    username: null,
    email: null,
    password: null,
    id: null
    // page: 1,
    // pageSize: 5
  },
  reducers: {
    setUser(state, action) {
      console.log(state, action)
      state.username = action.payload.username
      state.email = action.payload.email
      state.password = action.payload.password

      // state.id = action.payload.id
    },
    removeUser(state, action) {
      state.username = null
      state.email = null
      state.password = null

      state.id = null
    },
    // changePage(state, action) {
    //   // console.log('paginationSlice STATE >',state);
    //   console.log('paginationSlice ACTION >',action)

    //   state.page = action.payload
    // }
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

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;