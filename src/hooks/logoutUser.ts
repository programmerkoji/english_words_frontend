import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const logoutUser = async () => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/api/logout`,
			{},
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
