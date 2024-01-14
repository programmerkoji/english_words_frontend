import axios from "axios";

export const loginUser = async (email: string, password: string) => {
	try {
		await axios.get("sanctum/csrf-cookie")
		const response = await axios.post(
			"api/login",
			{ email, password },
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
