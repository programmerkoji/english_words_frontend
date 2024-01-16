import axios from "axios";

export const loginUser = async (email: string, password: string) => {
	try {
		await axios.get("http://localhost:8000/sanctum/csrf-cookie");
		const response = await axios.post(
			"http://localhost:8000/api/login",
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
