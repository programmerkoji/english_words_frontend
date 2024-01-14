import axios from "axios";

export const logoutUser = async () => {
	try {
		await axios.get("http://localhost:8000/sanctum/csrf-cookie");
		const response = await axios.post(
			"http://localhost:8000/api/logout",
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
