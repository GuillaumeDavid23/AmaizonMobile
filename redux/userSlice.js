import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	auth: {
		isLoggedIn: false,
		data: '',
		token: '',
	},
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.auth = action.payload
		},
		setData: (state, action) => {
			state.auth.data = action.payload
		},
		setContact: (state, action) => {
			const index = action.payload.index
			const data = action.payload.data
			state.auth.data.agent.customers[index] = data
		},
	},
})

// Action creators are generated for each case reducer function
export const { setData, setAuth, setContact } = userSlice.actions

export default userSlice.reducer
