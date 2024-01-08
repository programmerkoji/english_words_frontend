import axios from "axios";
import { useState } from "react";
import { Word } from "../types/word";

export const useWords = () => {
	const [wordsData, setWordsData] = useState<Word[]>([]);
	const fetchPost = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/word", {
				withCredentials: true,
				withXSRFToken: true,
			});
			setWordsData(response.data);
		} catch (error) {}
	};
	return { fetchPost, wordsData };
};
