import axios, { AxiosError } from "axios";
import { WordResponseApi } from "../types/word";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchWordAPI = async (
	currentPage: number,
	memorySearch: string = "",
	sort: string = ""
) => {
	try {
		let url = `${API_BASE_URL}/api/word?page=${currentPage}`;
		if (memorySearch) {
			url += `&memorySearch=${memorySearch}`;
		}
		if (sort) {
			url += `&sort=${sort}`;
		}
		const response = await axios.get<WordResponseApi>(url, {
			withCredentials: true,
			withXSRFToken: true,
		});
		return { ...response.data, memorySearch, sort };
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.request.status === 401) {
			sessionStorage.clear();
			window.location.href = `${API_BASE_URL}/login`;
		}
		throw new Error("Failed to fetch words");
	}
};

export const storeWordAPI = async (
	word_en: string,
	word_ja: string,
	part_of_speech: number,
	memory: number,
	memo: string
) => {
	try {
		const response = await axios.post<WordResponseApi>(
			`${API_BASE_URL}/api/word`,
			{ word_en, word_ja, part_of_speech, memory, memo },
			{
				withCredentials: true,
				withXSRFToken: true,
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateWordAPI = async (
	word_id: number | null,
	word_en: string,
	word_ja: string,
	part_of_speech: number,
	memory: number,
	memo: string
) => {
	try {
		const response = await axios.put<WordResponseApi>(
			`${API_BASE_URL}/api/word/${word_id}`,
			{ word_en, word_ja, part_of_speech, memory, memo },
			{
				withCredentials: true,
				withXSRFToken: true,
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteWordAPI = async (
	word_id: number,
) => {
	try {
		const response = await axios.delete<WordResponseApi>(
			`${API_BASE_URL}/api/word/${word_id}`,
			{
				withCredentials: true,
				withXSRFToken: true,
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};