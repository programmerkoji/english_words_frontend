import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateWord, Word, WordResponseApi } from "../types/word";
import { fetchWordAPI, storeWordAPI } from "../api/wordAPI";
import { RootState } from "../app/store";

const initialState: WordResponseApi = {
	current_page: 1,
	data: [],
	last_page: 1,
	total: 0,
	memorySearch: sessionStorage.getItem("memorySearch") || "",
	sort: sessionStorage.getItem("sort") || "",
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
	initialState: {
		initialState
	},
	reducers: {
		setMemorySearch: (state, action) => {
			state.initialState.memorySearch = action.payload;
			sessionStorage.setItem("memorySearch", action.payload);
		},
		setSort: (state, action) => {
			state.initialState.sort = action.payload;
			sessionStorage.setItem("sort", action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWords.fulfilled, (state, action) => {
			const { current_page, data, last_page, total, memorySearch, sort } =
				action.payload;
			return {
				initialState: {
          ...state.initialState,
          current_page,
          data,
          last_page,
          total,
          memorySearch,
          sort,
        },
			};
		});
	},
});

export const test = (state: RootState) => state.word.initialState;
export const { setMemorySearch, setSort } = wordSlice.actions;
export default wordSlice.reducer;
