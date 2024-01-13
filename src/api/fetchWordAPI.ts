import axios from "axios";
import { WordResponseApi } from "../types/word";

export const fetchWordAPI = async (
  currentPage: number,
  memorySearch: string = "",
  sort: number = 1
) => {
  try {
		let url = `http://localhost:8000/api/word?page=${currentPage}`;
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
		return response.data;
  } catch (error) {
    throw new Error('Failed to fetch words');
  }
}