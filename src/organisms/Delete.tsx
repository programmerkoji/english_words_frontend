import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { FC, useState } from "react";
import { fetchWordDelete, fetchWords, setMessage } from "../features/wordSlice";
import { useAppDispatch } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type Props = {
	word_id: number;
};

const Delete: FC<Props> = (props) => {
	const { word_id } = props;
	const dispatch = useAppDispatch();
  const { current_page, memorySearch, sort } =
		useSelector((state: RootState) => state.word);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleDeleteClick = () => {
		dispatch(fetchWordDelete(word_id)).then(() => {
			dispatch(
				fetchWords({
					currentPage: current_page,
					memorySearch: memorySearch,
					sort: sort,
				})
			);
			dispatch(setMessage(true));
		});
		setDeleteOpen(false);
	};
	const handleClickAlart = () => setDeleteOpen(true);
	const handleCloseAlart = () => setDeleteOpen(false);

	return (
		<>
			<button
				onClick={handleClickAlart}
				className="mx-auto text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-sm"
			>
				削除
			</button>
			<Dialog
				open={deleteOpen}
				onClose={handleCloseAlart}
				aria-labelledby="単語削除"
				aria-describedby="クリックした単語を削除します"
			>
				<DialogTitle id="alert-dialog-title">
					{"本当に単語を削除しますか？"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						一度削除すると、元に戻せなくなります。
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseAlart}>やっぱりやめる</Button>
					<Button onClick={handleDeleteClick} autoFocus>
						削除する
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Delete;
