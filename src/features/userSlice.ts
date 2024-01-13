import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../types/user";

const initialState: InitialUserState = {
	userAuth: false,
	userId: null,
	userName: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.userAuth = true;
			state.userId = action.payload.id;
			state.userName = action.payload.name;
			sessionStorage.setItem('userId', action.payload.id);
			sessionStorage.setItem('userName', action.payload.name);
      sessionStorage.setItem('userAuth', 'true');
		},
		logout: (state) => {
			state.userAuth = false;
			state.userName = null;
			sessionStorage.removeItem('userName');
			sessionStorage.removeItem('userAuth');
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
