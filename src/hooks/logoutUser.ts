import axios from "axios";

export const logoutUser = async () => {
	try {
		await axios.get("sanctum/csrf-cookie");
		const response = await axios.post(
			"api/logout",
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
