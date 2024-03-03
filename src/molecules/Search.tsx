import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { MemorySymbol, Sort } from "../consts/constants";
import { RootState } from "../app/store";
import { fetchWords, setCurrentPage, setMemorySearch, setSort } from "../features/wordSlice";
import { ChangeEvent, useEffect } from "react";

export type selectData = {
	memorySearch: string;
	sort: string;
};

export const Search = () => {
	const dispatch = useAppDispatch();
	const wordData = useSelector((state: RootState) => state.word);

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;

		if (name === "memorySearch") {
			dispatch(
				fetchWords({
					currentPage: 1,
					memorySearch: value,
					sort: wordData.sort,
				})
			);
			dispatch(setMemorySearch(value));
			dispatch(setCurrentPage(1));
		} else if (name === "sort") {
			dispatch(
				fetchWords({
					currentPage: 1,
					memorySearch: wordData.memorySearch,
					sort: value,
				})
			);
			dispatch(setSort(value));
			dispatch(setCurrentPage(1));
		}
	};

	useEffect(() => {
		const storedMemorySearch = sessionStorage.getItem("memorySearch");
		const storedSort = sessionStorage.getItem("sort");

		if (storedMemorySearch) {
			dispatch(setMemorySearch(storedMemorySearch));
		}

		if (storedSort) {
			dispatch(setSort(storedSort));
		}
	}, [dispatch]);

	return (
		<div className="md:ml-auto flex justify-end gap-2 w-full md:w-1/3">
			<select
				name="memorySearch"
				className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				value={wordData.memorySearch}
				onChange={handleSelectChange}
			>
				<option value="">記憶度</option>
				{MemorySymbol.map((item, key) => (
					<option key={key} value={key}>
						{item}
					</option>
				))}
			</select>
			<select
				name="sort"
				className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				value={wordData.sort}
				onChange={handleSelectChange}
			>
				{Sort.map((item) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			<button type="submit" style={{ display: "none" }}></button>
		</div>
	);
};
