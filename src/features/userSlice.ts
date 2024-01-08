import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../types/user";

const initialState: InitialUserState = {
	userAuth: false,
	userName: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.userAuth = true;
			state.userName = action.payload.name;
			localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userAuth', 'true');
		},
		logout: (state) => {
			state.userAuth = false;
			state.userName = null;
			localStorage.removeItem('userName');
			localStorage.removeItem('userAuth');
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
