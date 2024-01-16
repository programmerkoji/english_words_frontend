import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Word } from "./pages/Word";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { login } from "./features/userSlice";

function App() {
	const user = useAppSelector((state) => state.user.userName);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const storedUserId = sessionStorage.getItem("userId");
		const storedUserName = sessionStorage.getItem("userName");
		if (storedUserName) {
			dispatch(login({ id: storedUserId, name: storedUserName }));
		}
	}, [dispatch]);

	return (
		<Routes>
			<Route
				path="/"
				element={user ? <Navigate to="/word" /> : <Navigate to="/login" />}
			/>
			<Route
				path="/login"
				element={user ? <Navigate to="/word" /> : <Login />}
			/>
			<Route
				path="/word"
				element={user ? <Word /> : <Navigate to="/login" />}
			/>
		</Routes>
	);
}

export default App;
