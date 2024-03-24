import { createSlice } from "@reduxjs/toolkit";
import { InitialUserState } from "../types/user";

const initialState: InitialUserState = {
	userAuth: false,
	userId: null,
	userName: null,
	message: "",
	dialogSetting: {
		open: false,
		vertical: "top",
		horizontal: "center",
		severity: "success",
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.userAuth = true;
			state.userId = action.payload.id;
			state.userName = action.payload.name;
			sessionStorage.setItem("userId", action.payload.id);
			sessionStorage.setItem("userName", action.payload.name);
			sessionStorage.setItem("userAuth", "true");
		},
		logout: (state) => {
			state.userAuth = false;
			state.userId = null;
			state.userName = null;
			sessionStorage.clear();
		},
		setMessage: (state, action) => {
			const { open, severity, message } = action.payload;

			state.dialogSetting.open = open;
			state.dialogSetting.severity = severity;
			state.message = message;
		},
	},
});

export const { login, logout, setMessage } = userSlice.actions;
export default userSlice.reducer;
