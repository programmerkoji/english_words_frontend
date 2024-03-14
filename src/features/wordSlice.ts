import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateWord, WordResponseApi } from "../types/word";
import {
	deleteWordAPI,
	fetchWordAPI,
	storeWordAPI,
	updateWordAPI,
} from "../api/wordAPI";

const initialWordState: WordResponseApi = {
	current_page: 1,
	data: [],
	last_page: 1,
	total: 0,
	memorySearch: sessionStorage.getItem("memorySearch") || "",
	sort: sessionStorage.getItem("sort") || "",
	message: "",
	dialogSetting: {
		open: false,
		vertical: "top",
		horizontal: "center",
	},
	isFormSubmitted: false,
};

const createWordState: CreateWord = {
	word_id: null,
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

export const fetchWordUpdate = createAsyncThunk(
	"word/fetchWordUpdate",
	async (params: {
		word_id: number | null;
		word_en: string;
		word_ja: string;
		part_of_speech: number;
		memory: number;
		memo: string;
	}) => {
		try {
			const response = await updateWordAPI(
				params.word_id,
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

export const fetchWordDelete = createAsyncThunk(
	"word/fetchWordDelete",
	async (word_id: number) => {
		try {
			const response = await deleteWordAPI(word_id);
			return response;
		} catch (error) {}
	}
);

export const wordSlice = createSlice({
	name: "word",
	initialState: {
		...initialWordState,
		formData: createWordState,
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
		setMessage: (state, action) => {
			state.dialogSetting.open = action.payload;
		},
		editWord: (
			state,
			action: PayloadAction<{
				fieldName: string;
				value: string | number;
			}>
		) => {
			const { fieldName, value } = action.payload;
			state.formData = { ...state.formData, [fieldName]: value };
		},
		resetFormData: (state) => {
			state.formData = createWordState;
			state.isFormSubmitted = false;
		},
		setFormSubmitted: (state) => {
			state.isFormSubmitted = true;
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
		builder.addCase(fetchWordUpdate.fulfilled, (state, action) => {
			return {
				...state,
				...action.payload,
			};
		});
		builder.addCase(fetchWordDelete.fulfilled, (state, action) => {
			return {
				...state,
				...action.payload,
			};
		});
	},
});

export const {
	setMemorySearch,
	setSort,
	setCurrentPage,
	setMessage,
	editWord,
	resetFormData,
	setFormSubmitted,
} = wordSlice.actions;
export default wordSlice.reducer;
