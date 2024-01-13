import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import wordReducer from "../features/wordSlice";

const rootReducer = combineReducers({
	user: userReducer,
	word: wordReducer,
})

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
