import React, { FC, useEffect } from "react";
import { Nav } from "../organisms/Nav";
import { Header } from "../organisms/Header";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchWords } from "../features/wordSlice";
import { Pagination } from "@mui/material";
import { WordList } from "../organisms/WordList";
import { Search } from "../molecules/Search";

export const Word: FC = () => {
	const dispatch = useAppDispatch();
	const wordData = useSelector((state: RootState) => state.word);

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
	};

	useEffect(() => {
		dispatch(
			fetchWords({
				currentPage: wordData.current_page,
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
					{/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar> */}
					<div className="py-12">
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
							<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
								<div className="p-6 bg-white border-b border-gray-200">
									<div className="text-gray-600 body-font">
										<div className="mb-4"></div>
										<div className="mb-6 flex items-center flex-wrap gap-4">
											{/* <Create
                      formData={formData}
                      handleCreateSubmit={handleCreateSubmit}
                      handleInputChange={handleInputChange}
                    />
                    */}
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
