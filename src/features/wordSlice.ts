import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WordResponseApi } from "../types/word";
import { fetchWordAPI } from "../api/fetchWordAPI";

const initialState: WordResponseApi = {
	current_page: 1,
	data: [],
	last_page: 1,
	total: 0,
	memorySearch: '',
	sort: '',
};

export const fetchWords = createAsyncThunk(
	"word/fetchWords",
	async (params: {
		currentPage: number;
		memorySearch: string;
		sort: string;
	}) => {
		try {
			const response = await fetchWordAPI(
				params.currentPage,
				params.memorySearch,
				params.sort
			);
			return response;
		} catch (error) {
			throw new Error("Failed to fetch words");
		}
	}
);

export const wordSlice = createSlice({
	name: "word",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchWords.fulfilled, (state, action) => {
			state.current_page = action.payload.current_page;
			state.data = action.payload.data;
			state.last_page = action.payload.last_page;
			state.total = action.payload.total;
		});
	},
});

export const {} = wordSlice.actions;
export default wordSlice.reducer;
