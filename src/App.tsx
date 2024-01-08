import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Word } from "./pages/Word";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { login } from "./features/userSlice";

function App() {
	const user = useAppSelector((state) => state.userName);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const storedUserName = localStorage.getItem("userName");
		if (storedUserName) {
			dispatch(login({ name: storedUserName }));
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
			<Route path="/word" element={<Word />} />
		</Routes>
	);
}

export default App;
