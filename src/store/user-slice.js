import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postUser = createAsyncThunk(
	'user/postUser',
	async function (arr, { rejectWithValue, dispatch }) {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: arr }),
    });
    const data = await response.json();
    if (response.status === 422) {
      return rejectWithValue(JSON.stringify(data));
    }
    return data;
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async function (arr, { rejectWithValue, dispatch }) {
			const response = await fetch('https://blog.kata.academy/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ user: arr }),
			});
      console.log('response', response)
			if (response.status === 403) {
        return rejectWithValue('You put wrong data');
			}
      if (response.status === 422) {
        return rejectWithValue('Some server error. Please, try again.');
			}
			const data = await response.json();
			console.log('data', data)

			if (!localStorage.getItem('token')) localStorage.setItem('token', data.user.token)
			dispatch(setUser(data.user))
			return data;
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
				body: JSON.stringify({ user: arr }),
			});
			if (!response.ok) {
				throw new Error("Can't update user info. Server Error");
			}
			const data = await response.json();
			dispatch(setUser(data.user))
			return data;
		} catch (error) {
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
			state.isAuth = true;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.bio = action.payload.bio;
			state.image = action.payload.image;
			state.token = action.payload.token;
      state.status = null;
			state.error = null;
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
		},
	},
	extraReducers: {
		[postUser.pending]: (state, action) => {
			state.status = 'loading';
		},
		[postUser.fulfilled]: (state, action) => {
			state.status = 'resolved';
		},
		[postUser.rejected]: (state, action) => {
      state.status = 'rejected';

      function errorTransformer(error) {
        let errString = ''
        for (let i in error) {
          const nerror = error[i]
          for (let j in nerror) {
            errString += `${j} ${nerror[j]}. `
          }
        }
        return errString
      }
      state.error = errorTransformer(JSON.parse(action.payload));
		},
	},
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
