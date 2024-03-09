import { ClearOutlined } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Memory, PartOfSpeech } from "../consts/constants";
import "./Answer.css";

type Props = {
	id: number;
};

export const Answer: FC<Props> = (props) => {
	const { id } = props;
	const wordData = useSelector((state: RootState) => state.word.data);
	const selectedWord = wordData.find((item) => item.id === id);
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
						<p>test</p>
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
