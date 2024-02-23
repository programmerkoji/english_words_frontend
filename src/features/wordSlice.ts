import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateWord, Word, WordResponseApi } from "../types/word";
import { fetchWordAPI, storeWordAPI } from "../api/wordAPI";
import { RootState } from "../app/store";

const initialWordState: WordResponseApi = {
	current_page: 1,
	data: [],
	last_page: 1,
	total: 0,
	memorySearch: sessionStorage.getItem("memorySearch") || "",
	sort: sessionStorage.getItem("sort") || "",
	message: "",
};

const createWordState: CreateWord = {
	word_en: "",
	word_ja: "",
	part_of_speech: 0,
	memory: 0,
	memo: "",
	message: "",
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

export const fetchWordCreate = createAsyncThunk(
	"word/fetchWordCreate",
	async (params: {
		word_en: string;
		word_ja: string;
		part_of_speech: number;
		memory: number;
		memo: string;
	}) => {
		try {
			const response = await storeWordAPI(
				params.word_en,
				params.word_ja,
				params.part_of_speech,
				params.memory,
				params.memo
			);
			return response;
		} catch (error) {}
	}
);

export const wordSlice = createSlice({
	name: "word",
	initialState: {
		...initialWordState,
		createWordState,
	},
	reducers: {
		setMemorySearch: (state, action) => {
			state.memorySearch = action.payload;
			sessionStorage.setItem("memorySearch", action.payload);
		},
		setSort: (state, action) => {
			state.sort = action.payload;
			sessionStorage.setItem("sort", action.payload);
		},
		setCurrentPage: (state, action) => {
			state.current_page = action.payload;
			sessionStorage.setItem("currentPage", action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWords.fulfilled, (state, action) => {
			const { current_page, data, last_page, total, memorySearch, sort } =
				action.payload;
			return {
				...state,
				current_page,
				data,
				last_page,
				total,
				memorySearch,
				sort,
			};
		});
		builder.addCase(fetchWordCreate.fulfilled, (state, action) => {
			return {
				...state,
				...action.payload,
			};
		});
	},
});

export const { setMemorySearch, setSort, setCurrentPage } = wordSlice.actions;
export default wordSlice.reducer;
