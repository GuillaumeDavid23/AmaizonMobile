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
			console.log(data);
			console.log(state.auth.data.agent.customers[index])
			state.auth.data.agent.customers[index] = data
		},
		addContact: (state, action) => {
			state.auth.data.agent.customers.push(action.payload)
		},
	},
})

// Action creators are generated for each case reducer function
export const { setData, setAuth, setContact, addContact } = userSlice.actions

export default userSlice.reducer
