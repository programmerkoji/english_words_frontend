import { ClearOutlined } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Memory, PartOfSpeech } from "../consts/constants";
import "./Answer.css";
import { useAppDispatch } from "../app/hooks";
import { fetchWordUpdate, fetchWords, setMessage } from "../features/wordSlice";

type Props = {
	id: number;
};

export const Answer: FC<Props> = (props) => {
	const { id } = props;
	const dispatch = useAppDispatch();
	const {data, current_page, memorySearch, sort} = useSelector((state: RootState) => state.word);
	const selectedWord = data.find((item) => item.id === id);
	let selectedPartOfSpeech;
	for (let index = 0; index < PartOfSpeech.length; index++) {
		if (index === selectedWord?.part_of_speech) {
			selectedPartOfSpeech = PartOfSpeech[index];
			break;
		}
	}

	const [answerOpen, setAnswerOpen] = useState<boolean>(false);

	const handleClickAnswer = () => setAnswerOpen(true);
	const handleCloseAnswer = () => setAnswerOpen(false);
	const handleMemoryUpdate = (word_id: number, memory: number) => {
		const word_en = selectedWord ? selectedWord.word_en : '';
		const word_ja = selectedWord ? selectedWord.word_ja : '';
		const part_of_speech = selectedWord ? selectedWord.part_of_speech : 0;
		const memo = selectedWord ? selectedWord.memo : '';
		dispatch(
			fetchWordUpdate({
				word_id,
				word_en,
				word_ja,
				part_of_speech,
				memory,
				memo,
			})
		).then(() => {
			dispatch(
				fetchWords({
					currentPage: current_page,
					memorySearch: memorySearch,
					sort: sort,
				})
			);
			dispatch(setMessage({open: true, severity: "success"}));
		});
	}

	return (
		<>
			<button
				onClick={handleClickAnswer}
				className="text-xs px-2 py-1 rounded-sm border-solid border-indigo-500 border text-indigo-500"
			>
				答えを見る
			</button>
			<Dialog
				open={answerOpen}
				onClose={handleCloseAnswer}
				aria-labelledby="答え"
				aria-describedby="クリックして答えをみます"
			>
				<DialogContent>
					<div className="modal__header">
						<div className="flex items-center gap-4">
							<p className="text-sm px-2 py-1 rounded-sm border-solid border-indigo-500 border text-indigo-500 min-w-fit">
								{selectedPartOfSpeech}
							</p>
							<p className="modal__title" id="modal-{{ $word->id }}-title">
								{selectedWord?.word_ja}
							</p>
						</div>
						<ClearOutlined
							onClick={handleCloseAnswer}
							className="modal__close"
						/>
					</div>
					<div className="modal__memo">
						<p style={{whiteSpace: 'pre-line'}}>{ selectedWord?.memo }</p>
					</div>
				</DialogContent>
				<DialogActions>
					<ul className="flex flex-col md:flex-row gap-2 w-full">
						{Memory.map((item, index) => (
							<li key={index}>
								<button
									type="submit"
									name="memory"
									value={item}
									className={
										selectedWord?.memory === index
											? "modal__btn select"
											: "modal__btn"
									}
									onClick={() => handleMemoryUpdate(id, index)}
								>
									{item}
								</button>
							</li>
						))}
					</ul>
				</DialogActions>
			</Dialog>
		</>
	);
};
