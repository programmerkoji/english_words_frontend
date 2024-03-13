import React, { FC, useEffect } from "react";
import { Nav } from "../organisms/Nav";
import { Header } from "../organisms/Header";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchWords, setCurrentPage, setMessage } from "../features/wordSlice";
import { Alert, Pagination, Snackbar } from "@mui/material";
import { WordList } from "../organisms/WordList";
import { Search } from "../molecules/Search";
import { Create } from "../organisms/Create";

export const Word: FC = () => {
	const dispatch = useAppDispatch();
	const wordData = useSelector((state: RootState) => state.word);
	const { vertical, horizontal, open } = wordData.dialogSetting;

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(setMessage(false));
	};

	const handleChangePage = (
		event: React.ChangeEvent<unknown>,
		newPage: number
	) => {
		dispatch(
			fetchWords({
				currentPage: newPage,
				memorySearch: wordData.memorySearch,
				sort: wordData.sort,
			})
		);
		dispatch(setCurrentPage(newPage));
	};

	useEffect(() => {
		const storedCurrentPage = sessionStorage.getItem("currentPage");

		dispatch(
			fetchWords({
				currentPage: storedCurrentPage
					? parseInt(storedCurrentPage, 10)
					: wordData.current_page,
				memorySearch: wordData.memorySearch,
				sort: wordData.sort,
			})
		);
	}, [dispatch]);

	return (
		<div className="App">
			<div className="min-h-screen bg-gray-100">
				<Nav />
				<Header />
				<main>
					<Snackbar
						anchorOrigin={{ vertical, horizontal }}
						open={open}
						autoHideDuration={3000}
						onClose={handleClose}
						message={wordData.message}
						key={vertical + horizontal}
					>
						<Alert
							onClose={handleClose}
							severity="success"
							sx={{ width: "100%" }}
						>
							{wordData.message}
						</Alert>
					</Snackbar>
					<div className="py-12">
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
							<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
								<div className="p-6 bg-white border-b border-gray-200">
									<div className="text-gray-600 body-font">
										<div className="mb-4"></div>
										<div className="mb-6 flex items-center flex-wrap gap-4">
											<Create word_id={null} />
											<Search />
										</div>
										<WordList />
									</div>
									<div className="mt-4 flex justify-center">
										<Pagination
											count={wordData.last_page}
											page={wordData.current_page}
											onChange={handleChangePage}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};
