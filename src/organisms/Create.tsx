import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Memory, PartOfSpeech } from "../consts/constants";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import {
	editWord,
	fetchWordCreate,
	fetchWords,
	resetFormData,
	setFormSubmitted,
	setMessage,
} from "../features/wordSlice";

export const Create = () => {
	const dispatch = useAppDispatch();
	const { current_page, memorySearch, sort, formData, isFormSubmitted } =
		useSelector((state: RootState) => state.word);
	const { word_en, word_ja, part_of_speech, memory, memo } = formData;

	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleInputChange = (fieldName: string, value: string | number) => {
		dispatch(editWord({ fieldName, value }));
	};

	const handleCreateWord = () => {
		dispatch(
			fetchWordCreate({ word_en, word_ja, part_of_speech, memory, memo })
		).then(() => {
			dispatch(
				fetchWords({
					currentPage: current_page,
					memorySearch: memorySearch,
					sort: sort,
				})
			);
			dispatch(setMessage(true));
		});
		dispatch(setFormSubmitted());
	};
	useEffect(() => {
		if (isFormSubmitted) {
			dispatch(resetFormData());
		}
	}, [dispatch, isFormSubmitted]);

	return (
		<>
			<button
				onClick={handleOpen}
				className="inline-block text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
			>
				単語を登録
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>新規登録</DialogTitle>
				<DialogContent>
					<div className="w-full">
						<input type="hidden" name="user_id" value={1} />
						<div className="flex flex-wrap -m-2">
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										英単語
									</label>
									<input
										type="text"
										id="word_en"
										name="word_en"
										value={word_en}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										onChange={(e) =>
											handleInputChange("word_en", e.target.value)
										}
									/>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										日本語訳
									</label>
									<input
										type="text"
										id="word_ja"
										name="word_ja"
										value={word_ja}
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										onChange={(e) =>
											handleInputChange("word_ja", e.target.value)
										}
									/>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full md:w-1/2">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										品詞
									</label>
									<select
										name="part_of_speech"
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										value={part_of_speech}
										onChange={(e) =>
											handleInputChange(
												"part_of_speech",
												parseInt(e.target.value, 10)
											)
										}
									>
										{/* <option value="">選択してください</option> */}
										{PartOfSpeech.map((item, index) => (
											<option key={index} value={index}>
												{item}
											</option>
										))}
									</select>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full md:w-1/2">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										記憶度
									</label>
									<select
										name="memory"
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
										value={memory}
										onChange={(e) =>
											handleInputChange("memory", parseInt(e.target.value, 10))
										}
									>
										{/* <option value="">選択してください</option> */}
										{Memory.map((item, index) => (
											<option key={index} value={index}>
												{item}
											</option>
										))}
									</select>
									<p className="text-rose-700"></p>
								</div>
							</div>
							<div className="p-2 w-full">
								<div className="relative">
									<label className="leading-7 text-sm text-gray-600">
										メモ
									</label>
									<textarea
										id="memo"
										name="memo"
										className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
										value={memo}
										onChange={(e) => handleInputChange("memo", e.target.value)}
									/>
								</div>
							</div>
							<div className="p-2 w-full flex">
								<button
									type="button"
									className="flex mx-auto text-white bg-gray-300 border-0 py-2 px-4 focus:outline-none hover:bg-gray-400 rounded text-lg"
									onClick={handleClose}
								>
									戻る
								</button>
								<button
									type="submit"
									className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
									onClick={() => {
										handleClose();
										handleCreateWord();
									}}
								>
									登録
								</button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
