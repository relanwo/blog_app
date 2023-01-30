/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

export const postUser = createAsyncThunk(
	'user/postUser',
	async function (arr, { rejectWithValue, dispatch }) {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      // body: JSON.stringify(arr),
      body: JSON.stringify({ user: arr }),
    });
    console.log('response', response)
    const data = await response.json();
    console.log('data', data)
    // relanwo@gmail.com
    // try {

      if (response.status === 422) {
				// throw new Error("Can't create a user. Server Error");
        // return rejectWithValue(data);
        return rejectWithValue(JSON.stringify(data));
			}
      // if (response.status === 422) {
      //   // const errors = await response.json();
      //   // console.log('response.body', await response.json())
      //   throw new Error(JSON.stringify(data))
      // }
			// eslint-disable-next-line no-unreachable
			// if (!response.ok) {
			// 	throw new Error("Can't create a user. Server Error");
			// }
			// console.log('data', data)

			// if (!localStorage.getItem('token')) localStorage.setItem('token', data.user.token)
			// dispatch(setUser(data.user))
			return data;
		// } catch (error) {
      // let errString = ''
      // for (let key in error.errors) {
      //   errString += `${key} ${error[key]}`
      // }
      // for(let key in error) {
      //   console.log(key + ":", objA[key]);
      // }
      // console.log('errString', errString)
		// 	console.log('error.message', error.message);
		// 	// return rejectWithValue(errString);
		// 	return rejectWithValue(error.message);
		// }
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async function (arr, { rejectWithValue, dispatch }) {
		// try {
			const response = await fetch('https://blog.kata.academy/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				// body: JSON.stringify(arr),
				body: JSON.stringify({ user: arr }),
			});
      console.log('response', response)
  //     // console.log('token', response.body.user.token)
			if (response.status === 403) {
				// throw new Error("Can't create a user. Server Error");
        return rejectWithValue('You put wrong data');
			}
      if (response.status === 422) {
				// throw new Error("Can't create a user. Server Error");
        return rejectWithValue('Some server error. Please, try again.');
			}
			const data = await response.json();
			console.log('data', data)

			// if (!localStorage.getItem('user')) localStorage.setItem('user',  JSON.stringify(data.user))
			if (!localStorage.getItem('token')) localStorage.setItem('token', data.user.token)
			dispatch(setUser(data.user))
			return data;
		// } catch (error) {
			// console.log('error.message', error.message);
			// return rejectWithValue(error.message);
		// }
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async function (arr, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch('https://blog.kata.academy/api/user', {
				method: 'PUT',
				headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				// body: JSON.stringify(arr),
				body: JSON.stringify({ user: arr }),
			});
      console.log('response', response)
  //     // console.log('token', response.body.user.token)
			if (!response.ok) {
				throw new Error("Can't update user info. Server Error");
			}
			const data = await response.json();
			console.log('data', data)
			dispatch(setUser(data.user))
			return data;
		} catch (error) {
			console.log('error.message', error.message);
			return rejectWithValue(error.message);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
    isAuth: false,
		email: null,
		username: null,
		bio: null,
		image: null,
		token: null,

    status: null,
    error: null
	},
	reducers: {
		setUser(state, action) {
			// console.log('userSlice STATE >', current(state));
			// console.log('action', action.payload)
			// console.log('userSlice state', state)
			console.log('setUser ACTION', action)
			state.isAuth = true;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.bio = action.payload.bio;
			state.image = action.payload.image;
			state.token = action.payload.token;

      state.status = null;
			state.error = null;
			// state.id = action.payload.id
			console.log('setUser STATE >', current(state));
		},
		logOut(state, action) {
      console.log('logOut ACTION', action)
      state.isAuth = false;
			state.email = null;
			state.username = null;
			state.bio = null;
			state.image = null;
			state.token = null;

      state.status = null;
			state.error = null;
      console.log('logOut STATE >', current(state));
		},
		// changePage(state, action) {
		//   // console.log('paginationSlice STATE >',state);
		//   console.log('paginationSlice ACTION >',action)

		//   state.page = action.payload
		// }
	},
	extraReducers: {
		[postUser.pending]: (state, action) => {
			console.log('postUser.pending');
			// console.log('postUser.pending ACTION', action)
			state.status = 'loading';
			// state.error = null;
		},
		[postUser.fulfilled]: (state, action) => {
			console.log('postUser.fulfilled');
			// console.log('postUser.fulfilled action', action)
			state.status = 'resolved';
			// state.articles = action.payload;
		},
		[postUser.rejected]: (state, action) => {
			console.log('postUser.rejected');
			console.log('postUser.rejected ACTION.payload', action.payload)
      state.status = 'rejected';
      
      function errorTransformer(error) {
        let errString = ''
        for (let i in error) {
          const nerror = error[i]
          // errString += `${i} ${error[i]}.`
          for (let j in nerror) {
            errString += `${j} ${nerror[j]}. `
          }
        }
        return errString
      }
      state.error = errorTransformer(JSON.parse(action.payload));
			// state.status = false;
		},
	},
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;

// email
// : 
// "bjbijnk@ghjuu.oop"
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Q1ODgxNmY4YmVlMWIwMDU1MTA5MiIsInVzZXJuYW1lIjoiYmpiaWpuayIsImV4cCI6MTY3OTU4NTkyMiwiaWF0IjoxNjc0NDAxOTIyfQ.XMkvCLH3GeH1YLYxfcfLhz36XdNlNOeaoRP4dxnJrzE"
// username
// : 
// "bjbijnk"


// email
// : 
// "vsvsvsf@fghj.opopipoi"
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Q1OGRkNmY4YmVlMWIwMDU1MTA5MyIsInVzZXJuYW1lIjoidnN2c3ZzZiIsImV4cCI6MTY3OTU4NjAxMywiaWF0IjoxNjc0NDAyMDEzfQ.APK7VZrMKscbsK-0fJQW0VcIEIIjPLnV75WQ50pOFjM"
// username
// : 
// "vsvsvsf"