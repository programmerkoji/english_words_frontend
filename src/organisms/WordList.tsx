import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const WordList = () => {
	const wordData = useSelector((state: RootState) => state.word.initialState);

	const memoryInfo = (memorySelectData: number) => {
		let memoryImageUrl = "";
		let memoryColor = "";
		switch (memorySelectData) {
			case 0:
				memoryImageUrl = "./images/smile_icon.svg";
				memoryColor =
					"w-8 h-8 inline-flex items-center justify-center rounded-full bg-green-500";
				break;
			case 1:
				memoryImageUrl = "./images/usually_icon.svg";
				memoryColor =
					"w-8 h-8 inline-flex items-center justify-center rounded-full bg-yellow-500";
				break;
			case 2:
				memoryImageUrl = "./images/cry_icon.svg";
				memoryColor =
					"w-8 h-8 inline-flex items-center justify-center rounded-full bg-red-500";
				break;
		}
		return { memoryImageUrl, memoryColor };
	}

	const formattedCreatedAt = (createdAt: string) => {
		const date = new Date(createdAt);
		return date.toLocaleString("ja-JP", {
			timeZone: "Asia/Tokyo",
		});
	};

	return (
		<div className="container mx-auto">
			<ul className="flex flex-wrap -m-2">
				{wordData.data.map((word) => (
					<li key={word.id} className="w-full xl:w-1/3 md:w-1/2 p-2">
						<div className="border border-gray-200 p-3 rounded-lg flex flex-wrap items-center justify-between">
							<div className="flex items-center gap-4 w-3/4">
								<div className={memoryInfo(word.memory).memoryColor}>
									<img src={memoryInfo(word.memory).memoryImageUrl} alt="" className="w-5 h-5" />
								</div>
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
									登録日：{formattedCreatedAt(word.created_at)}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
