export const loginUser = createAsyncThunk(
	'user/postUser',
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