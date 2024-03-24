import React, { FormEvent, useState } from "react";
import { loginUser } from "../hooks/loginUser";
import { useAppDispatch } from "../app/hooks";
import { login, setMessage } from "../features/userSlice";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const Login = () => {
	const dispatch = useAppDispatch();
	const { dialogSetting, message } = useSelector((state: RootState) => state.user);
	const { vertical, horizontal, open, severity } = dialogSetting;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(setMessage(false));
	};

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await loginUser(email, password);
		if (response.errors) {
			dispatch(setMessage({ open: true, severity: "error", message: response.message}))
		} else {
			dispatch(login(response));
		}
	};

	return (
		<div className="font-sans text-gray-900 antialiased">
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message={message}
				key={vertical + horizontal}
			>
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
			<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
				<div>
					<p className="w-14">
						<img
							src="./images/logo.png"
							className="w-20 h-20 fill-current text-gray-500"
							alt="logo"
						/>
					</p>
				</div>
				<div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
					<div className="p-4 bg-gray-100 mb-2">
						<p>●テストユーザー情報</p>
						<dl className="mt-2">
							<div className="flex">
								<dt>メールアドレス：</dt>
								<dd>test@test.com</dd>
							</div>
							<div className="flex">
								<dt>パスワード：</dt>
								<dd>password1234</dd>
							</div>
						</dl>
					</div>

					<form onSubmit={handleLogin}>
						<div>
							<label className="block font-medium text-sm text-gray-700">
								メールアドレス
							</label>
							<input
								type="email"
								name="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<label className="block font-medium text-sm text-gray-700">
								パスワード
							</label>
							<input
								type="password"
								name="password"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex items-center justify-end mt-6">
							<button
								type="submit"
								className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
							>
								ログイン
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
