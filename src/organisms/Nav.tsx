import React from "react";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/userSlice";
import { logoutUser } from "../hooks/logoutUser";

export const Nav = () => {
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		const response = await logoutUser();
		dispatch(logout());
	};

	return (
		<nav className="bg-white border-b border-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex">
						<div className="shrink-0 flex items-center">
							<span className="block w-10">
								<img src="./images/logo.png" alt="" />
							</span>
						</div>
					</div>
					<div>
						<button type="button" onClick={handleLogout}>
							ログアウト
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
