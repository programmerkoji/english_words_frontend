import React, { FC, useEffect } from "react";
import { Nav } from "../organisms/Nav";
import { Header } from "../organisms/Header";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchWords } from "../features/wordSlice";
import { Pagination } from "@mui/material";

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
				currentPage: 1,
				memorySearch: "",
				sort: "",
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
                    <Search
                      selectData={selectData}
                      handleSelectChange={handleSelectChange}
                      handleSearchSubmit={handleSearchSubmit}
                    /> */}
										</div>

										<div className="container mx-auto">
											<ul className="flex flex-wrap -m-2">
												{wordData.data.map((word) => (
													<li
														key={word.id}
														className="w-full xl:w-1/3 md:w-1/2 p-2"
													>
														<div className="border border-gray-200 p-3 rounded-lg flex flex-wrap items-center justify-between">
															<div className="flex items-center gap-4 w-3/4">
																{/* <div className={memoryColor}>
                                  <img src={memoryImageUrl} alt="" className="w-5 h-5" />
                                </div> */}
																<div className="w-4/5">
																	<p className="text-lg text-gray-900 font-medium title-font break-words mb-1">
																		{word.word_en}
																	</p>
																	{/* <Answer {...otherProps} /> */}
																</div>
															</div>
															<div className="w-1/4">
																<div className="text-right">
																	{/* <Update
                                    onUpdateSuccess={onUpdateSuccess}
                                    data={otherProps}
                                  /> */}
																</div>
																<div className="text-right mt-2">
																	{/* <Delete word_id={otherProps.word_id} onDelete={onDelete} /> */}
																</div>
															</div>
															<div className="w-full text-right mt-3">
																<p className="text-sm">
																	登録日：{word.created_at}
																</p>
															</div>
														</div>
													</li>
												))}
											</ul>
										</div>
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
