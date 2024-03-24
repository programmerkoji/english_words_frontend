import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginUser = async (email: string, password: string) => {
	try {
		await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
		const response = await axios.post(
			`${API_BASE_URL}/api/login`,
			{ email, password },
			{
				withCredentials: true,
				withXSRFToken: true,
			}
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<any>;
		const { response } = axiosError;
		if (response && response.status === 422) {
			return response.data;
		}
	}
};
